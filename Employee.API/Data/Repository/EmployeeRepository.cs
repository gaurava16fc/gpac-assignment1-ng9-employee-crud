using EmployeeApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace EmployeeApp.API.Data.Repository
{
    public class EmployeeRepository : Repository<DataContext, Employee>, IEmployeeRepository
    {
        private readonly DataContext _repoContext;

        public EmployeeRepository(DataContext repoContext) : base(repoContext)
        {
            this._repoContext = repoContext;
        }

        public IQueryable<Employee> ReadEmployeesWithPhotos()
        {
            return Read().Include(p => p.Photos).AsQueryable(); 
        }
    }
}
