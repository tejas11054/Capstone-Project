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

        public IEnumerable<Employee> GetAll()
        {
            return _dbContext.Employees.ToList();
        }

        public Employee Add(Employee employee)
        {
            _dbContext.Employees.Add(employee);
            _dbContext.SaveChanges();
            return employee;
        }

        public Employee? GetById(int id)
        {
            return _dbContext.Employees.Include(e=>e.ClientUser).FirstOrDefault(e => e.EmployeeId.Equals(id));
        }

        public Employee? Update(Employee employee)
        {
            Employee? existingEmployee = GetById(employee.EmployeeId);

            if (existingEmployee == null)
                return null;

            existingEmployee.EmployeeName = employee.EmployeeName;
            existingEmployee.ClientId = employee.ClientId;
            existingEmployee.AccountNumber = employee.AccountNumber;
            existingEmployee.BankName = employee.BankName;
            existingEmployee.IFSC=employee.IFSC;

            _dbContext.SaveChanges();
            return existingEmployee;
        }

        public void DeleteById(int id)
        {
            Employee? exisitngEmployee = GetById(id);
            if (exisitngEmployee == null) return;
            _dbContext.Employees.Remove(exisitngEmployee);
        }
    }
}
