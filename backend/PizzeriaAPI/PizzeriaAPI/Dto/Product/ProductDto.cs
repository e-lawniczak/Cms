using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Dto.Product
{
    public class ProductDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public decimal? DiscountPrice { get; set; }
        public decimal? Score { get; set; }
        [Required]
        public bool IsRecommended { get; set; }
        public int? CategoryId { get; set; }
        [Required]
        public int Id { get; set; }
        [Required]
        public bool IsVisible { get; set; }
        public IList<int>? PictureIdList { get; set; }
    }
}
