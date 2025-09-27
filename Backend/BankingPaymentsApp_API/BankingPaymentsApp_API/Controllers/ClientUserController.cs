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
    public class ClientUserController : ControllerBase
    {
        private readonly IClientUserService _service;
        private readonly ILogger<ClientUserController> _logger;
        private readonly IMapper _mapper;

        public ClientUserController(IClientUserService service, IMapper mapper, ILogger<ClientUserController> logger)
        {
            _service = service;
            _mapper = mapper;
            _logger = logger;
        }

        // GET: api/ClientUser
        [HttpGet]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> GetAllClientUsers(
            [FromQuery] string? fullName,
            [FromQuery] string? userName,
            [FromQuery] string? email,
            [FromQuery] string? phone,
            [FromQuery] int? bankId,
            [FromQuery] DateTime? dobFrom,
            [FromQuery] DateTime? dobTo,
            [FromQuery] string? address,
            [FromQuery] bool? kycVerified,
            [FromQuery] int? bankUserId)
        {
            _logger.LogInformation("GetAllCLientUsers started!");

            var clientUsers = await _service.GetAll(fullName, userName, email, phone, bankId, dobFrom, dobTo, address, kycVerified, bankUserId);
            if (!clientUsers.Any())
                return NotFound("No Client Users found!");

            var response = clientUsers.Select(u => _mapper.Map<ClientUserResponseDTO>(u));
            _logger.LogInformation($"{response.Count()} client users were displayed!");

            return Ok(response);
        }

        // GET: api/ClientUser/{id}
        [HttpGet("{id}")]
        //////[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> GetClientUserById(int id)
        {
            _logger.LogInformation("GetClientUserById started!");

            var clientUser = await _service.GetById(id);
            if (clientUser == null)
                return NotFound($"No Client User found with id: {id}");

            //var response = _mapper.Map<ClientUserResponseDTO>(clientUser);
            _logger.LogInformation("Client user was Dispalyed");

            return Ok(clientUser);
        }

        // POST: api/ClientUser
        [HttpPost]
        //[Authorize(Roles = $"{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> CreateClientUser([FromBody] RegisterClientUserDTO dto)
        {
            _logger.LogInformation("CreateClientUser started!");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (dto.Password != dto.ConfirmPassword)
                return BadRequest("Password and Confirm Password should match!");

            var newClientUser = _mapper.Map<ClientUser>(dto);
            var addedClientUser = await _service.Add(newClientUser);

            if (addedClientUser == null)
                return BadRequest("Unable to add Client User!");

            var response = _mapper.Map<ClientUserResponseDTO>(addedClientUser);
            _logger.LogInformation("Creation Sucessfull!");

            return Ok(response);
        }

        // PUT: api/ClientUser/{id}
        [HttpPut("{id}")]
        //[Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> UpdateClientUser(int id, [FromBody] ClientUserResponseDTO dto)
        {
            _logger.LogInformation("UpdateClientUser started!");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingClientUser = await _service.GetById(id);
            if (existingClientUser == null)
                return NotFound("No such Client User exists!");

            if (existingClientUser.UserId != dto.UserId)
                return BadRequest("User Id mismatch!");
            
            _mapper.Map(dto, existingClientUser);

            var updatedClientUser = await _service.Update(existingClientUser);
            if (updatedClientUser == null)
                return BadRequest("Unable to update Client User!");

            var response = _mapper.Map<ClientUserResponseDTO>(updatedClientUser);
            _logger.LogInformation("CLient User was Updated Sucessfully!");

            return Ok(response);
        }

        // DELETE: api/ClientUser/{id}
        [HttpDelete("{id}")]
        //[Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> DeleteClientUserById(int id)
        {
            _logger.LogInformation("DeleteClientUserById started!");

            var existingClientUser = await _service.GetById(id);
            if (existingClientUser == null)
                return NotFound($"No Client User exists with id {id}");

            await _service.DeleteById(id);
            _logger.LogInformation("Client User was Deleted Sucessfully!");

            return Ok("Client User deleted successfully!");
        }

        // PUT: api/ClientUser/approve/{id}
        [HttpPut("approve/{id}")]
        //[Authorize(Roles = $"{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> ApproveClientUser(int id, [FromBody] ClientUser client)
        {
            _logger.LogInformation("ApproveClientUser started!");

            if (!ModelState.IsValid) return BadRequest(ModelState);
            //ClientUser client = _mapper.Map<ClientUser>(clientdto);
            ClientUser approvedClient = await _service.ApproveClient(client);
            _logger.LogInformation("Client Was Approved!");

            return Ok(approvedClient);
        }

        [HttpPut("reject/{id}")]
        public async Task<IActionResult> RejectClientUser(int id, [FromBody] RejectDTO rejectDTO)
        {
            _logger.LogInformation("RejectClientUser started!");

            if (!ModelState.IsValid) return BadRequest(ModelState);
            ClientUser client = await _service.GetById(id);
            await _service.RejectClient(client, rejectDTO.reason);
            _logger.LogInformation("Client user was Rejected!");

            return Ok("Reject Email Sent to " + client.UserName);
        }



    }
}
