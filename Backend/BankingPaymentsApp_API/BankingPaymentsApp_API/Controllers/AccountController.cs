using AutoMapper;
using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BankingPaymentsApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _service;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public AccountController(IAccountService service, IMapper mapper, ILogger logger)
        {
            _service = service;
            _mapper = mapper;
            _logger = logger;
        }

        // GET: api/Account
        [HttpGet]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)}")]
        public async Task<IActionResult> GetAllAccounts()
        {
            _logger.LogInformation("GetAllAccounts Started");
            var accounts = await _service.GetAll();
            if (!accounts.Any())
                _logger.LogWarning("No Accounts Found");
            return NotFound("No accounts found!");

            var response = accounts.Select(a => _mapper.Map<AccountResponseDTO>(a));
            _logger.LogInformation($"GetAllAccounts succeeded. Returned {accounts.Count()} accounts");
            return Ok(response);
        }

        // GET: api/Account/{id}
        [HttpGet("{id}")]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)}")]
        public async Task<IActionResult> GetAccountById(int id)
        {
            _logger.LogInformation("GetAccountById started");
            var account = await _service.GetById(id);
            if (account == null)
                _logger.LogWarning($"No Account of Id {id} Found");
            return NotFound($"No account found with id: {id}");

            var response = _mapper.Map<AccountResponseDTO>(account);
            _logger.LogInformation($"GetAccountByID succeeded.");
            return Ok(response);
        }

        // POST: api/Account
        [HttpPost]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> CreateAccount([FromBody] RegisterAccountDTO dto)
        {
            _logger.LogInformation($"CreateAccount started.");
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            dto.AccountNumber = await _service.GenerateAccountNumber();

            var newAccount = _mapper.Map<Account>(dto);
            var addedAccount = await _service.Add(newAccount);

            if (addedAccount == null)
                return BadRequest("Unable to create account!");

            var response = _mapper.Map<AccountResponseDTO>(addedAccount);
            _logger.LogInformation($"CreateAccount succeeded with accountNumber {addedAccount.AccountNumber}");
            return Ok(response);
        }

        // PUT: api/Account/{id}
        [HttpPut("{id}")]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> UpdateAccount(int id, [FromBody] AccountResponseDTO dto)
        {
            _logger.LogInformation($"UpdateAccount Started.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingAccount = await _service.GetById(id);
            if (existingAccount == null)
                _logger.LogInformation($"No such account exists! with id: {id}");
                return NotFound("No such account exists!");

            if (existingAccount.AccountId != dto.AccountId)
                return BadRequest("Account Id mismatch!");

            _mapper.Map(dto, existingAccount);

            var updatedAccount = await _service.Update(existingAccount);
            if (updatedAccount == null)
                return BadRequest("Unable to update account!");

            var response = _mapper.Map<AccountResponseDTO>(updatedAccount);
            _logger.LogInformation($"UpdateAccount succeeded.");

            return Ok(response);
        }

        // DELETE: api/Account/{id}
        [HttpDelete("{id}")]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> DeleteAccountById(int id)
        {
            _logger.LogInformation($"DeleteAccountByID started");

            var existingAccount = await _service.GetById(id);
            if (existingAccount == null)
                return NotFound($"No account exists with id {id}");

            await _service.DeleteById(id);
            _logger.LogInformation($"Account with id {id} was Deleted Sucessfully");

            return Ok("Account deleted successfully!");
        }

        [HttpGet("acc/{accountNumber}")]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> GetAccountbyAccountNumber(string accountNumber)
        {
            _logger.LogInformation($"GetAccountbyAccountNumber started");

            Account? account = await _service.AccountExistsWithAccountNumber(accountNumber);
            if (account == null) return NotFound();
            _logger.LogInformation($"Account {account.AccountNumber} was displayed");
            return Ok(account);
        }

    }
}
