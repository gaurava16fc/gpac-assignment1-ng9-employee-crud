using Microsoft.EntityFrameworkCore;
using EmployeeApp.API.Models;

namespace EmployeeApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employee { get; set; }
    }
}