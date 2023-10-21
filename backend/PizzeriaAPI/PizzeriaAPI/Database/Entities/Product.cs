using Microsoft.AspNetCore.Components.Web.Virtualization;

namespace PizzeriaAPI.Database.Entities
{
	public class Product
	{
		public virtual int ProductId { get; set; }
		public virtual string ProductName { get; set; }
		public virtual decimal ProductPrice { get; set; }
		public virtual string ProductDescription { get; set; }
		public virtual decimal? ProductDiscountPrice { get; set; }
	}
}
