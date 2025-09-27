using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface IEmployeeService
    {
        public Task<IEnumerable<Employee>> GetAll(
            int? clientId,
            string? employeeName,
            string? accountNumber,
            string? bankName,
            string? ifsc,
            bool? isActive,
            int? minSalary,
            int? maxSalary);
        public Task<Employee> Add(Employee employee);
        public Task<Employee?> GetById(int id);
        public Task<Employee?> Update(Employee employee);
        public Task DeleteById(int id);
        public Task<IEnumerable<Employee>> BulkInsert(List<Employee> employees);
        public Task<IEnumerable<Employee>> GetEmployeesByClientId(int clientId);
        public Task<IEnumerable<EmployeeDTO>?> UploadEmployees(IFormFile file);
        public Task<ICollection<Employee>> GetEmployeesByIDs(ICollection<int> ids);

    }
}
