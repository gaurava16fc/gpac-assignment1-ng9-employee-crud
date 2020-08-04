using EmployeeApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeApp.API.Data.Repository
{
    public class EmployeePhotoRepository : Repository<DataContext, Photo>, IEmployeePhotoRepository
    {
        private readonly DataContext _repoContext;

        public EmployeePhotoRepository(DataContext repoContext) : base(repoContext)
        {
            this._repoContext = repoContext;
        }

        public async Task<Photo> GetMainPhotoForEmployeeAsync(int employeeId)
        {
            return await Read().Where(p => p.EmployeeId == employeeId).FirstOrDefaultAsync(p=>p.IsMain);
        }

        public IQueryable<Photo> GetAllPhotos(int employeeId)
        {
            return Read().Where(p => p.EmployeeId == employeeId).AsQueryable();
        }
    }
}
