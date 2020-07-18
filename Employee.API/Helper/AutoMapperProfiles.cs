using AutoMapper;
using EmployeeApp.API.DTOs;
using EmployeeApp.API.Models;
using System.Linq;

namespace EmployeeApp.API.Helper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Employee, EmployeeDTO>()
                .ForMember(dest => dest.PhotoUrl,
                    opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url)); 

            CreateMap<EmployeeForUpdateDTO, Employee>();
            CreateMap<EmployeeForAddDTO, Employee>();
        }
    }
}
