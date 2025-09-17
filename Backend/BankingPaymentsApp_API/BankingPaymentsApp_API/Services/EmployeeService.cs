using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;

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


    }
}
