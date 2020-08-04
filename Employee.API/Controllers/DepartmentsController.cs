using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using EmployeeApp.API.Data;
using EmployeeApp.API.Data.Repository;
using EmployeeApp.API.DTOs;
using EmployeeApp.API.Helper;
using EmployeeApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace EmployeeApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly DepartmentRepository _repo;
        private readonly IMapper _mapper;
        private readonly ILogger<DepartmentsController> _logger;

        public DepartmentsController(IConfiguration configuration, IMapper mapper, ILogger<DepartmentsController> logger)
        {
            IConfiguration _configuration = configuration;
            DbContextOptionsBuilder<DataContext> _optionsBuilder = new DbContextOptionsBuilder<DataContext>();
            _optionsBuilder.UseSqlite(_configuration.GetConnectionString("DefaultConnection"));
            DataContext _dbContext = new DataContext(_optionsBuilder.Options);


            _repo = new DepartmentRepository(_dbContext);
            this._mapper = mapper;
            this._logger = logger;
        }

        // GET: api/<DepartmentsController>
        [HttpGet]
        public async Task<IActionResult> GetDepartments()
        {
            var _departments = await _repo.Read().ToListAsync();
            var _departmentsListToReturn = _mapper.Map<IEnumerable<DepartmentDTO>>(_departments);
            return Ok(_departmentsListToReturn);
        }

        // GET api/<DepartmentsController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDepartment(int id)
        {
            var _department = await _repo.Read().FirstOrDefaultAsync(e => e.Id == id);
            if (_department == null)
            {
                return NotFound(@"Department with Id = {" + Convert.ToString(id) + "} is not found");
            }
            var _departmentToReturn = _mapper.Map<DepartmentDTO>(_department);
            return Ok(_departmentToReturn);
        }
    }
}
