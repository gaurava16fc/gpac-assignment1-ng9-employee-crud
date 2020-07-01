using Microsoft.Extensions.Configuration;
using System;
using System.ComponentModel.DataAnnotations;

namespace EmployeeApp.API.DTOs
{
    public class EmployeeForUpdateDTO
    {
        private readonly IConfiguration _config;

        public EmployeeForUpdateDTO(IConfiguration configuration)
        {
            this._config = configuration;
        }

        [Required(ErrorMessage = "Name is a required field")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Salary is a required field")]
        public double Salary { get; set; }

        [Required]
        [Range(18, 58, ErrorMessage = "Age can be between 18 and 58 only")]
        public int Age { get; set; }

    }


}
