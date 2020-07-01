using EmployeeApp.API.Models;

namespace EmployeeApp.API.Data.Repository
{
    public class EmployeeRepository : Repository<DataContext, Employee>, IEmployeeRepository
    {
        public EmployeeRepository(DataContext repoContext) : base(repoContext)
        {
        }
    }
}
