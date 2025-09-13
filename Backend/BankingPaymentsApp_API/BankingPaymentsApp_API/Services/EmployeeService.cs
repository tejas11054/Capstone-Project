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

        public IEnumerable<Employee> GetAll()
        {
            return _employeeRepository.GetAll();
        }

        public Employee Add(Employee employee)
        {
            return _employeeRepository.Add(employee);
        }

        public Employee? GetById(int id)
        {
            return _employeeRepository.GetById(id);
        }

        public Employee? Update(Employee employee)
        {
            return _employeeRepository.Update(employee);
        }

        public void DeleteById(int id)
        {
            _employeeRepository.DeleteById(id);
        }
    }
}
