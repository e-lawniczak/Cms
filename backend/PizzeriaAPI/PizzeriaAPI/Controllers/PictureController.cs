﻿using Microsoft.AspNetCore.Mvc;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Dto;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories;
using Swashbuckle.Swagger.Annotations;
using System.Net;

namespace PizzeriaAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class PictureController : ControllerBase
	{

		private readonly ILogger<PictureController> logger;
		private readonly ITransactionCoordinator transactionCoordinator;
		private readonly IPictureRepository pictureRepository;

		public PictureController(ILogger<PictureController> logger,
			ITransactionCoordinator transactionCoordinator,
			IPictureRepository pictureRepository)
		{
			this.logger = logger;
			this.transactionCoordinator = transactionCoordinator;
			this.pictureRepository = pictureRepository;
		}

		[HttpPost]
		[Route("/AddPicture")]
		[SwaggerResponse(HttpStatusCode.OK, "Picture inserted successfully")]
		public async Task<ActionResult> AddPicture([FromBody] PictureDto pictureDto)
		{
			var picture = await GetPicture(pictureDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await pictureRepository.InsertAsync(picture, session);
			});

			return Ok("Picture inserted successfully");
		}


		[HttpGet]
		[Route("/GetAllPictureList")]
		[SwaggerResponse(HttpStatusCode.OK, "Picture List")]
		public async Task<ActionResult<IList<PictureDto>>> GetAllPictureList()
		{
			IList<PictureDto> pictureDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var pictureList = await pictureRepository.GetAllAsync(session);
				pictureDtoList = pictureList.Select(GetPictureDto).ToList();
			});

			return Ok(pictureDtoList);
		}

		[HttpPatch]
		[Route("/UpdatePicture")]
		[SwaggerResponse(HttpStatusCode.OK, "Picture updated successfully")]
		public async Task<ActionResult> UpdatePicture([FromBody] PictureDto pictureDto)
		{
			var picture = await GetPicture(pictureDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await pictureRepository.UpdateAsync(picture, session);
			});

			return Ok("Picture updated successfully");
		}
		[HttpDelete]
		[Route("/DeletePicture/{pictureId}")]
		[SwaggerResponse(HttpStatusCode.OK, "Picture was deleted successfully")]
		public async Task<ActionResult> DeletPicture([FromRoute] int pictureId)
		{
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await pictureRepository.DeleteAsync(pictureId, session);
			});

			return Ok("Picture was deleted successfully");
		}

		private PictureDto GetPictureDto(Picture picture)
		{
			return new PictureDto()
			{
				PictureId = picture?.PictureId,
				Name = picture.Name,
				Link = picture.Link,
				File = picture.File,
				ResizedFile = picture.ResizedFile,
				EntityWithPictureIdList = picture.EntityWithPictureList.Select(x => x.Id).ToList(),
			};
		}
		private async Task<Picture> GetPicture(PictureDto pictureDto)
		{
			return await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				return new Picture()
				{

					PictureId = pictureDto?.PictureId ?? 0,
					Name = pictureDto.Name,
					Link = pictureDto.Link,
					ResizedFile = pictureDto.ResizedFile,
					File = pictureDto.File,
					//EntityWithPictureList = await pictureRepository.GetPictureListByIdListAsync(pictureDto.EntityWithPictureIdList ?? new List<int>(), session),
				};
			});
		}
	}
}