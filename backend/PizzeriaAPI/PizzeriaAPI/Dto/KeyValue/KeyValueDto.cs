using System.ComponentModel.DataAnnotations;

namespace PizzeriaAPI.Dto.KeyValue
{
    public class KeyValueDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Key { get; set; }
        [Required]
        public string Value { get; set; }
    }
}
