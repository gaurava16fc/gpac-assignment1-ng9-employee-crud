using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeApp.API.DTOs
{
    public class UserForLoginDTO
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
