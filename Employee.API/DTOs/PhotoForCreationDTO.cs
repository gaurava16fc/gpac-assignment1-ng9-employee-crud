using EmployeeApp.API.Models;
using Microsoft.AspNetCore.Http;
using System;

namespace EmployeeApp.API.DTOs
{
    public class PhotoForCreationDTO
    {
        public string Url { get; set; }
        public IFormFile File { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public string PublicId { get; set; }

        public PhotoForCreationDTO()
        {
            DateAdded = new DateTime();
        }
    }
}
