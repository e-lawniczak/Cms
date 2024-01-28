using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySqlX.XDevAPI;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Dto.Role;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories.EntityWithPictureRepositories;
using PizzeriaAPI.Repositories.ExtendedBaseEntityRepositories;
using Swashbuckle.Swagger.Annotations;
using System.Data;
using System.Net;

namespace PizzeriaAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleRepository roleRepository;
        private readonly ITransactionCoordinator transactionCoordinator;
        private readonly ITeamMemberRepository teamMemberRepository;
        private readonly ITestimonialRepository testimonialRepository;
        public RoleController(IRoleRepository roleRepository, 
            ITransactionCoordinator transactionCoordinator,
            ITeamMemberRepository teamMemberRepository,
            ITestimonialRepository testimonialRepository)
        {
            this.roleRepository = roleRepository;
            this.transactionCoordinator = transactionCoordinator;
            this.teamMemberRepository = teamMemberRepository;
            this.testimonialRepository = testimonialRepository;
        }

        [HttpPost]
        [Route("/AddRole")]
        [Authorize]
        [SwaggerResponse(HttpStatusCode.OK, "Role inserted successfully")]
        public async Task<ActionResult> AddRole([FromBody] AddRoleDto roleDto)
        {
            var role = await GetRole(roleDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await roleRepository.InsertAsync(role, session);
            });

            return Ok("Role inserted successfully");
        }


        [HttpGet]
        [Route("/GetAllRoleList")]
        [SwaggerResponse(HttpStatusCode.OK, "Role List")]
        public async Task<ActionResult<IList<RoleDto>>> GetAllRoleList()
        {
            IList<RoleDto> roleDtoList = new List<RoleDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var roleList = await roleRepository.GetAllAsync(session);
                if (roleList != null)
                    roleDtoList = roleList.Select(GetRoleDto).ToList();
            });

            return Ok(roleDtoList);
        }

        [HttpGet]
        [Route("/GetVisibleRoleList")]
        [SwaggerResponse(HttpStatusCode.OK, "Role List")]
        public async Task<ActionResult<IList<RoleDto>>> GetVisibleRoleList()
        {
            IList<RoleDto> roleDtoList = new List<RoleDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var roleList = await roleRepository.GetVisibleAsync(session);
                if (roleList != null)
                    roleDtoList = roleList.Select(GetRoleDto).ToList();
            });

            return Ok(roleDtoList);
        }

        [HttpPatch]
        [Route("/UpdateRole")]
        [Authorize]
        [SwaggerResponse(HttpStatusCode.OK, "Role updated successfully")]
        [SwaggerResponse(HttpStatusCode.BadRequest, "Role not found")]
        public async Task<ActionResult> UpdateRole([FromBody] RoleDto roleDto)
        {
            var role = await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return await roleRepository.GetByIdAsync(roleDto.RoleId, session);
            });

            if (role == null)
                return BadRequest("Role not found");

            await UpdateRole(role, roleDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await roleRepository.UpdateAsync(role, session);
            });
            return Ok("Role updated successfully");
        }

        private async Task UpdateRole(Role role, RoleDto roleDto)
        {
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                role.Name = roleDto.Name;
                role.IsVisible = roleDto.IsVisible;
                role.TeamMemberList = await teamMemberRepository.GetByIdListAsync(roleDto.TeamMemberIdList ?? new List<int>(), session);
                role.TestimonialList = await testimonialRepository.GetByIdListAsync(roleDto.TestimonialIdList ?? new List<int>(), session);
            });
        }

        [HttpDelete]
        [Route("/DeleteRole/{roleId}")]
        [Authorize]
        [SwaggerResponse(HttpStatusCode.OK, "Role was deleted successfully")]
        public async Task<ActionResult> DeletRole([FromRoute] int roleId)
        {
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await roleRepository.DeleteAsync(roleId, session);
            });

            return Ok("Role was deleted successfully");
        }

        private RoleDto GetRoleDto(Role role)
        {
            return new RoleDto()
            {
                RoleId = role.Id,
                Name = role.Name,
                IsVisible = role.IsVisible,
                TeamMemberIdList = role.TeamMemberList?.Select(x => x.Id).ToList(),
                TestimonialIdList = role.TestimonialList?.Select(x => x.Id).ToList()

            };
        }

        private async Task<Role> GetRole(AddRoleDto roleDto)
        {
            return await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return new Role()
                {

                    Name = roleDto.Name,
                    IsVisible = roleDto.IsVisible,
                    IsDeleted = false,
                    TeamMemberList = await teamMemberRepository.GetByIdListAsync(roleDto.TeamMemberIdList ?? new List<int>(), session),
                    TestimonialList = await testimonialRepository.GetByIdListAsync(roleDto.TestimonialIdList ?? new List<int>(), session)

                };
            });
        }
    }
}
