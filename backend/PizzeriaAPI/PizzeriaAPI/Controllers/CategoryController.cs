using Microsoft.AspNetCore.Mvc;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Dto.Category;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories.BaseEntityRepositories;
using PizzeriaAPI.Repositories.EntityWithPictureRepositories;
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
        public async Task<ActionResult> AddCategory([FromBody] AddCategoryDto categoryDto)
        {
            var category = await GetCategory(categoryDto);
            await transactionCoordinator.InCommitScopeAsync(async session =>
            {
                await categoryRepository.InsertAsync(category, session);
            });

            return Ok("Category inserted successfully");
        }

        [HttpGet]
        [Route("/GetCategory/{categoryName}")]
        [SwaggerResponse(HttpStatusCode.OK, "Category got successfully", typeof(CategoryDto))]
        public async Task<ActionResult<CategoryDto>> GetCategory([FromRoute] string categoryName)
        {
            CategoryDto? categoryDto = null;
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var category = await categoryRepository.GetCategoryByNameAsync(categoryName, session);
                if (category != null)
                    categoryDto = GetCategoryDto(category);
            });

            return Ok(categoryDto);
        }


        [HttpGet]
        [Route("/GetAllCategoryList")]
        [SwaggerResponse(HttpStatusCode.OK, "Category List")]
        public async Task<ActionResult<IList<CategoryDto>>> GetAllCategoryList()
        {
            IList<CategoryDto> categoryDtoList = new List<CategoryDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var categoryList = await categoryRepository.GetAllAsync(session);
                if (categoryList != null)
                    categoryDtoList = categoryList.Select(GetCategoryDto).ToList();
            });

            return Ok(categoryDtoList);
        }

        [HttpGet]
        [Route("/GetVisibleCategoryList")]
        [SwaggerResponse(HttpStatusCode.OK, "Category List")]
        public async Task<ActionResult<IList<CategoryDto>>> GetVisibleCategoryList()
        {
            IList<CategoryDto> categoryDtoList = new List<CategoryDto>();
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                var categoryList = await categoryRepository.GetVisibleAsync(session);
                if (categoryList != null)
                    categoryDtoList = categoryList.Select(GetCategoryDto).ToList();
            });

            return Ok(categoryDtoList);
        }

        [HttpPatch]
        [Route("/UpdateCategory")]
        [SwaggerResponse(HttpStatusCode.OK, "Category updated successfully")]
        [SwaggerResponse(HttpStatusCode.BadRequest, "Category not found")]
        public async Task<ActionResult> UpdateCategory([FromBody] CategoryDto categoryDto)
        {
            var category = await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return await categoryRepository.GetByIdAsync(categoryDto.Id, session);
            });
            if (category == null)
                return BadRequest("Category not found");

            await UpdateCategory(category, categoryDto);

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

        private async Task UpdateCategory(Category category, CategoryDto categoryDto)
        {
            await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                category.Name = categoryDto.Name;
                category.Link = categoryDto.Link;
                category.IsVisible = categoryDto.IsVisible;
                category.PictureList = await pictureRepository.GetPictureListByIdListAsync(categoryDto.PictureIdList ?? new List<int>(), session);
                category.ProductList = await productRepository.GetByIdListAsync(categoryDto.ProductIdList ?? new List<int>(), session);
            });
        }
        private CategoryDto GetCategoryDto(Category category)
        {
            return new CategoryDto()
            {
                Id = category.Id,
                Name = category.Name,
                Link = category.Link,
                IsVisible = category.IsVisible,
                PictureIdList = category.PictureList?.Select(x => x.Id).ToList(),
                ProductIdList = category.ProductList?.Select(x => x.Id).ToList()
            };
        }

        private async Task<Category> GetCategory(AddCategoryDto categoryDto)
        {
            return await transactionCoordinator.InRollbackScopeAsync(async session =>
            {
                return new Category()
                {
                    Name = categoryDto.Name,
                    Link = categoryDto.Link,
                    IsVisible = categoryDto.IsVisible,
                    IsDeleted = false,
                    PictureList = await pictureRepository.GetPictureListByIdListAsync(categoryDto.PictureIdList ?? new List<int>(), session),
                    ProductList = await productRepository.GetByIdListAsync(categoryDto.ProductIdList ?? new List<int>(), session)

                };
            });
        }
    }
}