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
                PayeeAccountId = payment.PayeeAccountId,
                Amount = payment.Amount
            };
            Payment addedPayment = await _paymentService.Add(newPayment);
            return Ok(addedPayment);
        }
    }
}
