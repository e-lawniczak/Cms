namespace PizzeriaAPI.Database.Entities
{
    public class Role : ExtendedDateEntity
    {
        public virtual string Name { get; set; }
        public virtual IList<TeamMember>? TeamMemberList { get; set; }
        public virtual IList<Testimonial>? TestimonialList { get; set; }

    }
}
