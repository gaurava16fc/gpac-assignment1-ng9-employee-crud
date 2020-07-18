using Microsoft.EntityFrameworkCore;
using EmployeeApp.API.Models;

namespace EmployeeApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Facility> Facilities { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> EmployeePhotos { get; set; }

    }
}