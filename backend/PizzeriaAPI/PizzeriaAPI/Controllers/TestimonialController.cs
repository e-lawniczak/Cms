using Microsoft.AspNetCore.Mvc;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Dto.Testimonial;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories;
using Swashbuckle.Swagger.Annotations;
using System.Net;

namespace PizzeriaAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestimonialController : ControllerBase
    {

        private readonly ILogger<TestimonialController> logger;
        private readonly ITransactionCoordinator transactionCoordinator;
        private readonly ITestimonialRepository testimonialRepository;
        private readonly IPictureRepository pictureRepository;
        private readonly ITeamMemberRepository teamMemberRepository;
        private readonly IRoleRepository roleRepository;

        public TestimonialController(ILogger<TestimonialController> logger,
            ITransactionCoordinator transactionCoordinator,
            ITestimonialRepository testimonialRepository,
            IPictureRepository pictureRepository,
            ITeamMemberRepository teamMemberRepository,
            IRoleRepository roleRepository)
        {
            this.logger = logger;
            this.transactionCoordinator = transactionCoordinator;
            this.testimonialRepository = testimonialRepository;
            this.pictureRepository = pictureRepository;
            this.teamMemberRepository = teamMemberRepository;
            this.roleRepository = roleRepository;
        }

        [HttpPost]
        [Route("/AddTestimonial")]
        [SwaggerResponse(HttpStatusCode.OK, "Testimonial inserted successfully")]
        public async Task<ActionResult> AddTestimonial([FromBody] AddTestimonialDto testimonialDto)
        {
            var testimonial = await GetTestimonial(testimonialDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await testimonialRepository.InsertAsync(testimonial, session);
            });

            return Ok("Testimonial inserted successfully");
        }


        [HttpGet]
        [Route("/GetAllTestimonialList")]
        [SwaggerResponse(HttpStatusCode.OK, "Testimonial List")]
        public async Task<ActionResult<IList<TestimonialDto>>> GetAllTestimonialList()
        {
            IList<TestimonialDto> testimonialDtoList = new List<TestimonialDto>(); ;
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var testimonialList = await testimonialRepository.GetAllAsync(session);
                if (testimonialList != null)
                    testimonialDtoList = testimonialList.Select(GetTestimonialDto).ToList();
            });

            return Ok(testimonialDtoList);
        }

        [HttpGet]
        [Route("/GetVisibleTestimonialList")]
        [SwaggerResponse(HttpStatusCode.OK, "Testimonial List")]
        public async Task<ActionResult<IList<TestimonialDto>>> GetVisibleTestimonialList()
        {
            IList<TestimonialDto> testimonialDtoList = new List<TestimonialDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var testimonialList = await testimonialRepository.GetAllAsync(session);
                if (testimonialList != null)
                    testimonialDtoList = testimonialList.Where(x => x.IsVisible).Select(GetTestimonialDto).ToList();
            });

            return Ok(testimonialDtoList);
        }

        [HttpPatch]
        [Route("/UpdateTestimonial")]
        [SwaggerResponse(HttpStatusCode.OK, "Testimonial updated successfully")]
        [SwaggerResponse(HttpStatusCode.BadRequest, "Testimonial not found")]
        public async Task<ActionResult> UpdateTestimonial([FromBody] TestimonialDto testimonialDto)
        {
            var testimonial = await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return await testimonialRepository.GetByIdAsync(testimonialDto.Id, session);
            });

            if (testimonial == null)
                return BadRequest("Testimonial not found");

            await UpdateTestimonial(testimonial, testimonialDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await testimonialRepository.UpdateAsync(testimonial, session);
            });

            return Ok("Testimonial updated successfully");
        }
        private async Task UpdateTestimonial(Testimonial testimonial, TestimonialDto testimonialDto)
        {
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                testimonial.Id = testimonialDto.Id;
                testimonial.FirstName = testimonialDto.FirstName;
                testimonial.LastName = testimonialDto.LastName;
                testimonial.Text = testimonialDto.Text;
                testimonial.IsVisible = testimonialDto.IsVisible;
                testimonial.PictureList = await pictureRepository.GetPictureListByIdListAsync(testimonialDto.PictureIdList ?? new List<int>(), session);
                testimonial.Role = await roleRepository.GetByIdAsync(testimonialDto.RoleId ?? 0, session);
            });
        }
        [HttpDelete]
        [Route("/DeleteTestimonial/{testimonialId}")]
        [SwaggerResponse(HttpStatusCode.OK, "Testimonial was deleted successfully")]
        public async Task<ActionResult> DeletTestimonial([FromRoute] int testimonialId)
        {
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await testimonialRepository.DeleteAsync(testimonialId, session);
            });

            return Ok("Testimonial was deleted successfully");
        }

        private TestimonialDto GetTestimonialDto(Testimonial testimonial)
        {
            return new TestimonialDto()
            {
                Id = testimonial.Id,
                FirstName = testimonial.FirstName,
                LastName = testimonial.LastName,
                Text = testimonial.Text,
                IsVisible = testimonial.IsVisible,
                PictureIdList = testimonial.PictureList?.Select(x => x.PictureId ?? 0).ToList(),
                RoleId = testimonial.Role?.RoleId ?? 0
            };
        }

        private async Task<Testimonial> GetTestimonial(AddTestimonialDto testimonialDto)
        {
            return await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return new Testimonial()
                {
                    FirstName = testimonialDto.FirstName,
                    LastName = testimonialDto.LastName,
                    Text = testimonialDto.Text,
                    IsVisible = testimonialDto.IsVisible,
                    IsDeleted = false,
                    PictureList = await pictureRepository.GetPictureListByIdListAsync(testimonialDto.PictureIdList ?? new List<int>(), session),
                    Role = await roleRepository.GetByIdAsync(testimonialDto.RoleId ?? 0, session)

                };
            });
        }
    }
}