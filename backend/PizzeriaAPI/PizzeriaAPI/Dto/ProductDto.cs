﻿using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Dto
{
	public class ProductDto
	{

		public string? Name { get; set; }
		public decimal? Price { get; set; }
		public string? Description { get; set; }
		public decimal? DiscountPrice { get; set; }
		public decimal? Score { get; set; }
		public bool? IsRecommended { get; set; }
		public int? CategoryId { get; set; }
		public int? Id { get; set; }		
		public bool? IsVisible { get; set; }
		public IList<int>? PictureIdList { get; set; }
	}
}
