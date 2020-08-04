using EmployeeApp.API.Models;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeApp.API.Data.Repository
{
    public interface IEmployeePhotoRepository : IRepository<Photo>
    {
        Task<Photo> GetMainPhotoForEmployeeAsync(int employeeId);
        IQueryable<Photo> GetAllPhotos(int employeeId);
    }
}
