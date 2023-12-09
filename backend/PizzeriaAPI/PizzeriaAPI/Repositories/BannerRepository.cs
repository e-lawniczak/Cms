using PizzeriaAPI.Database.Entities;

namespace PizzeriaAPI.Repositories
{

	public interface IBannerRepository: IGenericRepository<Banner>
	{ }
	public class BannerRepository : GenericRepository<Banner>, IBannerRepository
	{
	}
}
