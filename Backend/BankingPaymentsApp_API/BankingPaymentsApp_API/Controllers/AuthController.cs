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
        private readonly ILogger<AuthController> _logger;
        public AuthController(IAuthService authService, ILogger<AuthController> logger)
        {
            _authService = authService;
            _logger = logger;
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult PostLogin([FromBody] LoginDTO usr)
        {
            if (ModelState.IsValid)
            {
                _logger.LogInformation("Login Started");
                var response = _authService.Login(usr);
                if (response.IsSuccess)
                {
                    _logger.LogInformation("Login Sucessfull");
                    return Ok(response);
                }
                _logger.LogInformation("Login unSucessfull");
                return Unauthorized();
            }
            _logger.LogInformation("sent a Bad Request");
            return BadRequest();
        }
    }
}
