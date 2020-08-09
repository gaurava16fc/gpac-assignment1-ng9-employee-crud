
using AutoMapper;
using EmployeeApp.API.Data;
using EmployeeApp.API.Data.Repository;
using EmployeeApp.API.Data.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EmployeeApp.API.Helper
{
    public static class ServiceExtensions
    {
        public static void ConfigureSQLiteDBContext
            (
                this IServiceCollection services, 
                IConfiguration configuration
            )
        {
            var sqliteConnectionString = configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<RepositoryDBContext>(o => o.UseSqlite(sqliteConnectionString));
        }

        public static void ConfigureRepositoryWrapper
            (
                this IServiceCollection services
            )
        {
            services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();
        }

        public static void ConfigurSeedDataIfNotExists
            (
                this IServiceCollection services
            )
        {
            services.AddTransient<Seed>();
        }

        public static void ConfigureAddOnServices
            (
                this IServiceCollection services,
                IConfiguration configuration
            )
        {
            services.Configure<CloudinarySettings>(configuration.GetSection("CloudinarySettings"));
            services.AddAutoMapper(typeof(EmployeeRepository).Assembly);
        }
    }
}
