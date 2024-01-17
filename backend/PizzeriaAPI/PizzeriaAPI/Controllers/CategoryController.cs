using Microsoft.AspNetCore.Mvc;
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
	public class CategoryController : ControllerBase
	{

		private readonly ILogger<CategoryController> logger;
		private readonly ITransactionCoordinator transactionCoordinator;
		private readonly ICategoryRepository categoryRepository;
		private readonly IPictureRepository pictureRepository;
		private readonly IProductRepository productRepository;

		public CategoryController(ILogger<CategoryController> logger,
			ITransactionCoordinator transactionCoordinator,
			ICategoryRepository categoryRepository,
			IPictureRepository pictureRepository,
			IProductRepository productRepository)
		{
			this.logger = logger;
			this.transactionCoordinator = transactionCoordinator;
			this.categoryRepository = categoryRepository;
			this.pictureRepository = pictureRepository;
			this.productRepository = productRepository;
		}

		[HttpPost]
		[Route("/AddCategory")]
		[SwaggerResponse(HttpStatusCode.OK, "Category inserted successfully")]
		public async Task<ActionResult> AddCategory([FromBody] CategoryDto categoryDto)
		{
			var category = await GetCategory(categoryDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await categoryRepository.InsertAsync(category, session);
			});

			return Ok("Category inserted successfully");
		}


		[HttpGet]
		[Route("/GetAllCategoryList")]
		[SwaggerResponse(HttpStatusCode.OK, "Category List")]
		public async Task<ActionResult<IList<CategoryDto>>> GetAllCategoryList()
		{
			IList<CategoryDto> categoryDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var categoryList = await categoryRepository.GetAllAsync(session);
				categoryDtoList = categoryList.Select(GetCategoryDto).ToList();
			});

			return Ok(categoryDtoList);
		}

		[HttpGet]
		[Route("/GetVisibleCategoryList")]
		[SwaggerResponse(HttpStatusCode.OK, "Category List")]
		public async Task<ActionResult<IList<CategoryDto>>> GetVisibleCategoryList()
		{
			IList<CategoryDto> categoryDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var categoryList = await categoryRepository.GetAllAsync(session);
				categoryDtoList = categoryList.Where(x => x.IsVisible).Select(GetCategoryDto).ToList();
			});

			return Ok(categoryDtoList);
		}

		[HttpPatch]
		[Route("/UpdateCategory")]
		[SwaggerResponse(HttpStatusCode.OK, "Category updated successfully")]
		public async Task<ActionResult> UpdateCategory([FromBody] CategoryDto categoryDto)
		{
			var category = await GetCategory(categoryDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await categoryRepository.UpdateAsync(category, session);
			});

			return Ok("Category updated successfully");
		}
		[HttpDelete]
		[Route("/DeleteCategory/{categoryId}")]
		[SwaggerResponse(HttpStatusCode.OK, "Category was deleted successfully")]
		public async Task<ActionResult> DeletCategory([FromRoute] int categoryId)
		{
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await categoryRepository.DeleteAsync(categoryId, session);
			});

			return Ok("Category was deleted successfully");
		}

		private CategoryDto GetCategoryDto(Category category)
		{
			return new CategoryDto()
			{
				Id = category?.Id ?? 0,
				Name = category.Name,
				Link = category.Link,
				IsVisible = category.IsVisible,
				PictureIdList = category.PictureList.Select(x => x.PictureId).ToList(),
				ProductIdList = category.ProductList.Select(x => x.Id).ToList()
			};
		}
		private async Task<Category> GetCategory(CategoryDto categoryDto)
		{
			return await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				return new Category()
				{
					Id = categoryDto?.Id ?? 0,
					Name = categoryDto.Name,
					Link = categoryDto.Link,
					IsVisible = categoryDto.IsVisible ?? true,
					IsDeleted = false,
					PictureList = await pictureRepository.GetPictureListByIdListAsync(categoryDto.PictureIdList ?? new List<int>(), session),
					ProductList = await productRepository.GetProductListByIdListAsync(categoryDto.ProductIdList ?? new List<int>(), session)

				};
			});
		}
	}
}