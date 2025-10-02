using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface IEmployeeService
    {


        Task<PagedResultDTO<Employee>> GetAll(
                int? clientId,
                string? employeeName,
                string? accountNumber,
                string? bankName,
                string? ifsc,
                bool? isActive,
                int? minSalary,
                int? maxSalary,
                int pageNumber = 1,
                int pageSize = 10);
        public Task<Employee> Add(Employee employee);
        public Task<Employee?> GetById(int id);
        public Task<Employee?> Update(Employee employee);
        public Task DeleteById(int id);
        public Task<IEnumerable<Employee>> BulkInsert(List<Employee> employees);
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
