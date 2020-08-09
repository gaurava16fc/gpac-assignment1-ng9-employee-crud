using EmployeeApp.API.Data.Repository.Interfaces;

namespace EmployeeApp.API.Data.Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly RepositoryDBContext _repositoryDBContext;
        private IEmployeePhotoRepository _employeePhotoRepository;

        private IEmployeeRepository _employeeRepository;
        private IDepartmentRepository _departmentRepository;
        private IFacilityRepository _facilityRepository;
        private IAuthRepository _authRepository;

        public RepositoryWrapper(RepositoryDBContext repositoryDBContext)
        {
            _repositoryDBContext = repositoryDBContext;
        }

        public IEmployeePhotoRepository EmployeePhotoRepository
        {
            get
            {
                //=> return (_employeePhotoRepository==null)?new EmployeePhotoRepository(_repo);
                if (_employeePhotoRepository == null)
                {
                    _employeePhotoRepository = new EmployeePhotoRepository(_repositoryDBContext);
                }
                return _employeePhotoRepository;
            }
        }

        public IEmployeeRepository EmployeeRepository
        {
            get
            {
                if (_employeeRepository == null)
                {
                    _employeeRepository = new EmployeeRepository(_repositoryDBContext);
                }
                return _employeeRepository;
            }
        }

        public IDepartmentRepository DepartmentRepository
        {
            get
            {
                if (_departmentRepository == null)
                {
                    _departmentRepository = new DepartmentRepository(_repositoryDBContext);
                }
                return _departmentRepository;
            }
        }

        public IFacilityRepository FacilityRepository
        {
            get
            {
                if (_facilityRepository == null)
                {
                    _facilityRepository = new FacilityRepository(_repositoryDBContext);
                }
                return _facilityRepository;
            }
        }

        public IAuthRepository AuthRepository
        {
            get
            {
                if (_authRepository == null)
                {
                    _authRepository = new AuthRepository(_repositoryDBContext);
                }
                return _authRepository;
            }
        }
    }
}
