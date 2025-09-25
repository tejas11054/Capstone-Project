using BankingPaymentsApp_API.Data;
using BankingPaymentsApp_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly BankingPaymentsDBContext _dbContext;
        public EmployeeRepository(BankingPaymentsDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public async Task<IEnumerable<Employee>> GetAll()
        {
            return await _dbContext.Employees.Include(e => e.ClientUser).ToListAsync();
        }

        public async Task<Employee> Add(Employee employee)
        {
            await _dbContext.Employees.AddAsync(employee);
            await _dbContext.SaveChangesAsync();
            return employee;
        }

        public async Task<Employee?> GetById(int id)
        {
            return await _dbContext.Employees.Include(e => e.ClientUser).FirstOrDefaultAsync(e => e.EmployeeId.Equals(id));
        }

        public async Task<Employee?> Update(Employee employee)
        {
            Employee? existingEmployee = await GetById(employee.EmployeeId);

            if (existingEmployee == null)
                return null;

            existingEmployee.EmployeeName = employee.EmployeeName;
            existingEmployee.ClientId = employee.ClientId;
            existingEmployee.AccountNumber = employee.AccountNumber;
            existingEmployee.BankName = employee.BankName;
            existingEmployee.IFSC = employee.IFSC;

            await _dbContext.SaveChangesAsync();
            return existingEmployee;
        }

        public async Task DeleteById(int id)
        {
            Employee? exisitngEmployee = await GetById(id);
            if (exisitngEmployee == null) return;
            exisitngEmployee.IsActive = false;
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Employee>> BulkInsert(List<Employee> employees)
        {
            await _dbContext.Employees.AddRangeAsync(employees);
            await _dbContext.SaveChangesAsync();
            return employees;
        }


    }
}
