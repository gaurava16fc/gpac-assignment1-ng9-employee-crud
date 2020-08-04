using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using EmployeeApp.API.Data.Repository;
using EmployeeApp.API.DTOs;
using EmployeeApp.API.Helper;
using EmployeeApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeApp.API.Controllers
{
    //[Route("api/[controller]")]
    //[Authorize]
    [Route("api/employees/{employeeId}/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IEmployeeRepository _repoEmployee;
        private readonly IEmployeePhotoRepository _repository;
        private readonly IMapper _mapper;
        private readonly ILogger<PhotosController> _logger;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public PhotosController
            (
                IEmployeePhotoRepository repository, 
                IMapper mapper, ILogger<PhotosController> logger,
                IEmployeeRepository repositoryEmployee,
                IOptions<CloudinarySettings> cloudinaryConfig
            )
        {
            this._repository = repository;
            this._repoEmployee = repositoryEmployee;
            this._mapper = mapper;
            this._logger = logger;
            this._cloudinaryConfig = cloudinaryConfig;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        //[HttpGet]
        //public async Task<ActionResult> GetPhotos(int employeeId)
        //{
        //    var photoListFromRepo = await _repository.GetAllPhotos(employeeId).ToListAsync();
        //    var photos = _mapper.Map<System.Collections.Generic.List<PhotoForReturnDTO>>(photoListFromRepo);
        //    return Ok(photos);
        //}


        [HttpGet("{photoId}", Name = "GetPhoto")]
        public async Task<ActionResult> GetPhoto(int photoId)
        {
            var photoFromRepo = await _repository.Read().FirstOrDefaultAsync(p => p.Id == photoId);
            var photo = _mapper.Map<PhotoForReturnDTO>(photoFromRepo);
            return Ok(photo);
        }



        //[HttpGet]
        //public async Task<ActionResult> GetMainPhotoForEmployee(int employeeId)
        //{
        //    var photoListFromRepo = await _repository.GetMainPhotoForEmployeeAsync(employeeId);
        //    var photos = _mapper.Map<System.Collections.Generic.List<PhotoForReturnDTO>>(photoListFromRepo);
        //    return Ok(photos);
        //}



        [HttpPost]
        public async Task<ActionResult> AddPhotoForUser(int employeeId, [FromForm]PhotoForCreationDTO photoForCreationDTO)
        {
            try
            {
                var employeesFromRepo = await _repoEmployee.ReadEmployeesWithPhotos().FirstOrDefaultAsync(e => e.Id == employeeId);
                var file = photoForCreationDTO.File;
                var uploadResult = new ImageUploadResult();
                if (file !=null && file.Length > 0)
                {
                    using (var stream = file.OpenReadStream())
                    {
                        var uploadParams = new ImageUploadParams()
                        {
                            File = new FileDescription(file.Name, stream),
                            Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                        };
                        uploadResult = _cloudinary.Upload(uploadParams);
                    }
                }
                if (uploadResult != null)
                {
                    photoForCreationDTO.Url = uploadResult.Url.AbsoluteUri.ToString();
                    photoForCreationDTO.PublicId = uploadResult.PublicId;
                }
                var photo = _mapper.Map<Photo>(photoForCreationDTO);
                if (!employeesFromRepo.Photos.Any(u => u.IsMain))
                    photo.IsMain = true;

                photo.DateAdded = DateTime.Now;
                employeesFromRepo.Photos.Add(photo);
                try
                {
                    await _repoEmployee.Update(employeesFromRepo);
                    var photoToReturn = _mapper.Map<PhotoForReturnDTO>(photo);
                    return CreatedAtRoute("GetPhoto", new { employeeId = employeesFromRepo.Id, photoId = photo.Id }, photoToReturn);
                }
                catch
                {
                    //throw;
                    return BadRequest("Could not add the photo. Please try again or consult administrator!");
                }
            }
            catch (Exception ex)
            {
                string _errorMessage = $"Could not add new employee. Please try again or consult administrator!";
                _logger.LogError(_errorMessage);
                return BadRequest(_errorMessage);
            }
        }

        [HttpPost("{photoId}/setMain")]
        public async Task<ActionResult> SetMainPhoto(int employeeId, int photoId)
        {
            try
            {
                var employeesFromRepo = await _repoEmployee.ReadEmployeesWithPhotos().FirstOrDefaultAsync(e => e.Id == employeeId);

                if (employeesFromRepo == null)
                    return NotFound($"Employee with Id# {employeeId} is not valid.");

                if (!employeesFromRepo.Photos.Any(p => p.Id == photoId))
                    return Unauthorized($"Photo with Id# {photoId} is not valid.");

                var photoFromRepo = await _repository.Read().FirstOrDefaultAsync(p => p.Id == photoId);
                if (photoFromRepo == null)
                    return NotFound($"Photo# {photoId}, is not available!");

                if (photoFromRepo.IsMain)
                    return BadRequest($"Photo# {photoId}, is already the main photo.");

                var currentMainPhoto = await _repository.GetMainPhotoForEmployeeAsync(employeeId);
                currentMainPhoto.IsMain = false;
                photoFromRepo.IsMain = true;

                if (await _repository.SaveAll())
                    return NoContent();

                return BadRequest("Could not set the main photo.");
            }
            catch (Exception ex)
            {
                string _errorMessage = $"Problem during setting up the main photo...!";
                _logger.LogError(_errorMessage);
                return BadRequest(_errorMessage);
            }
        }


    }
}
