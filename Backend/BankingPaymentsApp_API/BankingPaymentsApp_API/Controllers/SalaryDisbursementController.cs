using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BankingPaymentsApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaryDisbursementController : ControllerBase
    {
        private readonly ISalaryDisbursementService _service;

        public SalaryDisbursementController(ISalaryDisbursementService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDisbursements()
        {
            var disbursements = await _service.GetAll();
            if (disbursements.Count() == 0)
                return NotFound("No Salary Disbursements found!");
            return Ok(disbursements);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDisbursementById(int id)
        {
            var disbursement = await _service.GetById(id);
            if (disbursement == null)
                return NotFound($"No Salary Disbursement found with id: {id}");
            return Ok(disbursement);
        }

        [HttpPost]
        public async Task<IActionResult> CreateDisbursement([FromBody] SalaryDisbursement disbursement)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var addedDisbursement = await _service.Add(disbursement);
            if (addedDisbursement == null)
                return BadRequest("Unable to add Salary Disbursement!");

            return Ok(addedDisbursement);
        }

        [HttpPut("{id}")]
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDisbursement(int id)
        {
            await _service.DeleteById(id);
            return Ok($"Salary Disbursement with id: {id} deleted successfully.");
        }
    }
}
