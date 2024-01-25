using NHibernate.SqlCommand;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Repositories.EntityRepository;
using PizzeriaAPI.Repositories.EntityWithPictureRepositories;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories.ExtendedBaseEntityRepositories
{
    public interface IRoleRepository : IExtendedDateEntityRepository<Role>
    {
        Task DeleteAsync(int id, ISession session);
    }
    public class RoleRepository : ExtendedDateEntityRepository<Role>, IRoleRepository
    {
        private readonly ITeamMemberRepository teamMemberRepository;
        private readonly ITestimonialRepository testimonialRepository;
        public RoleRepository(
            ITeamMemberRepository teamMemberRepository,
            ITestimonialRepository testimonialRepository,
            IEventRepository eventRepository) : base(eventRepository, Domain.ControllerEnum.Role)
        {
            this.teamMemberRepository = teamMemberRepository;
            this.testimonialRepository = testimonialRepository;
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await base.GetByIdAsync(id, session);
            foreach (var testimonial in entity.TestimonialList)
            {
                testimonial.Role = null;
                await testimonialRepository.UpdateAsync(testimonial, session);
            }
            foreach (var teamMember in entity.TeamMemberList)
            {
                teamMember.Role = null;
                await teamMemberRepository.UpdateAsync(teamMember, session);
            }
            await base.DeleteAsync(entity, session);
        }
        public new async Task<IList<Role>> GetAllAsync(ISession session)
        {
            var result = await base.GetAllAsync(session);
            return result.Select(role =>
            {
                role.TestimonialList = role.TestimonialList?.Where(testimonial => !testimonial?.IsDeleted ?? false).ToList();
                role.TeamMemberList = role.TeamMemberList?.Where(teamMember => !teamMember?.IsDeleted ?? false).ToList();
                return role;
            }).ToList();
        }

        public new async Task<IList<Role>> GetVisibleAsync(ISession session)
        {
            var result = await base.GetVisibleAsync(session);
            return result.Select(role =>
            {
                role.TestimonialList = role.TestimonialList?.Where(testimonial => (!testimonial?.IsDeleted ?? false) && (testimonial?.IsVisible ?? true)).ToList();
                role.TeamMemberList = role.TeamMemberList?.Where(teamMember => (!teamMember?.IsDeleted ?? false) && (teamMember?.IsVisible ?? true)).ToList();
                return role;
            }).ToList();
        }
    }
}
