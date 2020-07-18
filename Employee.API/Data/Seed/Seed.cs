using EmployeeApp.API.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using EmployeeApp.API.Helper;

namespace EmployeeApp.API.Data
{
    public class Seed
    {
        public static void DumpSeedData(DataContext context)
        {
            // User Roles Data...
            if (!context.UserRoles.Any())
            {
                var userRolesData = System.IO.File.ReadAllText(@"Data/Seed/JsonData/UserRoles.json");
                var userRoles = JsonConvert.DeserializeObject<List<UserRole>>(userRolesData);
                foreach (var roles in userRoles)
                {
                    context.UserRoles.Add(roles);
                }
                context.SaveChanges();
            }


            // User Data...
            if (!context.Users.Any())
            {
                var usersData = System.IO.File.ReadAllText(@"Data/Seed/JsonData/Users.json");
                var users = JsonConvert.DeserializeObject<List<User>>(usersData);
                foreach (var usr in users)
                {
                    byte[] passwordHash, passwordSalt;
                    CreatePasswordHash("password", out passwordHash, out passwordSalt);
                    usr.PasswordHash = passwordHash;
                    usr.PasswordSalt = passwordSalt;
                    usr.UserName = usr.UserName.ToLower().Trim();
                    context.Users.Add(usr);
                }
                context.SaveChanges();
            }


            // Facility Data...
            if (!context.Facilities.Any())
            {
                var facilitiesData = System.IO.File.ReadAllText(@"Data/Seed/JsonData/Facilities.json");
                var facilities = JsonConvert.DeserializeObject<List<Facility>>(facilitiesData);
                foreach (var _facility in facilities)
                {
                    context.Facilities.Add(_facility);
                }
                context.SaveChanges();
            }

            // Department Data...
            if (!context.Departments.Any())
            {
                var depttData = System.IO.File.ReadAllText(@"Data/Seed/JsonData/Departments.json");
                var departments = JsonConvert.DeserializeObject<List<Department>>(depttData);
                foreach (var deptt in departments)
                {
                    context.Departments.Add(deptt);
                }
                context.SaveChanges();
            }

            // Employees Data...
            if (!context.Employees.Any())
            {
                var empData = System.IO.File.ReadAllText(@"Data/Seed/JsonData/Employees.json");
                var employees = JsonConvert.DeserializeObject<List<Employee>>(empData);
                foreach (var emp in employees)
                {
                    emp.Age = emp.DateOfBirth.CalculateAge();
                    context.Employees.Add(emp);
                }
                context.SaveChanges();
            }

        }


        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
