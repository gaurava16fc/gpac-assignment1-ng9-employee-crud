using System;
using System.Collections.Generic;

namespace EmployeeApp.API.DTOs
{
    public class EmployeeForDetailedDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Salary { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime? DateOfJoining { get; set; }
        //public Department Department { get; set; }
        public int DepartmentId { get; set; }
        //public Facility Facility { get; set; }
        public int FacilityId { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public ICollection<PhotoForDetailedDTO> Photos { get; set; }
    }

}
