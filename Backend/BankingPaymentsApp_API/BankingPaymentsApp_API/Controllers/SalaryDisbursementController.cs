using AutoMapper;
using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace BankingPaymentsApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaryDisbursementController : ControllerBase
    {
        private readonly ISalaryDisbursementService _service;
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;

        public SalaryDisbursementController(ISalaryDisbursementService service, IMapper mapper, IEmployeeService employeeService)
        {
            _service = service;
            _mapper = mapper;
            _employeeService = employeeService;
        }

        // GET: api/SalaryDisbursement
        [HttpGet]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> GetAllDisbursements(
            [FromQuery] int? clientId,
            [FromQuery] decimal? minAmount,
            [FromQuery] decimal? maxAmount,
            [FromQuery] DateTime? disbursementFrom,
            [FromQuery] DateTime? disbursementTo,
            [FromQuery] int? disbursementStatusId,
            [FromQuery] bool? allEmployees,
            [FromQuery] int? pageNumber,
            [FromQuery] int? pageSize)
        {
            var response = await _service.GetAll(clientId, minAmount, maxAmount, disbursementFrom, disbursementTo, disbursementStatusId, allEmployees, pageNumber, pageSize);

            if (!response.Any())
                return Ok(response);

            return Ok(response);
        }


        // GET: api/SalaryDisbursement/{id}
        [HttpGet("{id}")]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> GetDisbursementById(int id)
        {
            var disbursement = await _service.GetById(id);
            SalaryResponseDTO salaryResponse = _mapper.Map<SalaryResponseDTO>(disbursement);
            if (disbursement == null)
                return NotFound($"No Salary Disbursement found with id: {id}");
            return Ok(salaryResponse);
        }

        // POST: api/SalaryDisbursement
        [HttpPost]
        //[Authorize(Roles = $"{nameof(Role.CLIENT_USER)}")]
        public async Task<IActionResult> CreateDisbursement([FromBody] CreateSalaryDisbursmentDTO disbursementDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            SalaryDisbursement disbursement = _mapper.Map<SalaryDisbursement>(disbursementDto);

            if (!disbursementDto.AllEmployees && disbursementDto.EmployeeIds?.Count > 0)
            {
                var employees = await _employeeService.GetEmployeesByIDs(disbursementDto.EmployeeIds);

                disbursement.Employees.Clear();
                foreach (var emp in employees)
                {
                    disbursement.Employees.Add(emp); 
                }
            }

            var addedDisbursement = await _service.Add(disbursement,disbursementDto.EmployeeIds);

            if (addedDisbursement == null)
                return BadRequest("Unable to add Salary Disbursement!");

            return Ok(addedDisbursement);
        }


        // PUT: api/SalaryDisbursement/{id}
        [HttpPut("{id}")]
        //[Authorize(Roles = $"{nameof(Role.CLIENT_USER)}")]
        public async Task<IActionResult> UpdateDisbursement(int id, [FromBody] SalaryDisbursement disbursement)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != disbursement.SalaryDisbursementId)
                return BadRequest("Disbursement Id does not match!");

            SalaryDisbursement? existing = await _service.GetById(id);
            existing.ClientId = disbursement.ClientId;
            existing.TotalAmount = disbursement.TotalAmount;

            SalaryDisbursement? updatedDisbursement = await _service.Update(existing);
            if (updatedDisbursement == null)
                return NotFound($"No Salary Disbursement found with id: {id}");

            return Ok(updatedDisbursement);
        }

        // DELETE: api/SalaryDisbursement/{id}
        [HttpDelete("{id}")]
        //[Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> DeleteDisbursement(int id)
        {
            await _service.DeleteById(id);
            return Ok($"Salary Disbursement with id: {id} deleted successfully.");
        }

        // PUT: api/SalaryDisbursement/approve/{id}
        [HttpPut("approve/{id}")]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> ApproveSalaryDisbursement(int id)
        {
            SalaryDisbursement approvedDisbursement = await _service.ApproveSalaryDisbursement(id);
            SalaryResponseDTO salaryResponse = _mapper.Map<SalaryResponseDTO>(approvedDisbursement);
            return Ok(salaryResponse);
        }
        [HttpPut("reject/{id}")]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> RejectSalaryDisbursement(int id, [FromBody] RejectDTO reject)
        {
            SalaryDisbursement approvedDisbursement = await _service.RejectSalaryDisbursement(id, reject.reason);
            SalaryResponseDTO salaryResponse = _mapper.Map<SalaryResponseDTO>(approvedDisbursement);
            return Ok(salaryResponse);
        }
    }
}
