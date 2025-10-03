using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.V2;

namespace BankingPaymentsApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StripeController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IAccountService _accountService;

        public StripeController(IConfiguration config,IAccountService accountService)
        {
            _config = config;
            _accountService = accountService;
            StripeConfiguration.ApiKey = _config["Stripe:SecretKey"];
        }

        [HttpPost("create-intent")]
        public IActionResult CreatePaymentIntent([FromBody] CreatePaymentDTO dto)
        {
            try
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = dto.Amount,         // e.g., 1000 = $10
                    Currency = "usd",            // or "inr"
                    PaymentMethodTypes = new List<string> { "card" },
                };

                var service = new PaymentIntentService();
                var intent = service.Create(options);

                return Ok(new { clientSecret = intent.ClientSecret });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("finalize")]
        public async  Task<IActionResult> FinalizePayment([FromBody] FinalizePaymentDTO dto)
        {
            BankingPaymentsApp_API.Models.Account account = await _accountService.GetById(dto.AccountId);

            Transaction txn = await _accountService.CreditAccount(dto.AccountId, dto.Amount, paymentId: null, disbursementId: null, toFrom: account.AccountNumber);
            if (account == null) return NotFound();

            return Ok(txn);
        }
    }
}
