namespace EmployeeApp.API.Data.Repository.Interfaces
{
    public interface IRepositoryWrapper
    {
        IEmployeePhotoRepository EmployeePhotoRepository { get; }
        IEmployeeRepository EmployeeRepository { get; }
        IDepartmentRepository DepartmentRepository { get; }
        IFacilityRepository FacilityRepository { get; }
        IAuthRepository AuthRepository { get; }
    }
}
