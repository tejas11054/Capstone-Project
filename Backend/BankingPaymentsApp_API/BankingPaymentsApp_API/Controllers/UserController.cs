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
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        private readonly IMapper _mapper;
        public UserController(IUserService service,IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _service.GetAll();
            if (users.Count() == 0)
                return NotFound("No Users to Display!");
            return Ok(users);
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] RegisterUserDTO regUser)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (regUser.Password != regUser.ConfirmPassword)
                return BadRequest("Password and Confirm Password should Match!");

            User newUser = new User
            {
                UserFullName = regUser.UserName,
                UserName = regUser.UserName,
                UserEmail = regUser.UserEmail,
                UserPhone = regUser.UserPhone,
                Password = regUser.Password,
                UserRoleId = regUser.UserRoleId
            };
            User addedUser = await _service.Add(newUser);

            if (addedUser == null) return BadRequest("Unable to add User!");

            UserResponseDTO response = new UserResponseDTO
            {
                UserId = addedUser.UserId,
                UserFullName = addedUser.UserName,
                UserName = addedUser.UserName,
                UserEmail = addedUser.UserEmail,
                UserPhone = addedUser.UserPhone,
                UserJoiningDate = addedUser.UserJoiningDate
            };
            return Ok(response);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            User? existingUser = await _service.GetById(id);
            if(existingUser == null) return NotFound($"No user of id: {id}");

            //UserResponseDTO response = new UserResponseDTO
            //{
            //    UserId = existingUser.UserId,
            //    UserFullName = existingUser.UserName,
            //    UserName = existingUser.UserName,
            //    UserRoleId = existingUser.UserRoleId,
            //    UserEmail = existingUser.UserEmail,
            //    UserPhone = existingUser.UserPhone,
            //    UserJoiningDate = existingUser.UserJoiningDate
            //};

            UserResponseDTO response = _mapper.Map<UserResponseDTO>(existingUser);
            return Ok(response);
        }
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserResponseDTO user)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            User? existingUser = await _service.GetById(id);
            if (existingUser == null) return NotFound("No such User exists!");

            if(existingUser.UserId != user.UserId) return BadRequest("user Id doesnt match!");

            existingUser.UserName = user.UserName;
            existingUser.UserFullName = user.UserFullName;
            existingUser.UserRoleId = user.UserRoleId;
            existingUser.UserPhone = user.UserPhone;
            existingUser.UserEmail = user.UserEmail;

            User? updatedUser = await _service.Update(existingUser);
            return Ok(updatedUser);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteUserById(int id)
        {
            User? exisitngUser = await _service.GetById(id);
            if(exisitngUser == null) return NotFound($"No user exists with id {id}");
            await _service.DeleteById(id);
            return Ok("The user has been deleted Sucessfully!");
        }





    }
}
