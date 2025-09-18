using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface IEmployeeService
    {
        public Task<IEnumerable<Employee>> GetAll();
        public Task<Employee> Add(Employee employee);
        public Task<Employee?> GetById(int id);
        public Task<Employee?> Update(Employee employee);
        public Task DeleteById(int id);
        public Task<IEnumerable<Employee>> BulkInsert(List<Employee> employees);
        public Task<IEnumerable<Employee>> GetEmployeesByClientId(int clientId);

    }
}
