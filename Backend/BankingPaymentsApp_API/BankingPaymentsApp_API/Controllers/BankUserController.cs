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
    public class BankUserController : ControllerBase
    {
        private readonly IBankUserService _service;
        private readonly ILogger<BankUserController> _logger;
        private readonly IMapper _mapper;

        public BankUserController(IBankUserService service, IMapper mapper, ILogger<BankUserController> logger)
        {
            _service = service;
            _mapper = mapper;
            _logger = logger;
        }

        // GET: api/BankUser
        [HttpGet]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)}")]
        public async Task<IActionResult> GetAllBankUsers()
        {
            _logger.LogInformation("GetAllBankUsers started!");
            var bankUsers = await _service.GetAll();
            if (!bankUsers.Any())
                return NotFound("No Bank Users found!");

            var response = bankUsers.Select(u => _mapper.Map<BankUserResponseDTO>(u));
            _logger.LogInformation($"Found Bank user");
            return Ok(response);
        }

        // GET: api/BankUser/{id}
        [HttpGet("{id}")]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> GetBankUserById(int id)
        {
            _logger.LogInformation("GetBankUserById started!");

            var bankUser = await _service.GetById(id);
            if (bankUser == null)
                return NotFound($"No Bank User found with id: {id}");

            var response = _mapper.Map<BankUserResponseDTO>(bankUser);
            _logger.LogInformation($"Bank user id: {id} Displayed");
            return Ok(bankUser);
        }

        // POST: api/BankUser
        [HttpPost]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)}")]
        public async Task<IActionResult> CreateBankUser([FromBody] RegisterBankUserDTO dto)
        {
            _logger.LogInformation("CreateBankUser started!");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (dto.Password != dto.ConfirmPassword)
                return BadRequest("Password and Confirm Password should match!");

            var newBankUser = _mapper.Map<BankUser>(dto);
            var addedBankUser = await _service.Add(newBankUser);

            if (addedBankUser == null)
                return BadRequest("Unable to add Bank User!");

            var response = _mapper.Map<BankUserResponseDTO>(addedBankUser);
            _logger.LogInformation("bank user Created!");
            return Ok(response);
        }

        // PUT: api/BankUser/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> UpdateBankUser(int id, [FromBody] BankUserResponseDTO dto)
        {
            _logger.LogInformation("UpdateBankUser started!");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingBankUser = await _service.GetById(id);
            if (existingBankUser == null)
                return NotFound("No such Bank User exists!");

            if (existingBankUser.UserId != dto.UserId)
                return BadRequest("User Id mismatch!");

            _mapper.Map(dto, existingBankUser);

            var updatedBankUser = await _service.Update(existingBankUser);
            if (updatedBankUser == null)
                return BadRequest("Unable to update Bank User!");

            var response = _mapper.Map<BankUserResponseDTO>(updatedBankUser);
            _logger.LogInformation("bank user info updated sucessfully");
            return Ok(response);
        }

        // DELETE: api/BankUser/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> DeleteBankUserById(int id)
        {
            _logger.LogInformation("DeleteBankUserById started!");

            var existingBankUser = await _service.GetById(id);
            if (existingBankUser == null)
                return NotFound($"No Bank User exists with id {id}");

            await _service.DeleteById(id);
            _logger.LogInformation("Bnak user was deleted Sucessfully!");

            return Ok("Bank User deleted successfully!");
        }

        [HttpPut("approve/{id}")]
        //[Authorize(Roles = $"{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> ApproveBankUser(int id, [FromBody] BankUser bankUser)
        {
            _logger.LogInformation("ApproveBankUser started!");

            if (!ModelState.IsValid) return BadRequest(ModelState);
            //ClientUser client = _mapper.Map<ClientUser>(clientdto);
            BankUser approvedBankUser = await _service.ApproveBankUser(id);
            _logger.LogInformation("BankUser Was Approved!");

            return Ok(approvedBankUser);
        }

        [HttpPut("reject/{id}")]
        public async Task<IActionResult> RejectBankUser(int id, [FromBody] RejectDTO rejectDTO)
        {
            _logger.LogInformation("RejectBanktUser started!");

            if (!ModelState.IsValid) return BadRequest(ModelState);
            BankUser bankUser = await _service.RejectBankUser(id, rejectDTO);
            _logger.LogInformation("Client user was Rejected!");

            return Ok("Reject Email Sent to " + bankUser.UserName);
        }
    }
}
