namespace PizzeriaAPI.Database.Entities
{
    public class Category : EntityWithPicture
    {
        public virtual string Name { get; set; }
        public virtual string? Link { get; set; }
        public virtual IList<Product>? ProductList { get; set; }

    }
}
