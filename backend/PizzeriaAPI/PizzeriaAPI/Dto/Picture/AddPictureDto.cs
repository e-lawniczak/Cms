﻿using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Dto.Picture
{
    public class AddPictureDto
    {
        [Required]
        [FileExtensions(Extensions = "jpg,jpeg,png")]
        public string Name { get; set; }
        public string? Link { get; set; }
        [Required]
        public IFormFile Picture { get; set; }
    }
}
