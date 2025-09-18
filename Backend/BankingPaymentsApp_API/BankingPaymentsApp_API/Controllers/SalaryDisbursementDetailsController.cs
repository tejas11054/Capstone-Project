using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BankingPaymentsApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaryDisbursementDetailsController : ControllerBase
    {
        private readonly ISalaryDisbursementDetailsService _service;

        public SalaryDisbursementDetailsController(ISalaryDisbursementDetailsService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDetails()
        {
            var details = await _service.GetAll();
            if (!details.Any())
                return NotFound("No Salary Disbursement Details found!");
            return Ok(details);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetailById(int id)
        {
            SalaryDisbursementDetails? detail = await _service.GetById(id);
            if (detail == null)
                return NotFound($"No Salary Disbursement Detail found with id: {id}");
            return Ok(detail);
        }

        [HttpPost]
        public async Task<IActionResult> CreateDetail([FromBody] SalaryDisbursementDetails detail)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var addedDetail = await _service.Add(detail);
            if (addedDetail == null)
                return BadRequest("Unable to add Salary Disbursement Detail!");

            return Ok(addedDetail);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDetail(int id, [FromBody] SalaryDisbursementDetails detail)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != detail.DetailId)
                return BadRequest("Detail Id does not match!");

            SalaryDisbursementDetails? existing = await _service.GetById(id);
            existing.SalaryDisbursementId = detail.DetailId;
            existing.Amount = detail.Amount;
            existing.EmployeeId = detail.EmployeeId;
            existing.TransactionId = detail.TransactionId;

            SalaryDisbursementDetails? updatedDetail = await _service.Update(existing);

            if (updatedDetail == null)
                return NotFound($"No Salary Disbursement Detail found with id: {id}");

            return Ok(updatedDetail);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDetail(int id)
        {
            await _service.DeleteById(id);
            return Ok($"Salary Disbursement Detail with id: {id} deleted successfully.");
        }
    }
}
