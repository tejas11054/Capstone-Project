using AutoMapper;
using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Services;
using CsvHelper;
using CsvHelper.Configuration;
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
        private readonly IMapper _mapper;
        public EmployeeController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _employeeService.GetAll();
            if (employees.Count() == 0)
                return NotFound("No Employee to display");
            return Ok(employees);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployee(EmployeeDTO employee)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Employee newEmployee = _mapper.Map<Employee>(employee);
            Employee addedEmployee = await _employeeService.Add(newEmployee);
            return CreatedAtAction("CreateEmployee", addedEmployee);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            Employee? existingEmployee = await _employeeService.GetById(id);
            if (existingEmployee == null)
                return NotFound($"No Employee of id: {id}");
            return Ok(existingEmployee);
        }

        [HttpPut]
        [Route("{id}")]
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

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            Employee? existingEmployee = await _employeeService.GetById(id);
            if (existingEmployee == null)
                return NotFound($"No Employee of id: {id}");

            await _employeeService.DeleteById(id);
            return Ok("Employee has been deleted Sucessfully!");
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadEmployees(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded!");

            var employeeDtos = new List<EmployeeDTO>();

            using (var stream = new StreamReader(file.OpenReadStream()))
            using (var csv = new CsvReader(stream, new CsvHelper.Configuration.CsvConfiguration(System.Globalization.CultureInfo.InvariantCulture)
            {
                HasHeaderRecord = true,
                HeaderValidated = null,
                MissingFieldFound = null
            }))
            {
                try
                {
                    employeeDtos = csv.GetRecords<EmployeeDTO>().ToList();
                }
                catch (Exception ex)
                {
                    return BadRequest($"Error parsing CSV: {ex.Message}");
                }
            }

            // Validate DTOs
            foreach (var dto in employeeDtos)
            {
                var context = new ValidationContext(dto, null, null);
                var results = new List<ValidationResult>();
                if (!Validator.TryValidateObject(dto, context, results, true))
                {
                    return BadRequest($"Validation failed for Employee: {dto.EmployeeName}, Errors: {string.Join(", ", results.Select(r => r.ErrorMessage))}");
                }
            }

            // Map DTO -> Employee
            var employeeEntities = _mapper.Map<List<Employee>>(employeeDtos);

            // Bulk insert with FK exception handling
            try
            {
                await _employeeService.BulkInsert(employeeEntities);
            }
            catch (DbUpdateException ex) when (ex.InnerException is SqlException sqlEx && sqlEx.Number == 547)
            {
                return BadRequest("CSV contains invalid ClientIds that do not exist in Users table.");
            }

            return Ok($"{employeeEntities.Count} employees inserted successfully.");
        }

    }
}
