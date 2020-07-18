

using System.ComponentModel.DataAnnotations;

namespace EmployeeApp.API.DTOs
{
    public class UserForRegisterDTO
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Password length should be between 4 to 8 characters")]
        public string Password { get; set; }
    }
}
