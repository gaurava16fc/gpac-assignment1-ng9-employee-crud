using EmployeeApp.API.Models;

namespace EmployeeApp.API.Data.Repository
{
    public class FacilityRepository : Repository<DataContext, Facility>, IFacilityRepository
    {
        public FacilityRepository(DataContext repoContext) : base(repoContext)
        {
        }
    }
}
