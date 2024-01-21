namespace PizzeriaAPI.Database.Entities
{
    public class Product : EntityWithPicture
    {
        public virtual string Name { get; set; }
        public virtual decimal Price { get; set; }
        public virtual string? Description { get; set; }
        public virtual decimal? DiscountPrice { get; set; }
        public virtual decimal? Score { get; set; }
        public virtual bool IsRecommended { get; set; }
        public virtual Category Category { get; set; }
    }
}
