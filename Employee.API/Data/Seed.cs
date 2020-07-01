using EmployeeApp.API.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeApp.API.Data
{
    public class Seed
    {
        public static void SeedEmployee(DataContext context)
        {
            if (!context.Employee.Any())
            {
                var empData = System.IO.File.ReadAllText(@"Data/EmployeeSeedData.json");
                var employees = JsonConvert.DeserializeObject<List<Employee>>(empData);
                foreach (var emp in employees)
                {
                    context.Employee.Add(emp);
                }
                context.SaveChanges();
            }
        }
    }
}
