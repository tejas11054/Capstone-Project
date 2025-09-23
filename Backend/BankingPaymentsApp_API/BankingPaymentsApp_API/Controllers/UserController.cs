using AutoMapper;
using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BankingPaymentsApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        private readonly IMapper _mapper;
        public UserController(IUserService service,IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        //GET: api/User
        [HttpGet]
        [Authorize(Roles = $"{nameof(Role.ADMIN)}")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _service.GetAll();
            if (users.Count() == 0)
                return NotFound("No Users to Display!");
            return Ok(users);
        }

        //POST: api/User
        [HttpPost]
        [Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> CreateUser([FromBody] RegisterUserDTO regUser)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (regUser.Password != regUser.ConfirmPassword)
                return BadRequest("Password and Confirm Password should Match!");

            //User newUser = new User
            //{
            //    UserFullName = regUser.UserName,
            //    UserName = regUser.UserName,
            //    UserEmail = regUser.UserEmail,
            //    UserPhone = regUser.UserPhone,
            //    Password = regUser.Password,
            //    UserRoleId = regUser.UserRoleId
            //};
            User newUser = _mapper.Map<User>(regUser);
            User addedUser = await _service.Add(newUser);

            if (addedUser == null) return BadRequest("Unable to add User!");

            UserResponseDTO response = _mapper.Map<UserResponseDTO>(addedUser);
            return Ok(response);
        }

        //GET: api/User/{id}
        [HttpGet]
        [Route("{id}")]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            User? existingUser = await _service.GetById(id);
            if(existingUser == null) return NotFound($"No user of id: {id}");

            UserResponseDTO response = _mapper.Map<UserResponseDTO>(existingUser);
            return Ok(response);
        }

        //PUT: api/User/{id}
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserResponseDTO user)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            User? existingUser = await _service.GetById(id);
            if (existingUser == null) return NotFound("No such User exists!");

            if(existingUser.UserId != user.UserId) return BadRequest("user Id doesnt match!");

            _mapper.Map(user, existingUser);

            User? updatedUser = await _service.Update(existingUser);
            return Ok(updatedUser);
        }

        //GET: api/User{id}
        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> DeleteUserById(int id)
        {
            User? exisitngUser = await _service.GetById(id);
            if(exisitngUser == null) return NotFound($"No user exists with id {id}");
            await _service.DeleteById(id);
            return Ok("The user has been deleted Sucessfully!");
        }

    }
}
