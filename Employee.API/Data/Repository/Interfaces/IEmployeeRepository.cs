using EmployeeApp.API.Models;
using System.Linq;

namespace EmployeeApp.API.Data.Repository.Interfaces
{
    public interface IEmployeeRepository : IRepository<Employee>
    {
        IQueryable<Employee> ReadEmployeesWithPhotos();
    }
}
