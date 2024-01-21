
namespace PizzeriaAPI.Database.Entities
{
    public class TeamMember : EntityWithPicture
    {
        public virtual string FirstName { get; set; }
        public virtual string LastName { get; set; }
        public virtual Role Role { get; set; }
        public virtual IList<SocialMedia> SocialMediaList { get; set; }
    }
}
