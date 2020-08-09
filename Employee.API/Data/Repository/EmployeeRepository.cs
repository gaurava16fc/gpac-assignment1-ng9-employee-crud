using EmployeeApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using EmployeeApp.API.Data.Repository.Interfaces;


namespace EmployeeApp.API.Data.Repository
{
    public class EmployeeRepository : Repository<RepositoryDBContext, Employee>, IEmployeeRepository
    {
        private readonly RepositoryDBContext _repoContext;

        public EmployeeRepository(RepositoryDBContext repoContext) : base(repoContext)
        {
            this._repoContext = repoContext;
        }

        public IQueryable<Employee> ReadEmployeesWithPhotos()
        {
            return FindAll().Include(p => p.Photos).AsQueryable(); 
        }
    }
}
