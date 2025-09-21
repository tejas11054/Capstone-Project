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
        private readonly IMapper _mapper;

        public SalaryDisbursementController(ISalaryDisbursementService service,IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        // GET: api/SalaryDisbursement
        [HttpGet]
        [Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> GetAllDisbursements()
        {
            var disbursements = await _service.GetAll();
            if (disbursements.Count() == 0)
                return NotFound("No Salary Disbursements found!");
            return Ok(disbursements);
        }

        // GET: api/SalaryDisbursement/{id}
        [HttpGet("{id}")]
        [Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
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
        [Authorize(Roles = $"{nameof(Role.CLIENT_USER)}")]
        public async Task<IActionResult> CreateDisbursement([FromBody] CreateSalaryDisbursmentDTO disbursementDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            SalaryDisbursement disbursement = _mapper.Map<SalaryDisbursement>(disbursementDto);
            var addedDisbursement = await _service.Add(disbursement);
            if (addedDisbursement == null)
                return BadRequest("Unable to add Salary Disbursement!");

            return Ok(addedDisbursement);
        }

        // PUT: api/SalaryDisbursement/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = $"{nameof(Role.CLIENT_USER)}")]
        public async Task<IActionResult> UpdateDisbursement(int id, [FromBody] SalaryDisbursement disbursement)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != disbursement.SalaryDisbursementId)
                return BadRequest("Disbursement Id does not match!");

            SalaryDisbursement? existing  = await _service.GetById(id);
            existing.ClientId = disbursement.ClientId;
            existing.TotalAmount = disbursement.TotalAmount;

            SalaryDisbursement? updatedDisbursement = await _service.Update(existing);
            if (updatedDisbursement == null)
                return NotFound($"No Salary Disbursement found with id: {id}");

            return Ok(updatedDisbursement);
        }

        // DELETE: api/SalaryDisbursement/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> DeleteDisbursement(int id)
        {
            await _service.DeleteById(id);
            return Ok($"Salary Disbursement with id: {id} deleted successfully.");
        }

        // PUT: api/SalaryDisbursement/approve/{id}
        [HttpPut("approve/{id}")]
        [Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> ApproveSalaryDisbursement(int id)
        {
            SalaryDisbursement approvedDisbursement = await _service.ApproveSalaryDisbursement(id);
            SalaryResponseDTO salaryResponse = _mapper.Map<SalaryResponseDTO>(approvedDisbursement);
            return Ok(salaryResponse);
        }
    }
}
