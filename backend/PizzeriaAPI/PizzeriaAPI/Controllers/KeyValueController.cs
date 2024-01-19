using Microsoft.AspNetCore.Mvc;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Dto;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories;
using Swashbuckle.Swagger.Annotations;
using System.Net;
using PizzeriaAPI.Dto.KeyValue;

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
		public async Task<ActionResult> AddKeyValue([FromBody] AddKeyValueDto keyValueDto)
		{
			var keyValue = GetKeyValue(keyValueDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await keyValueRepository.InsertAsync(keyValue, session);
			});

			return Ok("KeyValue inserted successfully");
		}

		[HttpGet]
		[Route("/GetKeyValue/{Key}")]
		[SwaggerResponse(HttpStatusCode.OK, "KeyValue got successfully", typeof(KeyValueDto))]
		public async Task<ActionResult<KeyValueDto>> GetKeyValue([FromRoute] string Key)
		{
            KeyValueDto keyValueDto = null;
            await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
                var keyValue = await keyValueRepository.GetByKeyAsync(Key, session);
                keyValueDto = GetKeyValueDto(keyValue);
            });

            return Ok(keyValueDto);
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
		[HttpGet]
		[Route("/GetKeyValue/{keyValueId}")]
		[SwaggerResponse(HttpStatusCode.OK, "KeyValue got successfully", typeof(KeyValueDto))]
		public async Task<ActionResult<KeyValueDto>> GetKeyValue([FromRoute] int keyValueId)
		{
            KeyValueDto keyValueDto = null;
            await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
                var keyValue = await keyValueRepository.GetByIdAsync(keyValueId, session);
                keyValueDto = GetKeyValueDto(keyValue);
            });

            return Ok(keyValueDto);
        }

		[HttpPatch]
		[Route("/UpdateKeyValue")]
		[SwaggerResponse(HttpStatusCode.OK, "KeyValue updated successfully")]
		public async Task<ActionResult> UpdateKeyValue([FromBody] KeyValueDto keyValueDto)
		{
			var keyValue = GetKeyValue(keyValueDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await keyValueRepository.UpdateAsync(keyValue, session);
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
			return new KeyValue()
			{
				Id = keyValueDto?.Id ?? 0,
				Key = keyValueDto.Key,
				Value = keyValueDto.Value,
			};
		}
		private KeyValue GetKeyValue(AddKeyValueDto keyValueDto)
		{
            return new KeyValue()
			{
                Key = keyValueDto.Key,
                Value = keyValueDto.Value,
            };
        }
	}
}