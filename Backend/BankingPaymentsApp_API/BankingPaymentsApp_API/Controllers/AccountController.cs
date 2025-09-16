using AutoMapper;
using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace BankingPaymentsApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _service;
        private readonly IMapper _mapper;

        public AccountController(IAccountService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        // GET: api/Account
        [HttpGet]
        public async Task<IActionResult> GetAllAccounts()
        {
            var accounts = await _service.GetAll();
            if (!accounts.Any())
                return NotFound("No accounts found!");

            var response = accounts.Select(a => _mapper.Map<AccountResponseDTO>(a));
            return Ok(response);
        }

        // GET: api/Account/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAccountById(int id)
        {
            var account = await _service.GetById(id);
            if (account == null)
                return NotFound($"No account found with id: {id}");

            var response = _mapper.Map<AccountResponseDTO>(account);
            return Ok(response);
        }

        // POST: api/Account
        [HttpPost]
        public async Task<IActionResult> CreateAccount([FromBody] RegisterAccountDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            dto.AccountNumber = await _service.GenerateAccountNumber();

            var newAccount = _mapper.Map<Account>(dto);
            var addedAccount = await _service.Add(newAccount);

            if (addedAccount == null)
                return BadRequest("Unable to create account!");

            var response = _mapper.Map<AccountResponseDTO>(addedAccount);
            return Ok(response);
        }

        // PUT: api/Account/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAccount(int id, [FromBody] AccountResponseDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingAccount = await _service.GetById(id);
            if (existingAccount == null)
                return NotFound("No such account exists!");

            if (existingAccount.AccountId != dto.AccountId)
                return BadRequest("Account Id mismatch!");

            _mapper.Map(dto, existingAccount);

            var updatedAccount = await _service.Update(existingAccount);
            if (updatedAccount == null)
                return BadRequest("Unable to update account!");

            var response = _mapper.Map<AccountResponseDTO>(updatedAccount);
            return Ok(response);
        }

        // DELETE: api/Account/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccountById(int id)
        {
            var existingAccount = await _service.GetById(id);
            if (existingAccount == null)
                return NotFound($"No account exists with id {id}");

            await _service.DeleteById(id);
            return Ok("Account deleted successfully!");
        }
    }
}
