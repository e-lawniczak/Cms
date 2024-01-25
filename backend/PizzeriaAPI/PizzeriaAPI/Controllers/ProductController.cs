using Microsoft.AspNetCore.Mvc;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Dto.Product;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories;
using PizzeriaAPI.Repositories.EntityWithPictureRepositories;
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
        public async Task<ActionResult> AddProduct([FromBody] AddProductDto productDto)
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
            IList<ProductDto> productDtoList = new List<ProductDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var productList = await productRepository.GetAllAsync(session);
                if (productList != null)
                    productDtoList = productList.Select(GetProductDto).ToList();
            });

            return Ok(productDtoList);
        }

        [HttpGet]
        [Route("/GetVisibleProductList")]
        [SwaggerResponse(HttpStatusCode.OK, "Product List")]
        public async Task<ActionResult<IList<ProductDto>>> GetVisibleProductList()
        {
            IList<ProductDto> productDtoList = new List<ProductDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var productList = await productRepository.GetVisibleAsync(session);
                if (productList != null)
                    productDtoList = productList.Select(GetProductDto).ToList();
            });

            return Ok(productDtoList);
        }

        [HttpPatch]
        [Route("/UpdateProduct")]
        [SwaggerResponse(HttpStatusCode.OK, "Product updated successfully")]
        [SwaggerResponse(HttpStatusCode.BadRequest, "Product not found")]
        public async Task<ActionResult> UpdateProduct([FromBody] ProductDto productDto)
        {
            var product = await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return await productRepository.GetByIdAsync(productDto.Id, session);
            });

            if (product == null)
                return BadRequest("Product not found");

            await UpdateProduct(product, productDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await productRepository.UpdateAsync(product, session);
            });

            return Ok("Product updated successfully");
        }

        private async Task UpdateProduct(Product product, ProductDto productDto)
        {
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                product.Name = productDto.Name;
                product.Price = productDto.Price;
                product.Description = productDto.Description;
                product.DiscountPrice = productDto.DiscountPrice;
                product.Score = productDto.Score;
                product.IsRecommended = productDto.IsRecommended;
                product.IsVisible = productDto.IsVisible;
                product.PictureList = await pictureRepository.GetPictureListByIdListAsync(productDto.PictureIdList ?? new List<int>(), session);
                product.Category = await categoryRepository.GetByIdAsync(productDto.CategoryId ??0, session);
            });
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
                Id = product.Id,
                Name = product.Name,
                Price = product.Price,
                Description = product.Description,
                DiscountPrice = product.DiscountPrice,
                Score = product.Score,
                IsRecommended = product.IsRecommended,
                IsVisible = product.IsVisible,
                PictureIdList = product.PictureList?.Select(x => x.PictureId ).ToList(),
                CategoryId = product.Category?.Id ?? 0
            };
        }

        private async Task<Product> GetProduct(AddProductDto productDto)
        {
            return await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return new Product()
                {

                    Name = productDto.Name,
                    Price = productDto.Price,
                    Description = productDto.Description,
                    DiscountPrice = productDto.DiscountPrice,
                    Score = productDto.Score,
                    IsRecommended = productDto.IsRecommended,
                    IsVisible = productDto.IsVisible,
                    IsDeleted = false,
                    PictureList = await pictureRepository.GetPictureListByIdListAsync(productDto.PictureIdList ?? new List<int>(), session),
                    Category = await categoryRepository.GetByIdAsync(productDto.CategoryId ?? 0, session)

                };
            });
        }
    }
}