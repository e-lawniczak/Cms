﻿using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Dto.ContactInfo
{
    public class AddContactInfoDto
    {
        [Required]
        public bool IsVisible { get; set; }
        [Required]
        public string Text { get; set; }
        public IList<int>? PictureIdList { get; set; }

    }
}
