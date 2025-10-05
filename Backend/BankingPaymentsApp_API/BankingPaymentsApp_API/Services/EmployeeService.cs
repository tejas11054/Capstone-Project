using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;
using CsvHelper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;

namespace BankingPaymentsApp_API.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IClientUserRepository _userRepository;

        public EmployeeService(IEmployeeRepository employeeRepository, IClientUserRepository clientUserRepository)
        {
            _employeeRepository = employeeRepository;
            _userRepository = clientUserRepository;
        }
        public async Task<IEnumerable<Employee>> GetAll(
            int? clientId,
            string? employeeName,
            string? accountNumber,
            string? bankName,
            string? ifsc,
            bool? isActive,
            int? minSalary,
            int? maxSalary,
            int? pageNumber,
            int? pageSize)
        {
            var query = _employeeRepository.GetAll();

            if (clientId.HasValue)
                query = query.Where(e => e.ClientId == clientId.Value);

            if (!string.IsNullOrEmpty(employeeName))
                query = query.Where(e => e.EmployeeName.Contains(employeeName));

            if (!string.IsNullOrEmpty(accountNumber))
                query = query.Where(e => e.AccountNumber.Contains(accountNumber));

            if (!string.IsNullOrEmpty(bankName))
                query = query.Where(e => e.BankName.Contains(bankName));

            if (!string.IsNullOrEmpty(ifsc))
                query = query.Where(e => e.IFSC.Contains(ifsc));

            if (isActive.HasValue)
                query = query.Where(e => e.IsActive == isActive.Value);

            if (minSalary.HasValue)
                query = query.Where(e => e.Salary >= minSalary.Value);

            if (maxSalary.HasValue)
                query = query.Where(e => e.Salary <= maxSalary.Value);

            return query;
        }


        public async Task<Employee> Add(Employee employee)
        {
            return await _employeeRepository.Add(employee);
        }

        public async Task<Employee?> GetById(int id)
        {
            return await _employeeRepository.GetById(id);
        }

        public async Task<Employee?> Update(Employee employee)
        {
            return await _employeeRepository.Update(employee);
        }

        public async Task DeleteById(int id)
        {
            await _employeeRepository.DeleteById(id);
        }

        public async Task<(IEnumerable<Employee> inserted, List<string> skipped)> BulkInsert(List<Employee> employees)
        {
            return await _employeeRepository.BulkInsert(employees);
        }


        public async Task<IEnumerable<Employee>> GetEmployeesByClientId(int clientId,
    string? employeeName = null,
    string? accountNumber = null,
    string? bankName = null,
    string? ifsc = null,
    int? salary = null)
        {

            var employees = _employeeRepository.GetAll();
            return employees.Where(x => x.ClientId == clientId);
        }

        public async Task<IEnumerable<EmployeeDTO>?> UploadEmployees(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return null;

            var employeeCSVDto = new List<EmployeeCSVDto>();

            using (var stream = new StreamReader(file.OpenReadStream()))
            using (var csv = new CsvReader(stream, new CsvHelper.Configuration.CsvConfiguration(System.Globalization.CultureInfo.InvariantCulture)
            {
                HasHeaderRecord = true,
                HeaderValidated = null,
                MissingFieldFound = null
            }))
            {
                try
                {
                    employeeCSVDto = csv.GetRecords<EmployeeCSVDto>().ToList();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }

            // Validate DTOs
            foreach (var dto in employeeCSVDto)
            {
                var context = new ValidationContext(dto, null, null);
                var results = new List<ValidationResult>();
                if (!Validator.TryValidateObject(dto, context, results, true))
                {
                    throw new Exception($"Validation failed for Employee: {dto.EmployeeName}, Errors: {string.Join(", ", results.Select(r => r.ErrorMessage))}");
                }
            }

            var employeeDtos = new List<EmployeeDTO>();

            foreach (var csvDto in employeeCSVDto)
            {
                var client = _userRepository.GetAll().FirstOrDefault(c => c.UserEmail == csvDto.ClientEmail);
                if (client == null)
                    throw new Exception($"Client with email '{csvDto.ClientEmail}' not found.");

                employeeDtos.Add(new EmployeeDTO
                {
                    ClientId = client.UserId,
                    EmployeeName = csvDto.EmployeeName,
                    AccountNumber = csvDto.AccountNumber,
                    BankName = csvDto.BankName,
                    IFSC = csvDto.IFSC,
                    Salary = csvDto.Salary
                });
            }

            return employeeDtos;
        }

        public async Task<ICollection<Employee>> GetEmployeesByIDs(ICollection<int> ids)
        {
            List<Employee> employees = new List<Employee>();
            foreach (int id in ids)
            {
                Employee? employee = await _employeeRepository.GetById(id);
                if (employee != null)
                {
                    employees.Add(employee);
                }
            }

            return employees;
        }


    }
}
