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
	public class ProductController : ControllerBase
	{

		private readonly ILogger<ProductController> logger;
		private readonly ITransactionCoordinator transactionCoordinator;
		private readonly IProductRepository productRepository;
		private readonly IPictureRepository pictureRepository;
		private readonly ICategoryRepository categoryRepository;

		public ProductController(ILogger<ProductController> logger,
			ITransactionCoordinator transactionCoordinator,
			IProductRepository productRepository,
			IPictureRepository pictureRepository,
			ICategoryRepository categoryRepository)
		{
			this.logger = logger;
			this.transactionCoordinator = transactionCoordinator;
			this.productRepository = productRepository;
			this.pictureRepository = pictureRepository;
			this.categoryRepository = categoryRepository;
		}

		[HttpPost]
		[Route("/AddProduct")]
		[SwaggerResponse(HttpStatusCode.OK, "Product inserted successfully")]
		public async Task<ActionResult> AddProduct([FromBody] ProductDto productDto)
		{
			var product = await GetProduct(productDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await productRepository.InsertAsync(product, session);
			});

			return Ok("Product inserted successfully");
		}


		[HttpGet]
		[Route("/GetAllProductList")]
		[SwaggerResponse(HttpStatusCode.OK, "Product List")]
		public async Task<ActionResult<IList<ProductDto>>> GetAllProductList()
		{
			IList<ProductDto> productDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var productList = await productRepository.GetAllAsync(session);
				productDtoList = productList.Select(GetProductDto).ToList();
			});

			return Ok(productDtoList);
		}

		[HttpGet]
		[Route("/GetVisibleProductList")]
		[SwaggerResponse(HttpStatusCode.OK, "Product List")]
		public async Task<ActionResult<IList<ProductDto>>> GetVisibleProductList()
		{
			IList<ProductDto> productDtoList = null;
			await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				var productList = await productRepository.GetAllAsync(session);
				productDtoList = productList.Where(x => x.IsVisible).Select(GetProductDto).ToList();
			});

			return Ok(productDtoList);
		}

		[HttpPatch]
		[Route("/UpdateProduct")]
		[SwaggerResponse(HttpStatusCode.OK, "Product updated successfully")]
		public async Task<ActionResult> UpdateProduct([FromBody] ProductDto productDto)
		{
			var product = await GetProduct(productDto);
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await productRepository.UpdateAsync(product, session);
			});

			return Ok("Product updated successfully");
		}
		[HttpDelete]
		[Route("/DeleteProduct/{productId}")]
		[SwaggerResponse(HttpStatusCode.OK, "Product was deleted successfully")]
		public async Task<ActionResult> DeletProduct([FromRoute] int productId)
		{
			await transactionCoordinator.InCommitScopeAsync(async session =>
			{
				await productRepository.DeleteAsync(productId, session);
			});

			return Ok("Product was deleted successfully");
		}

		private ProductDto GetProductDto(Product product)
		{
			return new ProductDto()
			{
				Id = product?.Id,
				Name = product.Name,
				Price = product.Price,
				Description = product.Description,
				DiscountPrice = product.DiscountPrice,
				Score = product.Score,
				IsRecommended = product.IsRecommended,
				IsVisible = product.IsVisible,
				PictureIdList = product.PictureList.Select(x => x.PictureId).ToList(),
				CategoryId = product.Category.Id
			};
		}
		private async Task<Product> GetProduct(ProductDto productDto)
		{
			return await transactionCoordinator.InRollbackScopeAsync(async session =>
			{
				return new Product()
				{

					Id = productDto?.Id ?? 0,
					Name = productDto.Name,
					Price = productDto.Price ?? 0,
					Description = productDto.Description,
					DiscountPrice = productDto.DiscountPrice,
					Score = productDto.Score,
					IsRecommended = productDto.IsRecommended ?? false,
					IsVisible = productDto.IsVisible ?? true,
					IsDeleted = false,
					PictureList = await pictureRepository.GetPictureListByIdListAsync(productDto.PictureIdList ?? new List<int>(), session),
					Category = await categoryRepository.GetByIdAsync(productDto.CategoryId ?? 0, session)

				};
			});
		}
	}
}