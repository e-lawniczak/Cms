using Microsoft.IdentityModel.Tokens;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories;
using Swashbuckle.Swagger.Annotations;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using PizzeriaAPI.Dto;
using MySqlX.XDevAPI;

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
		public async Task<ActionResult> AddContactInfo([FromBody] ContactInfoDto contactInfoDto)
		{
			var contactInfo = GetContactInfo(contactInfoDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await contactInfoRepository.InsertOrUpdateAsync(contactInfo, session);
			});

			return Ok("ContactInfo inserted successfully");
		}


		[HttpGet]
		[Route("/GetAllContactInfoList")]
		[SwaggerResponse(HttpStatusCode.OK, "ContactInfo List")]
		public async Task<ActionResult<IList<ContactInfoDto>>> GetAllContactInfoList()
		{
			IList<ContactInfoDto> contactInfoDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var contactInfoList = await contactInfoRepository.GetAllAsync(session);
				contactInfoDtoList = contactInfoList.Select(GetContactInfoDto).ToList();
			});

			return Ok(contactInfoDtoList);
		}

		[HttpGet]
		[Route("/GetVisibleContactInfoList")]
		[SwaggerResponse(HttpStatusCode.OK, "ContactInfo List")]
		public async Task<ActionResult<IList<ContactInfoDto>>> GetVisibleContactInfoList()
		{
			IList<ContactInfoDto> contactInfoDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var contactInfoList = await contactInfoRepository.GetAllAsync(session);
				contactInfoDtoList = contactInfoList.Where(x => x.IsVisible).Select(GetContactInfoDto).ToList();
			});

			return Ok(contactInfoDtoList);
		}

		[HttpPatch]
		[Route("/UpdateContactInfo")]
		[SwaggerResponse(HttpStatusCode.OK, "ContactInfo updated successfully")]
		public async Task<ActionResult> UpdateContactInfo([FromBody] ContactInfoDto contactInfoDto)
		{
			var contactInfo = GetContactInfo(contactInfoDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await contactInfoRepository.InsertOrUpdateAsync(contactInfo, session);
			});

			return Ok("ContactInfo updated successfully");
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
				Id = contactInfo?.Id,
				CreateDate = contactInfo.CreateDate,
				ModificationDate = contactInfo.ModificationDate,
				IsVisible = contactInfo.IsVisible,
				Text = contactInfo.Text,
				PictureIdList = contactInfo.PictureList.Select(x=>x.PictureId).ToList()
			};
		}
		private ContactInfo GetContactInfo(ContactInfoDto contactInfoDto)
		{
			return transactionCoordinator.InRollbackScope(session => {
				return new ContactInfo()
				{

					Id = contactInfoDto?.Id ?? 0,
					CreateDate = contactInfoDto.CreateDate ?? DateTime.Now,
					ModificationDate = contactInfoDto.ModificationDate ?? DateTime.Now,
					IsVisible = contactInfoDto.IsVisible ?? true,
					IsDeleted = false,
					Text = contactInfoDto.Text,
					PictureList = pictureRepository.GetPictureListByIdListAsync(contactInfoDto.PictureIdList ?? new List<int>(), session).Result
				};
			});
		}
	}
}