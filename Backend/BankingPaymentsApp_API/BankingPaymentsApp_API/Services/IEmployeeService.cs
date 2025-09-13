using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface IEmployeeService
    {
        public IEnumerable<Employee> GetAll();
        public Employee Add(Employee employee);
        public Employee? GetById(int id);
        public Employee? Update(Employee employee);
        public void DeleteById(int id);
    }
}
