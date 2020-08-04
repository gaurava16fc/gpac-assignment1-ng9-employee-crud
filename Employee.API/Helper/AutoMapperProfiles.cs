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
                    opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

            CreateMap<Employee, EmployeeForDetailedDTO>()
            .ForMember(dest => dest.PhotoUrl,
                        opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));


            CreateMap<EmployeeForUpdateDTO, Employee>()
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

            CreateMap<EmployeeForAddDTO, Employee>()
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));


            CreateMap<Department, DepartmentDTO>();
            CreateMap<Facility, FacilityDTO>();
            CreateMap<Photo, PhotoForReturnDTO>();
            CreateMap<PhotoForCreationDTO, Photo>();
            CreateMap<Photo, PhotoForDetailedDTO>();
        }
    }
}
