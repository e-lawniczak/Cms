﻿using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Security
{
	public class AuthenticationRequest
	{
		[Required]
		public string? Email { get; set; }
		[Required]
		public string? Password { get; set; }
	}
}
