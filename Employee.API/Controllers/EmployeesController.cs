using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using EmployeeApp.API.Data;
using EmployeeApp.API.Data.Repository;
using EmployeeApp.API.DTOs;
using EmployeeApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace EmployeeApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeRepository _repo;
        private readonly IMapper _mapper;
        private readonly ILogger<EmployeesController> _logger;

        public EmployeesController(IConfiguration configuration, IMapper mapper, ILogger<EmployeesController> logger)
        {
            IConfiguration _configuration = configuration;
            DbContextOptionsBuilder<DataContext> _optionsBuilder = new DbContextOptionsBuilder<DataContext>();
            _optionsBuilder.UseSqlite(_configuration.GetConnectionString("DefaultConnection"));
            DataContext _dbContext = new DataContext(_optionsBuilder.Options);
            _repo = new EmployeeRepository(_dbContext);
            this._mapper = mapper;
            this._logger = logger;
        }

        // GET: api/<EmployeesController>
        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            var _employees = await _repo.Read().Include(p => p.Photos).ToListAsync();
            var _employeesListToReturn = _mapper.Map<IEnumerable<EmployeeDTO>>(_employees);
            return Ok(_employeesListToReturn);
        }

        // GET api/<EmployeesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            var _employee = await _repo.Read().Include(p => p.Photos).FirstOrDefaultAsync(e => e.Id == id);
            if (_employee == null)
            {
                return NotFound(@"Employee with Id = {" + Convert.ToString(id) + "} is not found");
            }
            var _employeeToReturn = _mapper.Map<EmployeeDTO>(_employee);
            return Ok(_employeeToReturn);
        }

        // POST api/<EmployeesController>
        [HttpPost]
        public async Task<IActionResult> Post(EmployeeForAddDTO employeeForAddDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }
                var _employeeNew = _mapper.Map<Employee>(employeeForAddDTO);
                await _repo.Create(_employeeNew);
                var _employeeToReturn = _mapper.Map<EmployeeDTO>(_employeeNew);
                return CreatedAtAction("GetEmployee", new { id = _employeeNew.Id }, _employeeToReturn);
            }
            catch (Exception ex)
            {
                string _errorMessage = $"Could not add new employee. Please try again or consult administrator!";
                _logger.LogError(_errorMessage);
                return BadRequest(_errorMessage);
            }
        }

        // PUT api/<EmployeesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, EmployeeForUpdateDTO employeeForUpdateDTO)
        {
            try
            {
                var _employeeFromRepo = await _repo.Read().FirstOrDefaultAsync(e => e.Id == id);
                if (_employeeFromRepo == null)
                {
                    return NotFound(@"Employee with Id = {" + Convert.ToString(id) + "} is not found");
                }
                _mapper.Map(employeeForUpdateDTO, _employeeFromRepo);
                await _repo.Update(_employeeFromRepo);
                return NoContent();
            }
            catch (Exception ex)
            {
                string _errorMessage = $"Updating employee# {id} failed on save!";
                _logger.LogError(_errorMessage);
                return BadRequest(_errorMessage);
            }
        }

        // DELETE api/<EmployeesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            try
            {
                var _employee = await _repo.Read().FirstOrDefaultAsync(e => e.Id == id);
                if (_employee == null)
                {
                    return NotFound(@"Employee with Id = {" + Convert.ToString(id) + "} is not found");
                }
                await _repo.Delete(_employee);
                return Ok();
            }
            catch (Exception ex)
            {
                string _errorMessage = $"Deleting employee# {id} failed on server!";
                _logger.LogError(_errorMessage);
                return BadRequest(_errorMessage);
            }
        }
    }
}
