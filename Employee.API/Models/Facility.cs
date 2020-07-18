﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EmployeeApp.API.Models
{
    public class Facility
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is a required field")]
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public ICollection<Employee> Employees { get; set; }
    }
}