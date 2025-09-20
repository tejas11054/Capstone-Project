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
        private readonly IMapper _mapper;

        public BankUserController(IBankUserService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        // GET: api/BankUser
        [HttpGet]
        [Authorize(Roles = $"{nameof(Role.ADMIN)}")]
        public async Task<IActionResult> GetAllBankUsers()
        {
            var bankUsers = await _service.GetAll();
            if (!bankUsers.Any())
                return NotFound("No Bank Users found!");

            var response = bankUsers.Select(u => _mapper.Map<BankUserResponseDTO>(u));
            return Ok(response);
        }

        // GET: api/BankUser/{id}
        [HttpGet("{id}")]
        [Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> GetBankUserById(int id)
        {
            var bankUser = await _service.GetById(id);
            if (bankUser == null)
                return NotFound($"No Bank User found with id: {id}");

            var response = _mapper.Map<BankUserResponseDTO>(bankUser);
            return Ok(response);
        }

        // POST: api/BankUser
        [HttpPost]
        [Authorize(Roles = $"{nameof(Role.ADMIN)}")]
        public async Task<IActionResult> CreateBankUser([FromBody] RegisterBankUserDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (dto.Password != dto.ConfirmPassword)
                return BadRequest("Password and Confirm Password should match!");

            var newBankUser = _mapper.Map<BankUser>(dto);
            var addedBankUser = await _service.Add(newBankUser);

            if (addedBankUser == null)
                return BadRequest("Unable to add Bank User!");

            var response = _mapper.Map<BankUserResponseDTO>(addedBankUser);
            return Ok(response);
        }

        // PUT: api/BankUser/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> UpdateBankUser(int id, [FromBody] BankUserResponseDTO dto)
        {
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
            return Ok(response);
        }

        // DELETE: api/BankUser/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> DeleteBankUserById(int id)
        {
            var existingBankUser = await _service.GetById(id);
            if (existingBankUser == null)
                return NotFound($"No Bank User exists with id {id}");

            await _service.DeleteById(id);
            return Ok("Bank User deleted successfully!");
        }
    }
}
