using System.Collections.Generic;

namespace EmployeeApp.API.Models
{
    public class UserRole
    {
        public int Id { get; set; }
        public string RoleName { get; set; }
        public ICollection<User> MappedUsers { get; set; }
    }
}
