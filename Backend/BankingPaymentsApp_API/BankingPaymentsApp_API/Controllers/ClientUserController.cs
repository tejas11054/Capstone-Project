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
        private readonly IMapper _mapper;

        public ClientUserController(IClientUserService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        // GET: api/ClientUser
        [HttpGet]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> GetAllClientUsers()
        {
            var clientUsers = await _service.GetAll();
            if (!clientUsers.Any())
                return NotFound("No Client Users found!");

            var response = clientUsers.Select(u => _mapper.Map<ClientUserResponseDTO>(u));
            return Ok(response);
        }

        // GET: api/ClientUser/{id}
        [HttpGet("{id}")]
        //////[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> GetClientUserById(int id)
        {
            var clientUser = await _service.GetById(id);
            if (clientUser == null)
                return NotFound($"No Client User found with id: {id}");

            //var response = _mapper.Map<ClientUserResponseDTO>(clientUser);
            return Ok(clientUser);
        }

        // POST: api/ClientUser
        [HttpPost]
        //[Authorize(Roles = $"{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> CreateClientUser([FromBody] RegisterClientUserDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (dto.Password != dto.ConfirmPassword)
                return BadRequest("Password and Confirm Password should match!");

            var newClientUser = _mapper.Map<ClientUser>(dto);
            var addedClientUser = await _service.Add(newClientUser);

            if (addedClientUser == null)
                return BadRequest("Unable to add Client User!");

            var response = _mapper.Map<ClientUserResponseDTO>(addedClientUser);
            return Ok(response);
        }

        // PUT: api/ClientUser/{id}
        [HttpPut("{id}")]
        //[Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> UpdateClientUser(int id, [FromBody] ClientUserResponseDTO dto)
        {
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
            return Ok(response);
        }

        // DELETE: api/ClientUser/{id}
        [HttpDelete("{id}")]
        //[Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> DeleteClientUserById(int id)
        {
            var existingClientUser = await _service.GetById(id);
            if (existingClientUser == null)
                return NotFound($"No Client User exists with id {id}");

            await _service.DeleteById(id);
            return Ok("Client User deleted successfully!");
        }

        // PUT: api/ClientUser/approve/{id}
        [HttpPut("approve/{id}")]
        //[Authorize(Roles = $"{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> ApproveClientUser(int id, [FromBody] ClientUser client)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            //ClientUser client = _mapper.Map<ClientUser>(clientdto);
            ClientUser approvedClient = await _service.ApproveClient(client);
            return Ok(approvedClient);
        }

        [HttpPut("reject/{id}")]
        public async Task<IActionResult> RejectClientUser(int id, [FromBody] RejectDTO rejectDTO)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            ClientUser client = await _service.GetById(id);
            await _service.RejectClient(client, rejectDTO.reason);
            return Ok("Reject Email Sent to " + client.UserName);
        }



    }
}
