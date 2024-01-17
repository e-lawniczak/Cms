﻿using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Domain
{
	public class ChangePasswordRequest
	{
		[Required]
		public string Email { get; set; }
		[Required]
		public string Password { get; set; }
		[Required]
		public string ConfirmPassword { get; set; }
	}
}