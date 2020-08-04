using EmployeeApp.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeApp.API.DTOs
{
    public class DepartmentDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        //public ICollection<Employee> Employees { get; set; }
    }
}
