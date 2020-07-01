using AutoMapper;
using EmployeeApp.API.DTOs;
using EmployeeApp.API.Models;

namespace EmployeeApp.API.Helper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Employee, EmployeeDTO>();
            CreateMap<EmployeeForUpdateDTO, Employee>();
            CreateMap<EmployeeForAddDTO, Employee>();
        }
    }
}
