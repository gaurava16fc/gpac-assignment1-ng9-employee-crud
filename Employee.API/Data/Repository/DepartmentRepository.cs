using EmployeeApp.API.Models;
using EmployeeApp.API.Data.Repository.Interfaces;


namespace EmployeeApp.API.Data.Repository
{
    public class DepartmentRepository : Repository<RepositoryDBContext, Department>, IDepartmentRepository
    {
        public DepartmentRepository(RepositoryDBContext repoContext) : base(repoContext)
        {
        }
    }
}
