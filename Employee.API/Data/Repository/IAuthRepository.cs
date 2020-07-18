using EmployeeApp.API.Models;
using System.Threading.Tasks;

namespace EmployeeApp.API.Data.Repository
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string username, string password);
        Task<bool> UserExists(string username);
    }
}
