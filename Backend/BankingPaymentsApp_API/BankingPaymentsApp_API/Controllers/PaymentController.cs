using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BankingPaymentsApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        // GET: api/Payment
        [HttpGet]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        //[Authorize(Roles = $"{nameof(Role.CLIENT_USER)}")]
        public async Task<IActionResult> GetAllPayments(
            [FromQuery] int? payerAccountId,
            [FromQuery] string? payerName,
            [FromQuery] string? payeeAccountNumber,
            [FromQuery] double? minAmount,
            [FromQuery] double? maxAmount,
            [FromQuery] DateTime? createdFrom,
            [FromQuery] DateTime? createdTo,
            [FromQuery] int? paymentStatusId,
            [FromQuery] DateTime? actionFrom,
            [FromQuery] DateTime? actionTo)
        {
            var payments =await _paymentService.GetAll(payerAccountId,payerName, payeeAccountNumber, minAmount, maxAmount,
            createdFrom, createdTo, paymentStatusId, actionFrom, actionTo);
     
            return Ok(payments);
        }

        // POST: api/Payment
        [HttpPost]
        //[Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> CreatePayment(PaymentDTO payment)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            Payment newPayment = new Payment
            {
                PayerAccountId = payment.PayerAccountId,
                PayeeAccountNumber = payment.PayeeAccountNumber,
                Amount = payment.Amount
            };
            Payment addedPayment = await _paymentService.Add(newPayment);
            return Ok(addedPayment);
        }

        // GET: api/Payment/{id}
        [HttpGet]
        [Route("{id}")]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> GetPaymentById(int id)
        {
            Payment? existingPayment = await _paymentService.GetById(id);
            if (existingPayment == null)
                return NotFound($"No Payment of id: {id}");
            return Ok(existingPayment);
        }

        // PUT: api/Payment/{id}
        [HttpPut]
        [Route("{id}")]
        //[Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> UpdatePayment(int id,PaymentDTO payment)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            Payment? existingPayment = await _paymentService.GetById(id);
            if(existingPayment == null)
                return NotFound($"No Payment of id: {id}");

            existingPayment.Amount = payment.Amount;
            existingPayment.PayerAccountId = payment.PayerAccountId;
            existingPayment.PayeeAccountNumber = payment.PayeeAccountNumber;

            Payment? updatedPayment = await _paymentService.Update(existingPayment);
            return Ok(updatedPayment);
        }

        // DELETE: api/Payment/{id}
        [HttpDelete]
        [Route("{id}")]
        //[Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            Payment? existingPayment = await _paymentService.GetById(id);
            if (existingPayment == null)
                return NotFound($"No Payment of id: {id}");

            await _paymentService.DeleteById(id);
            return Ok("Payment has been deleted Sucessfully!");
        }

        // PUT: api/Payment/approve/{id}
        [HttpPut]
        [Route("approve/{id}")]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> ApprovePayment(int id, [FromBody] Payment payment)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            Payment? approvedPayment = await _paymentService.ApprovePayment(payment);
            if (approvedPayment == null) return BadRequest("something went wrong");
            return  Ok(approvedPayment);
        }

        [HttpPut]
        [Route("reject/{id}")]
        public async Task<IActionResult> RejectPayment(int id, [FromBody] RejectDTO rejectDTO)
        {
            await _paymentService.RejectPayment(id, rejectDTO.reason);
            return Ok("Payment Rejected Sucessfully");
        }
        

    }
}
