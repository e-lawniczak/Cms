namespace PizzeriaAPI.Dto.Picture
{
    public class PictureDto
    {
        public int? PictureId { get; set; }
        public string? Name { get; set; }
        public string? Link { get; set; }
        public string? FilePath { get; set; }
        public string? ResizedFilePath { get; set; }
        public IList<int>? EntityWithPictureIdList { get; set; }
    }
}
