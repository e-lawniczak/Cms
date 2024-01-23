namespace PizzeriaAPI.Database.Entities
{
    public class Role
    {
        public virtual int RoleId { get; set; }
        public virtual string Name { get; set; }
        public virtual DateTime CreationDate { get; set; }
        public virtual DateTime ModificationDate { get; set; }
        public virtual bool IsVisible { get; set; }
        public virtual bool IsDeleted { get; set; }
        public virtual IList<TeamMember>? TeamMemberList { get; set; }
        public virtual IList<Testimonial>? TestimonialList { get; set; }

    }
}
