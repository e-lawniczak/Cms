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
		public async Task<ActionResult> AddTestimonial([FromBody] TestimonialDto testimonialDto)
		{
			var testimonial = GetTestimonial(testimonialDto);
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
			IList<TestimonialDto> testimonialDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var testimonialList = await testimonialRepository.GetAllAsync(session);
				testimonialDtoList = testimonialList.Select(GetTestimonialDto).ToList();
			});

			return Ok(testimonialDtoList);
		}

		[HttpGet]
		[Route("/GetVisibleTestimonialList")]
		[SwaggerResponse(HttpStatusCode.OK, "Testimonial List")]
		public async Task<ActionResult<IList<TestimonialDto>>> GetVisibleTestimonialList()
		{
			IList<TestimonialDto> testimonialDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var testimonialList = await testimonialRepository.GetAllAsync(session);
				testimonialDtoList = testimonialList.Where(x => x.IsVisible).Select(GetTestimonialDto).ToList();
			});

			return Ok(testimonialDtoList);
		}

		[HttpPatch]
		[Route("/UpdateTestimonial")]
		[SwaggerResponse(HttpStatusCode.OK, "Testimonial updated successfully")]
		public async Task<ActionResult> UpdateTestimonial([FromBody] TestimonialDto testimonialDto)
		{
			var testimonial = GetTestimonial(testimonialDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await testimonialRepository.InsertAsync(testimonial, session);
			});

			return Ok("Testimonial updated successfully");
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
				Id = testimonial?.Id ?? 0,
				FirstName = testimonial.FirstName,
				LastName = testimonial.LastName,
				Text = testimonial.Text,
				IsVisible = testimonial.IsVisible,
				PictureIdList = testimonial.PictureList.Select(x => x.PictureId).ToList(),
				RoleId = testimonial.Role.RoleId
			};
		}
		private Testimonial GetTestimonial(TestimonialDto testimonialDto)
		{
			return transactionCoordinator.InRollbackScope(session => {
				return new Testimonial()
				{

					Id = testimonialDto?.Id ?? 0,
					FirstName = testimonialDto.FirstName,
					LastName = testimonialDto.LastName,
					Text = testimonialDto.Text,
					IsVisible = testimonialDto.IsVisible ?? true,
					IsDeleted = false,
					PictureList = pictureRepository.GetPictureListByIdListAsync(testimonialDto.PictureIdList ?? new List<int>(), session).Result,
					Role = roleRepository.GetByIdAsync(testimonialDto.RoleId ?? 0, session).Result

				};
			});
		}
	}
}