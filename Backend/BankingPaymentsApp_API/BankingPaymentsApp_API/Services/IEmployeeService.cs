using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface IEmployeeService
    {


        Task<IEnumerable<Employee>> GetAll(
                int? clientId,
                string? employeeName,
                string? accountNumber,
                string? bankName,
                string? ifsc,
                bool? isActive,
                int? minSalary,
                int? maxSalary,
                int? pageNumber,
                int? pageSize);
        public Task<Employee> Add(Employee employee);
        public Task<Employee?> GetById(int id);
        public Task<Employee?> Update(Employee employee);
        public Task DeleteById(int id);
        public Task<(IEnumerable<Employee> inserted, List<string> skipped)> BulkInsert(List<Employee> employees);
        public Task<IEnumerable<Employee>> GetEmployeesByClientId(int clientId,
    string? employeeName = null,
    string? accountNumber = null,
    string? bankName = null,
    string? ifsc = null,
    int? salary = null);
        public Task<IEnumerable<EmployeeDTO>?> UploadEmployees(IFormFile file);
        public Task<ICollection<Employee>> GetEmployeesByIDs(ICollection<int> ids);

    }
}
