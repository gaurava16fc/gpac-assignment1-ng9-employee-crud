using EmployeeApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using EmployeeApp.API.Data.Repository.Interfaces;


namespace EmployeeApp.API.Data.Repository
{
    public class EmployeePhotoRepository : Repository<RepositoryDBContext, Photo>, IEmployeePhotoRepository
    {
        private readonly RepositoryDBContext _repoContext;

        public EmployeePhotoRepository(RepositoryDBContext repoContext) : base(repoContext)
        {
            this._repoContext = repoContext;
        }

        public async Task<Photo> GetMainPhotoForEmployeeAsync(int employeeId)
        {
            return await FindAll().Where(p => p.EmployeeId == employeeId).FirstOrDefaultAsync(p=>p.IsMain);
        }

        public IQueryable<Photo> GetAllPhotos(int employeeId)
        {
            return FindAll().Where(p => p.EmployeeId == employeeId).AsQueryable();
        }
    }
}
