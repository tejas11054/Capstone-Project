using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Net.Http;

namespace BankingPaymentsApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly RecaptchaSettings _recaptchaSettings;
        private readonly ILogger<AuthController> _logger;
        private readonly HttpClient _httpClient;
        public AuthController(
            IAuthService authService,
            ILogger<AuthController> logger,
            IOptions<RecaptchaSettings> recaptchaSettings,
            HttpClient httpClient)
        {
            _authService = authService;
            _logger = logger;
            _recaptchaSettings = recaptchaSettings.Value;
            _httpClient = httpClient;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> PostLogin([FromBody] LoginDTO usr)
        {
            if (ModelState.IsValid)
            {
                _logger.LogInformation("Login Started");
                var response = await _httpClient.PostAsync(
                $"https://www.google.com/recaptcha/api/siteverify?secret={_recaptchaSettings.SecretKey}&response={usr.RecaptchaToken}",
                null
                );


                var json = await response.Content.ReadAsStringAsync();
                var captchaResult = JsonConvert.DeserializeObject<GoogleCaptchaResponse>(json);

                if (!captchaResult.Success || (captchaResult.Score < _recaptchaSettings.MinScore))
                {
                    _logger.LogWarning("Captcha validation failed");
                    return BadRequest("Captcha validation failed");
                }
                var loginResponse = _authService.Login(usr);
                if (loginResponse.IsSuccess)
                {
                    _logger.LogInformation("Login Sucessfull");
                    return Ok(loginResponse);
                }
                _logger.LogInformation("Login unSucessfull");
                return Unauthorized();
            }
            _logger.LogInformation("sent a Bad Request");
            return BadRequest();
        }
    }
}
