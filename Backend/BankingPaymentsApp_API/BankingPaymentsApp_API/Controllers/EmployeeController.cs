using AutoMapper;
using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Services;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Formats.Asn1;
using System.Globalization;

namespace BankingPaymentsApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IClientUserService _clientUserService;
        private readonly IMapper _mapper;
        public EmployeeController(IEmployeeService employeeService, IMapper mapper, IClientUserService clientUserService)
        {
            _employeeService = employeeService;
            _mapper = mapper;
            _clientUserService = clientUserService;
        }

        // GET: api/Employee
        [HttpGet]
        [Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _employeeService.GetAll();
            if (employees.Count() == 0)
                return NotFound("No Employee to display");
            return Ok(employees);
        }

        // POST: api/Employee
        [HttpPost]
        [Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> CreateEmployee(EmployeeDTO employee)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Employee newEmployee = _mapper.Map<Employee>(employee);
            Employee addedEmployee = await _employeeService.Add(newEmployee);
            return CreatedAtAction("CreateEmployee", addedEmployee);
        }

        // GET: api/Employee/{id}
        [HttpGet]
        [Route("{id}")]
        [Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            Employee? existingEmployee = await _employeeService.GetById(id);
            if (existingEmployee == null)
                return NotFound($"No Employee of id: {id}");
            return Ok(existingEmployee);
        }

        // PUT: api/Employee/{id}
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> UpdateEmployee(int id, EmployeeDTO employee)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Employee? existingEmployee = await _employeeService.GetById(id);
            if (existingEmployee == null)
                return NotFound($"No Employee of id: {id}");

            _mapper.Map(employee, existingEmployee);

            Employee? updatedEmployee = await _employeeService.Update(existingEmployee);
            return Ok(updatedEmployee);
        }

        // DELETE: api/Employee/{id}
        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            Employee? existingEmployee = await _employeeService.GetById(id);
            if (existingEmployee == null)
                return NotFound($"No Employee of id: {id}");

            await _employeeService.DeleteById(id);
            return Ok("Employee has been deleted Sucessfully!");
        }

        // POST: api/Employee/upload/
        [HttpPost("upload")]
        //[Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> UploadEmployees(IFormFile file)
        {
            //if (file == null || file.Length == 0)
            //    return BadRequest("No file uploaded!");

            //var employeeDtos = new List<EmployeeDTO>();

            //using (var stream = new StreamReader(file.OpenReadStream()))
            //using (var csv = new CsvReader(stream, new CsvHelper.Configuration.CsvConfiguration(System.Globalization.CultureInfo.InvariantCulture)
            //{
            //    HasHeaderRecord = true,
            //    HeaderValidated = null,
            //    MissingFieldFound = null
            //}))
            //{
            //    try
            //    {
            //        employeeDtos = csv.GetRecords<EmployeeDTO>().ToList();
            //    }
            //    catch (Exception ex)
            //    {
            //        return BadRequest($"Error parsing CSV: {ex.Message}");
            //    }
            //}

            //// Validate DTOs
            //foreach (var dto in employeeDtos)
            //{
            //    var context = new ValidationContext(dto, null, null);
            //    var results = new List<ValidationResult>();
            //    if (!Validator.TryValidateObject(dto, context, results, true))
            //    {
            //        return BadRequest($"Validation failed for Employee: {dto.EmployeeName}, Errors: {string.Join(", ", results.Select(r => r.ErrorMessage))}");
            //    }
            //}
            var employeeDtos = new List<EmployeeDTO>();
            employeeDtos.AddRange(await _employeeService.UploadEmployees(file));
            if (employeeDtos == null || employeeDtos.Count() == 0)
                return BadRequest("No employees to add");

            // Map DTO -> Employee
            var employeeEntities = _mapper.Map<List<Employee>>(employeeDtos);

            // Bulk insert with FK exception handling
            try
            {
                var employees = await _employeeService.BulkInsert(employeeEntities);
                ClientUser? client = await _clientUserService.GetById(employeeDtos[1].ClientId);
                client.Employees.AddRange(employees);

            }
            catch (DbUpdateException ex) when (ex.InnerException is SqlException sqlEx && sqlEx.Number == 547)
            {
                return BadRequest("CSV contains invalid ClientIds that do not exist in Users table.");
            }

            return Ok($"{employeeEntities.Count} employees inserted successfully.");
        }

    }
}
