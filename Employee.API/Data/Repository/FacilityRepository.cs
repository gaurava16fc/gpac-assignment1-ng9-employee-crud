using EmployeeApp.API.Models;
using EmployeeApp.API.Data.Repository.Interfaces;


namespace EmployeeApp.API.Data.Repository
{
    public class FacilityRepository : Repository<RepositoryDBContext, Facility>, IFacilityRepository
    {
        public FacilityRepository(RepositoryDBContext repoContext) : base(repoContext)
        {
        }
    }
}
