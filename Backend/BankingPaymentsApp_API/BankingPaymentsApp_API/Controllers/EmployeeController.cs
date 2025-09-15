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
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;
        public EmployeeController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _employeeService.GetAll();
            if (employees.Count() == 0)
                return NotFound("No Employee to display");
            return Ok(employees);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployee(EmployeeDTO employee)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Employee newEmployee = _mapper.Map<Employee>(employee);
            Employee addedEmployee = await _employeeService.Add(newEmployee);
            return CreatedAtAction("CreateEmployee", addedEmployee);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            Employee? existingEmployee = await _employeeService.GetById(id);
            if (existingEmployee == null)
                return NotFound($"No Employee of id: {id}");
            return Ok(existingEmployee);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, EmployeeDTO employee)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Employee? existingEmployee = await _employeeService.GetById(id);
            if (existingEmployee == null)
                return NotFound($"No Employee of id: {id}");

            _mapper.Map(employee, existingEmployee);

            Employee? updatedEmployee = await _employeeService.Update(existingEmployee);
            return Ok(updatedEmployee);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            Employee? existingEmployee = await _employeeService.GetById(id);
            if (existingEmployee == null)
                return NotFound($"No Employee of id: {id}");

            await _employeeService.DeleteById(id);
            return Ok("Employee has been deleted Sucessfully!");
        }
    }
}
