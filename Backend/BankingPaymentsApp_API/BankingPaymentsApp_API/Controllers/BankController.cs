using AutoMapper;
using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BankingPaymentsApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BankController : ControllerBase
    {
        private readonly IBankService _service;
        private readonly IMapper _mapper;
        private readonly ILogger<BankController> _logger;
        public BankController(IBankService bankService, IMapper mapper, ILogger<BankController> logger)
        {
            _service = bankService;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)}")]
        public async Task<IActionResult> GetAllBanks(
            [FromQuery] string? bankName,
            [FromQuery] string? ifsc,
            [FromQuery] bool? isActive,
            [FromQuery] DateTime? createdFrom,
            [FromQuery] DateTime? createdTo)
        {
            _logger.LogInformation("GetAllBanks Started");
            var banks = await _service.GetAll(bankName, ifsc, isActive, createdFrom, createdTo);
            if (!banks.Any())
            {
                _logger.LogWarning("No Banks Found");
                return NotFound("No Banks found!");
            }
            _logger.LogInformation($"GetAllAccounts succeeded. Returned {banks.Count()} accounts");
            return Ok(banks);
        }

        // GET: api/Account/{id}
        [HttpGet("{id}")]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)}")]
        public async Task<IActionResult> GetBankById(int id)
        {
            _logger.LogInformation("GetBankById started");
            var bank = await _service.GetById(id);
            if (bank == null)
            {
                _logger.LogWarning($"No bank of Id {id} Found");
                return NotFound($"No bank found with id: {id}");
            }

            _logger.LogInformation($"GetBankByID succeeded.");
            return Ok(bank);
        }

        // POST: api/Account
        [HttpPost]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> CreateBank([FromBody] BankDTO dto)
        {
            _logger.LogInformation($"CreateBank started.");
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var newBank = _mapper.Map<Bank>(dto);
            var addedBank = await _service.Add(newBank);

            if (addedBank == null)
                return BadRequest("Unable to create account!");
            _logger.LogInformation($"CreateBank succeeded ");
            return Ok(addedBank);
        }

        // PUT: api/Account/{id}
        [HttpPut("{id}")]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> UpdateBank(int id, [FromBody] BankDTO dto)
        {
            _logger.LogInformation($"UpdateBank Started.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingBank = await _service.GetById(id);
            if (existingBank == null)
            {
                _logger.LogInformation($"No such bank exists! with id: {id}");
                return NotFound("No such bank exists!");
            }


            _mapper.Map(dto, existingBank);

            var updatedBank = await _service.Update(existingBank);
            if (updatedBank == null)
                return BadRequest("Unable to update bank!");

            _logger.LogInformation($"UpdateBank succeeded.");

            return Ok(updatedBank);
        }

        // DELETE: api/Account/{id}
        [HttpDelete("{id}")]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> DeleteBankById(int id)
        {
            _logger.LogInformation($"DeleteBankByID started");

            var existingBank = await _service.GetById(id);
            if (existingBank == null)
                return NotFound($"No bank exists with id {id}");

            await _service.DeleteById(id);
            _logger.LogInformation($"bank with id {id} was Deleted Sucessfully");

            return Ok("bank deleted successfully!");
        }
    }
}
