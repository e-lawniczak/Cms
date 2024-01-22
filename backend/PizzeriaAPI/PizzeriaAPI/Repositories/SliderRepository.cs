using PizzeriaAPI.Database.Entities;
using ISession = NHibernate.ISession;

namespace PizzeriaAPI.Repositories
{
    public interface ISliderRepository : IGenericRepository<Slider>
    {
        Task DeleteAsync(int id, ISession session);
        Task<Slider> GetSliderByNameAsync(string name, ISession session);

    }
    public class SliderRepository : GenericRepository<Slider>, ISliderRepository
    {
        public new async Task<IList<Slider>> GetAllAsync(ISession session)
        {
            var result = await base.GetAllAsync(session);
            return result.OrderBy(x => x.SliderId).ToList();
        }
        public async Task<Slider> GetSliderByNameAsync(string name, ISession session)
        {
            return await session.QueryOver<Slider>()
                .Where(x => x.Name == name)
                .SingleOrDefaultAsync();
        }
        public async Task DeleteAsync(int id, ISession session)
        {
            var entity = await GetByIdAsync(id, session);
            entity.IsDeleted = true;
            foreach(var banner in entity.BannerList)
            {
                banner.Slider = null;
            }
            await UpdateAsync(entity, session);
        }

        public override async Task InsertAsync(Slider entity, ISession session)
        {
            entity.CreationDate = DateTime.Now;
            entity.ModificationDate = DateTime.Now;
            await base.InsertAsync(entity, session);
        }

        public override async Task UpdateAsync(Slider entity, ISession session)
        {
            entity.ModificationDate = DateTime.Now;
            await base.UpdateAsync(entity, session);
        }
    }
}
