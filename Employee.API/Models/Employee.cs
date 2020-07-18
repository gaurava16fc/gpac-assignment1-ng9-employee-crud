using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EmployeeApp.API.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Required (ErrorMessage = "Name is a required field")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Salary is a required field")]
        public double Salary { get; set; }

        [Required]
        [Range(18, 58, ErrorMessage = "Age can be between 18 and 58 only")]
        public int Age { get; set; }

        [Required(ErrorMessage = "Gender is a required field")]
        public string Gender { get; set; }

        [Required(ErrorMessage = "Email is a required field")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Phone Number is a required field")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Date Of Birth is a required field")]
        public DateTime DateOfBirth { get; set; }

        public DateTime? DateOfJoining { get; set; }

        public Department Department { get; set; }

        public int DepartmentId { get; set; }

        public Facility Facility { get; set; }

        public int FacilityId { get; set; }

        public string City { get; set; }
        
        public string Country { get; set; }

        public ICollection<Photo> Photos { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }
    }
}