﻿namespace PizzeriaAPI.Security
{
	public class AuthenticationResponse
	{
		public int Id { get; set; }
		public string? Email { get; set; }
		public string? Token { get; set; }
	}
}
