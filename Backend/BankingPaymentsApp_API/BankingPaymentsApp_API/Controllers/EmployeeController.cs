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
        private readonly ILogger<EmployeeController> _logger;
        private readonly IMapper _mapper;
        public EmployeeController(IEmployeeService employeeService, IMapper mapper, IClientUserService clientUserService, ILogger<EmployeeController> logger)
        {
            _employeeService = employeeService;
            _mapper = mapper;
            _clientUserService = clientUserService;
            _logger = logger;
        }

        [HttpGet]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> GetAllEmployees(
            [FromQuery] int? clientId,
            [FromQuery] string? employeeName,
            [FromQuery] string? accountNumber,
            [FromQuery] string? bankName,
            [FromQuery] string? ifsc,
            [FromQuery] bool? isActive,
            [FromQuery] int? minSalary,
            [FromQuery] int? maxSalary,
            [FromQuery] int? pageNumber,
            [FromQuery] int? pageSize)
        {
            var response = await _employeeService.GetAll(clientId, employeeName, accountNumber, bankName, ifsc, isActive, minSalary, maxSalary, pageNumber, pageSize);

            if (!response.Any())
                return NotFound("No employees to display");

            return Ok(response);
        }



        // POST: api/Employee
        [HttpPost]
        // [Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]


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
        //[Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
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
        //[Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
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
        //[Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            Employee? existingEmployee = await _employeeService.GetById(id);
            if (existingEmployee == null)
                return NotFound($"No Employee of id: {id}");

            await _employeeService.DeleteById(id);
            return Ok("Employee has been deleted Sucessfully!");
        }

        //// POST: api/Employee/upload/
        //[HttpPost("upload")]
        ////[Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        //public async Task<IActionResult> UploadEmployees(IFormFile file)
        //{
        //    _logger.LogInformation("UploadEmployees started!");

        //    //if (file == null || file.Length == 0)
        //    //    return BadRequest("No file uploaded!");

        //    //var employeeDtos = new List<EmployeeDTO>();

        //    //using (var stream = new StreamReader(file.OpenReadStream()))
        //    //using (var csv = new CsvReader(stream, new CsvHelper.Configuration.CsvConfiguration(System.Globalization.CultureInfo.InvariantCulture)
        //    //{
        //    //    HasHeaderRecord = true,
        //    //    HeaderValidated = null,
        //    //    MissingFieldFound = null
        //    //}))
        //    //{
        //    //    try
        //    //    {
        //    //        employeeDtos = csv.GetRecords<EmployeeDTO>().ToList();
        //    //    }
        //    //    catch (Exception ex)
        //    //    {
        //    //        return BadRequest($"Error parsing CSV: {ex.Message}");
        //    //    }
        //    //}

        //    //// Validate DTOs
        //    //foreach (var dto in employeeDtos)
        //    //{
        //    //    var context = new ValidationContext(dto, null, null);
        //    //    var results = new List<ValidationResult>();
        //    //    if (!Validator.TryValidateObject(dto, context, results, true))
        //    //    {
        //    //        return BadRequest($"Validation failed for Employee: {dto.EmployeeName}, Errors: {string.Join(", ", results.Select(r => r.ErrorMessage))}");
        //    //    }
        //    //}
        //    var employeeDtos = new List<EmployeeDTO>();
        //    employeeDtos.AddRange(await _employeeService.UploadEmployees(file));
        //    if (employeeDtos == null || employeeDtos.Count() == 0)
        //        return BadRequest("No employees to add");

        //    // Map DTO -> Employee
        //    var employeeEntities = _mapper.Map<List<Employee>>(employeeDtos);

        //    // Bulk insert with FK exception handling
        //    try
        //    {
        //        var employees = await _employeeService.BulkInsert(employeeEntities);
        //        ClientUser? client = await _clientUserService.GetById(employeeDtos[1].ClientId);
        //        client.Employees.AddRange(employees);

        //    }
        //    catch (DbUpdateException ex) when (ex.InnerException is SqlException sqlEx && sqlEx.Number == 547)
        //    {
        //        return BadRequest("CSV contains invalid ClientIds that do not exist in Users table.");
        //    }
        //    _logger.LogInformation($"{employeeEntities.Count} employees inserted successfully.");

        //    return Ok($"{employeeEntities.Count} employees inserted successfully.");
        //}


        [HttpPost("upload")]
        public async Task<IActionResult> UploadEmployees(IFormFile file)
        {
            _logger.LogInformation("UploadEmployees started!");

            var employeeDtos = new List<EmployeeDTO>();
            employeeDtos.AddRange(await _employeeService.UploadEmployees(file));
            if (employeeDtos == null || !employeeDtos.Any())
                return BadRequest("No employees to add");

            var employeeEntities = _mapper.Map<List<Employee>>(employeeDtos);

            try
            {
                var (inserted, skipped) = await _employeeService.BulkInsert(employeeEntities);

                var response = new
                {
                    InsertedCount = inserted.Count(),
                    SkippedCount = skipped.Count(),
                    SkippedDetails = skipped
                };

                _logger.LogInformation($"{inserted.Count()} employees inserted, {skipped.Count()} skipped.");

                return Ok(response);
            }
            catch (DbUpdateException ex) when (ex.InnerException is SqlException sqlEx && sqlEx.Number == 547)
            {
                return BadRequest("CSV contains invalid ClientIds that do not exist in Users table.");
            }
        }



        // POST: api/Employee/update-employee/{clientId}
        [HttpPost("update-employee/{clientId}")]
        public async Task<IActionResult> UploadUpdateEmployeesByClient(int clientId, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded!");

            var employeeDtos = await _employeeService.UploadEmployees(file);

            if (employeeDtos == null || employeeDtos.Count() == 0)
                return BadRequest("No employees found in CSV.");

            // Get existing employees of the client
            var existingEmployees = (await _employeeService.GetEmployeesByClientId(clientId)).ToList();

            var updatedCount = 0;

            foreach (var dto in employeeDtos)
            {
                // Match by account number or employee name (or another unique field)
                var emp = existingEmployees.FirstOrDefault(e => e.AccountNumber == dto.AccountNumber);
                if (emp != null)
                {
                    emp.EmployeeName = dto.EmployeeName;
                    emp.IFSC = dto.IFSC;
                    emp.BankName = dto.BankName;

                    await _employeeService.Update(emp);
                    updatedCount++;
                }
            }

            return Ok($"{updatedCount} employees updated successfully for client {clientId}.");
        }



    }


}
