using System.Linq;
using System.Threading.Tasks;

namespace EmployeeApp.API.Data.Repository
{
    public interface IRepository<T> where T:class
    {
        // CRUD Operations...
        Task Create(T entity);
        IQueryable<T> Read();
        Task Update(T entity);
        Task Delete(T entity);
    }
}
