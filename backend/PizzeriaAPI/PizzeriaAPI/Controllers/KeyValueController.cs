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
	public class KeyValueController : ControllerBase
	{

		private readonly ILogger<KeyValueController> logger;
		private readonly ITransactionCoordinator transactionCoordinator;
		private readonly IKeyValueRepository keyValueRepository;

		public KeyValueController(ILogger<KeyValueController> logger,
			ITransactionCoordinator transactionCoordinator,
			IKeyValueRepository keyValueRepository)
		{
			this.logger = logger;
			this.transactionCoordinator = transactionCoordinator;
			this.keyValueRepository = keyValueRepository;
		}

		[HttpPost]
		[Route("/AddKeyValue")]
		[SwaggerResponse(HttpStatusCode.OK, "KeyValue inserted successfully")]
		public async Task<ActionResult> AddKeyValue([FromBody] KeyValueDto keyValueDto)
		{
			var keyValue = GetKeyValue(keyValueDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await keyValueRepository.InsertOrUpdateAsync(keyValue, session);
			});

			return Ok("KeyValue inserted successfully");
		}


		[HttpGet]
		[Route("/GetAllKeyValueList")]
		[SwaggerResponse(HttpStatusCode.OK, "KeyValue List")]
		public async Task<ActionResult<IList<KeyValueDto>>> GetAllKeyValueList()
		{
			IList<KeyValueDto> keyValueDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var keyValueList = await keyValueRepository.GetAllAsync(session);
				keyValueDtoList = keyValueList.Select(GetKeyValueDto).ToList();
			});

			return Ok(keyValueDtoList);
		}

		[HttpPatch]
		[Route("/UpdateKeyValue")]
		[SwaggerResponse(HttpStatusCode.OK, "KeyValue updated successfully")]
		public async Task<ActionResult> UpdateKeyValue([FromBody] KeyValueDto keyValueDto)
		{
			var keyValue = GetKeyValue(keyValueDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await keyValueRepository.InsertOrUpdateAsync(keyValue, session);
			});

			return Ok("KeyValue updated successfully");
		}
		[HttpDelete]
		[Route("/DeleteKeyValue/{keyValueId}")]
		[SwaggerResponse(HttpStatusCode.OK, "KeyValue was deleted successfully")]
		public async Task<ActionResult> DeletKeyValue([FromRoute] int keyValueId)
		{
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await keyValueRepository.DeleteAsync(keyValueId, session);
			});

			return Ok("KeyValue was deleted successfully");
		}

		private KeyValueDto GetKeyValueDto(KeyValue keyValue)
		{
			return new KeyValueDto()
			{
				Id = keyValue.Id,
				Key = keyValue.Key, 
				Value = keyValue.Value,
			};
		}
		private KeyValue GetKeyValue(KeyValueDto keyValueDto)
		{
			return transactionCoordinator.InRollbackScope(session => {
				return new KeyValue()
				{

					Id = keyValueDto?.Id ?? 0,
					Key = keyValueDto.Key,
					Value = keyValueDto.Value,

				};
			});
		}
	}
}