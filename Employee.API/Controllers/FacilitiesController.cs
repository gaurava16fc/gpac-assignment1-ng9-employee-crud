using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using EmployeeApp.API.Data;
using EmployeeApp.API.Data.Repository;
using EmployeeApp.API.Data.Repository.Interfaces;
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
        private readonly IFacilityRepository _repo;
        private readonly IMapper _mapper;
        private readonly ILogger<FacilitiesController> _logger;

        public FacilitiesController
            (
                IRepositoryWrapper repositoryWrapper, 
                IMapper mapper, 
                ILogger<FacilitiesController> logger
            )
        {
            //IConfiguration _configuration = configuration;
            //DbContextOptionsBuilder<RepositoryDBContext> _optionsBuilder = new DbContextOptionsBuilder<RepositoryDBContext>();
            //_optionsBuilder.UseSqlite(_configuration.GetConnectionString("DefaultConnection"));
            //RepositoryDBContext _dbContext = new RepositoryDBContext(_optionsBuilder.Options);
            //_repo = new FacilityRepository(_dbContext);
            this._repo = repositoryWrapper.FacilityRepository;
            this._mapper = mapper;
            this._logger = logger;
        }

        // GET: api/<FacilitiesController>
        [HttpGet]
        public async Task<IActionResult> GetFacilities()
        {
            var _facilities = await _repo.FindAll().ToListAsync();
            var _facilitiesListToReturn = _mapper.Map<IEnumerable<FacilityDTO>>(_facilities);
            return Ok(_facilitiesListToReturn);
        }

        // GET api/<FacilitiesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFacility(int id)
        {
            var _facility = await _repo.FindByCondition(e => e.Id == id).FirstOrDefaultAsync();
            if (_facility == null)
            {
                return NotFound(@"Facility with Id = {" + Convert.ToString(id) + "} is not found");
            }
            var _facilityToReturn = _mapper.Map<FacilityDTO>(_facility);
            return Ok(_facilityToReturn);
        }
    }
}
