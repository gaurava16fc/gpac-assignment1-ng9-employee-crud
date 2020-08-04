using EmployeeApp.API.Models;

namespace EmployeeApp.API.Data.Repository
{
    public class DepartmentRepository : Repository<DataContext, Department>, IDepartmentRepository
    {
        public DepartmentRepository(DataContext repoContext) : base(repoContext)
        {
        }
    }
}
