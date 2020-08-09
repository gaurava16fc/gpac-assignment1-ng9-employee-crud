using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using EmployeeApp.API.Data.Repository.Interfaces;
using EmployeeApp.API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace EmployeeApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly IDepartmentRepository _repo;
        private readonly IMapper _mapper;
        private readonly ILogger<DepartmentsController> _logger;

        public DepartmentsController
            (
                IRepositoryWrapper repositoryWrapper, 
                IMapper mapper, 
                ILogger<DepartmentsController> logger
            )
        {
            //IConfiguration _configuration = configuration;
            //DbContextOptionsBuilder<RepositoryDBContext> _optionsBuilder = new DbContextOptionsBuilder<RepositoryDBContext>();
            //_optionsBuilder.UseSqlite(_configuration.GetConnectionString("DefaultConnection"));
            //RepositoryDBContext _dbContext = new RepositoryDBContext(_optionsBuilder.Options);
            //_repo = new DepartmentRepository(_dbContext);
            this._repo = repositoryWrapper.DepartmentRepository;
            this._mapper = mapper;
            this._logger = logger;
        }

        // GET: api/<DepartmentsController>
        [HttpGet]
        public async Task<IActionResult> GetDepartments()
        {
            var _departments = await _repo.FindAll().ToListAsync();
            var _departmentsListToReturn = _mapper.Map<IEnumerable<DepartmentDTO>>(_departments);
            return Ok(_departmentsListToReturn);
        }

        // GET api/<DepartmentsController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDepartment(int id)
        {
            var _department = await _repo.FindByCondition(e => e.Id == id).FirstOrDefaultAsync();
            if (_department == null)
            {
                return NotFound(@"Department with Id = {" + Convert.ToString(id) + "} is not found");
            }
            var _departmentToReturn = _mapper.Map<DepartmentDTO>(_department);
            return Ok(_departmentToReturn);
        }
    }
}
