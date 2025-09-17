using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Services;
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

        [HttpGet]
        public async Task<IActionResult> GetAllPayments()
        {
            var payments =await _paymentService.GetAll();
            if(payments.Count()==0)
                return NotFound("No payments to display");
            return Ok(payments);
        }

        [HttpPost]
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

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetPaymentById(int id)
        {
            Payment? existingPayment = await _paymentService.GetById(id);
            if (existingPayment == null)
                return NotFound($"No Payment of id: {id}");
            return Ok(existingPayment);
        }

        [HttpPut]
        [Route("{id}")]
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

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            Payment? existingPayment = await _paymentService.GetById(id);
            if (existingPayment == null)
                return NotFound($"No Payment of id: {id}");

            await _paymentService.DeleteById(id);
            return Ok("Payment has been deleted Sucessfully!");
        }

        [HttpPut]
        [Route("approve/{id}")]
        public async Task<IActionResult> ApprovePayment(int id, [FromBody] Payment payment)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            Payment? approvedPayment = await _paymentService.ApprovePayment(payment);
            if (approvedPayment == null) return BadRequest("something went wrong");
            return  Ok(approvedPayment);
        }
        

    }
}
