using Microsoft.AspNetCore.Mvc;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Dto.ContactInfo;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories;
using Swashbuckle.Swagger.Annotations;
using System.Net;

namespace PizzeriaAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactInfoController : ControllerBase
    {

        private readonly ILogger<ContactInfoController> logger;
        private readonly ITransactionCoordinator transactionCoordinator;
        private readonly IContactInfoRepository contactInfoRepository;
        private readonly IPictureRepository pictureRepository;
        private readonly ITeamMemberRepository teamMemberRepository;

        public ContactInfoController(ILogger<ContactInfoController> logger,
            ITransactionCoordinator transactionCoordinator,
            IContactInfoRepository contactInfoRepository,
            IPictureRepository pictureRepository,
            ITeamMemberRepository teamMemberRepository)
        {
            this.logger = logger;
            this.transactionCoordinator = transactionCoordinator;
            this.contactInfoRepository = contactInfoRepository;
            this.pictureRepository = pictureRepository;
            this.teamMemberRepository = teamMemberRepository;
        }

        [HttpPost]
        [Route("/AddContactInfo")]
        [SwaggerResponse(HttpStatusCode.OK, "ContactInfo inserted successfully")]
        public async Task<ActionResult> AddContactInfo([FromBody] AddContactInfoDto contactInfoDto)
        {
            var contactInfo = await GetContactInfo(contactInfoDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await contactInfoRepository.InsertAsync(contactInfo, session);
            });

            return Ok("ContactInfo inserted successfully");
        }


        [HttpGet]
        [Route("/GetAllContactInfoList")]
        [SwaggerResponse(HttpStatusCode.OK, "ContactInfo List")]
        public async Task<ActionResult<IList<ContactInfoDto>>> GetAllContactInfoList()
        {
            IList<ContactInfoDto> contactInfoDtoList = new List<ContactInfoDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var contactInfoList = await contactInfoRepository.GetAllAsync(session);
                if (contactInfoList != null)
                    contactInfoDtoList = contactInfoList.Select(GetContactInfoDto).ToList();
            });

            return Ok(contactInfoDtoList);
        }

        [HttpGet]
        [Route("/GetVisibleContactInfoList")]
        [SwaggerResponse(HttpStatusCode.OK, "ContactInfo List")]
        public async Task<ActionResult<IList<ContactInfoDto>>> GetVisibleContactInfoList()
        {
            IList<ContactInfoDto> contactInfoDtoList = new List<ContactInfoDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var contactInfoList = await contactInfoRepository.GetAllAsync(session);
                if (contactInfoList != null)
                    contactInfoDtoList = contactInfoList.Where(x => x.IsVisible).Select(GetContactInfoDto).ToList();
            });

            return Ok(contactInfoDtoList);
        }

        [HttpPatch]
        [Route("/UpdateContactInfo")]
        [SwaggerResponse(HttpStatusCode.OK, "ContactInfo updated successfully")]
        [SwaggerResponse(HttpStatusCode.BadRequest, "ContactInfo not found")]
        public async Task<ActionResult> UpdateContactInfo([FromBody] ContactInfoDto contactInfoDto)
        {
            var contactInfo = await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return await contactInfoRepository.GetByIdAsync(contactInfoDto.Id, session);
            });
            if (contactInfo == null)
                return BadRequest("ContactInfo not found");

            await UpdateContactInfo(contactInfo, contactInfoDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await contactInfoRepository.UpdateAsync(contactInfo, session);
            });

            return Ok("ContactInfo updated successfully");
        }

        private async Task UpdateContactInfo(ContactInfo contactInfo, ContactInfoDto contactInfoDto)
        {
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                contactInfo.IsVisible = contactInfoDto.IsVisible;
                contactInfo.Text = contactInfoDto.Text;
                contactInfo.PictureList = await pictureRepository.GetPictureListByIdListAsync(contactInfoDto.PictureIdList ?? new List<int>(), session);
            });
        }

        [HttpDelete]
        [Route("/DeleteContactInfo/{contactInfoId}")]
        [SwaggerResponse(HttpStatusCode.OK, "ContactInfo was deleted successfully")]
        public async Task<ActionResult> DeletContactInfo([FromRoute] int contactInfoId)
        {
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await contactInfoRepository.DeleteAsync(contactInfoId, session);
            });

            return Ok("ContactInfo was deleted successfully");
        }

        private ContactInfoDto GetContactInfoDto(ContactInfo contactInfo)
        {
            return new ContactInfoDto()
            {
                Id = contactInfo.Id,
                IsVisible = contactInfo.IsVisible,
                Text = contactInfo.Text,
                PictureIdList = contactInfo.PictureList?.Select(x => x.PictureId ?? 0).ToList()
            };
        }

        private async Task<ContactInfo> GetContactInfo(AddContactInfoDto contactInfoDto)
        {
            return await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return new ContactInfo()
                {
                    IsVisible = contactInfoDto.IsVisible,
                    IsDeleted = false,
                    Text = contactInfoDto.Text,
                    PictureList = await pictureRepository.GetPictureListByIdListAsync(contactInfoDto.PictureIdList ?? new List<int>(), session)
                };
            });
        }
    }
}