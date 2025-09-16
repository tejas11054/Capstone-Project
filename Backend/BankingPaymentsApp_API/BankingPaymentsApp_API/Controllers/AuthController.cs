using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BankingPaymentsApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult PostLogin([FromBody] LoginDTO usr)
        {
            if (ModelState.IsValid)
            {
                var response = _authService.Login(usr);
                if (response.IsSuccess)
                {
                    return Ok(response.Token);
                }
                return Unauthorized();
            }
            return BadRequest();
        }
    }
}
