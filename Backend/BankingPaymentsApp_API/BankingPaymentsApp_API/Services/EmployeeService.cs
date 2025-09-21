using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;
using CsvHelper;
using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;

namespace BankingPaymentsApp_API.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<IEnumerable<Employee>> GetAll()
        {
            return await _employeeRepository.GetAll();
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

        public async Task<IEnumerable<Employee>> BulkInsert(List<Employee> employees)
        {
            return await _employeeRepository.BulkInsert(employees);
        }

        public async Task<IEnumerable<Employee>> GetEmployeesByClientId(int clientId)
        {
            var employees = await _employeeRepository.GetAll();
            return employees.Where(x => x.ClientId == clientId);
        }

        public async Task<IEnumerable<EmployeeDTO>?> UploadEmployees(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return null;

            var employeeDtos = new List<EmployeeDTO>();

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
                    employeeDtos = csv.GetRecords<EmployeeDTO>().ToList();
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }

            // Validate DTOs
            foreach (var dto in employeeDtos)
            {
                var context = new ValidationContext(dto, null, null);
                var results = new List<ValidationResult>();
                if (!Validator.TryValidateObject(dto, context, results, true))
                {
                    throw new Exception($"Validation failed for Employee: {dto.EmployeeName}, Errors: {string.Join(", ", results.Select(r => r.ErrorMessage))}");
                }
            }

            return employeeDtos;
        }


    }
}
