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
    public class FacilitiesController : ControllerBase
    {
        private readonly FacilityRepository _repo;
        private readonly IMapper _mapper;
        private readonly ILogger<FacilitiesController> _logger;

        public FacilitiesController(IConfiguration configuration, IMapper mapper, ILogger<FacilitiesController> logger)
        {
            IConfiguration _configuration = configuration;
            DbContextOptionsBuilder<DataContext> _optionsBuilder = new DbContextOptionsBuilder<DataContext>();
            _optionsBuilder.UseSqlite(_configuration.GetConnectionString("DefaultConnection"));
            DataContext _dbContext = new DataContext(_optionsBuilder.Options);


            _repo = new FacilityRepository(_dbContext);
            this._mapper = mapper;
            this._logger = logger;
        }

        // GET: api/<FacilitiesController>
        [HttpGet]
        public async Task<IActionResult> GetFacilities()
        {
            var _facilities = await _repo.Read().ToListAsync();
            var _facilitiesListToReturn = _mapper.Map<IEnumerable<FacilityDTO>>(_facilities);
            return Ok(_facilitiesListToReturn);
        }

        // GET api/<FacilitiesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFacility(int id)
        {
            var _facility = await _repo.Read().FirstOrDefaultAsync(e => e.Id == id);
            if (_facility == null)
            {
                return NotFound(@"Facility with Id = {" + Convert.ToString(id) + "} is not found");
            }
            var _facilityToReturn = _mapper.Map<FacilityDTO>(_facility);
            return Ok(_facilityToReturn);
        }
    }
}
