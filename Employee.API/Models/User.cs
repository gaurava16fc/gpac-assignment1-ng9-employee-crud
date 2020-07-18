using System;
using System.Collections.Generic;

namespace EmployeeApp.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Gender { get; set; }
        public UserRole UserRole { get; set; }
        public int UserRoleId { get; set; }
        public bool IsActive { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
    }
}
