using EmployeeApp.API.Models;
using System.Linq;

namespace EmployeeApp.API.Data.Repository
{
    public interface IEmployeeRepository : IRepository<Employee>
    {
        IQueryable<Employee> ReadEmployeesWithPhotos();
    }
}
