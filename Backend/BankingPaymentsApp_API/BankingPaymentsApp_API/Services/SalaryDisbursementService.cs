using BankingPaymentsApp_API.Data;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Services
{
    public class SalaryDisbursementService : ISalaryDisbursementService
    {
        private readonly ISalaryDisbursementRepository _salaryDisbursementRepository;
        private readonly ISalaryDisbursementDetailsRepository _salaryDisbursementDetailsRepository;
        private readonly IAccountService _accountService;
        private readonly ITransactionRepository _transactionRepository;
        private readonly IEmployeeService _employeeService;
        private readonly IEmailService _emailService;
        private readonly BankingPaymentsDBContext _dbContext;


        public SalaryDisbursementService(ISalaryDisbursementRepository salaryDisbursementRepository, IAccountService accountService, BankingPaymentsDBContext dBContext, ITransactionRepository transactionRepository, ISalaryDisbursementDetailsRepository detailsRepository, IEmployeeService employeeService, IEmailService emailService)
        {
            _salaryDisbursementRepository = salaryDisbursementRepository;
            _accountService = accountService;
            _dbContext = dBContext;
            _transactionRepository = transactionRepository;
            _salaryDisbursementDetailsRepository = detailsRepository;
            _employeeService = employeeService;
            _emailService = emailService;
        }

        public async Task<IEnumerable<SalaryDisbursement>> GetAll(
            int? clientId,
            decimal? minAmount,
            decimal? maxAmount,
            DateTime? disbursementFrom,
            DateTime? disbursementTo,
            int? disbursementStatusId,
            bool? allEmployees)
        {
            var query = _salaryDisbursementRepository.GetAll();

            if (clientId.HasValue)
                query = query.Where(sd => sd.ClientId == clientId.Value);

            if (minAmount.HasValue)
                query = query.Where(sd => sd.TotalAmount >= minAmount.Value);

            if (maxAmount.HasValue)
                query = query.Where(sd => sd.TotalAmount <= maxAmount.Value);

            if (disbursementFrom.HasValue)
                query = query.Where(sd => sd.DisbursementDate >= disbursementFrom.Value);

            if (disbursementTo.HasValue)
                query = query.Where(sd => sd.DisbursementDate <= disbursementTo.Value);

            if (disbursementStatusId.HasValue)
                query = query.Where(sd => sd.DisbursementStatusId == disbursementStatusId.Value);

            if (allEmployees.HasValue)
                query = query.Where(sd => sd.AllEmployees == allEmployees.Value);

            return await query.ToListAsync();
        }
        public async Task<SalaryDisbursement?> GetById(int id)
        {
            return await _salaryDisbursementRepository.GetById(id);
        }
        public async Task<SalaryDisbursement> Add(SalaryDisbursement disbursement, ICollection<int> ids)
        {
            decimal tAmount = 0;
            if (disbursement.AllEmployees)
            {
                //gives reference error should get all the employees from db
                var employees = await _employeeService.GetEmployeesByClientId(disbursement.ClientId);
                foreach (Employee emp in employees)
                {
                    tAmount += emp.Salary;
                    disbursement.Employees.Add(emp);
                }
                disbursement.TotalAmount = tAmount;
            }
            else
            {
                var employees = await _employeeService.GetEmployeesByIDs(ids);
                if (employees.Any())
                {
                    foreach (Employee emp in employees)
                    {
                        tAmount += emp.Salary;
                    }
                    disbursement.TotalAmount = tAmount;
                }
            }

            return await _salaryDisbursementRepository.Add(disbursement);
        }
        public async Task<SalaryDisbursement?> Update(SalaryDisbursement disbursement)
        {
            return await _salaryDisbursementRepository.Update(disbursement);
        }
        public async Task DeleteById(int id)
        {
            await _salaryDisbursementRepository.DeleteById(id);
        }

        public async Task<SalaryDisbursement> ApproveSalaryDisbursement(int disbursementId)
        {
            var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                SalaryDisbursement? salaryDisbursement = await _salaryDisbursementRepository.GetById(disbursementId);

                if (salaryDisbursement == null) throw new NullReferenceException("did not find this salary disbursement!");

                int ClientAccountId = salaryDisbursement.ClientUser.Account.AccountId;
                Account? ClientAccount = await _accountService.GetById(ClientAccountId);
                if (ClientAccount.Balance < (double)salaryDisbursement.TotalAmount)
                {
                    salaryDisbursement.DisbursementStatusId = 2;
                    throw new Exception("insufficient Balance!");
                }
                //ClientAccount.Balance -= (double)salaryDisbursement.TotalAmount;

                //await _accountService.Update(ClientAccount);
                await _accountService.DebitAccount(ClientAccountId, (double)salaryDisbursement.TotalAmount);

                var details = new List<SalaryDisbursementDetails>();
                foreach (Employee emp in salaryDisbursement.Employees)
                {
                    SalaryDisbursementDetails detail = new SalaryDisbursementDetails
                    {
                        SalaryDisbursementId = salaryDisbursement.SalaryDisbursementId,
                        EmployeeId = emp.EmployeeId,
                        Amount = emp.Salary
                    };

                    Account? employeeAccount = await _accountService.AccountExistsWithAccountNumber(emp.AccountNumber);
                    if (employeeAccount != null)
                    {
                        employeeAccount.Balance += emp.Salary;
                        Transaction creditTransaction = new Transaction
                        {
                            TransactionTypeId = 1,
                            AccountId = employeeAccount.AccountId,
                            CreatedAt = DateTime.UtcNow,
                            Amount = emp.Salary,
                            SalaryDisbursementId = disbursementId
                        };
                        Transaction addedTransacation = await _transactionRepository.Add(creditTransaction);
                        detail.TransactionId = addedTransacation.TransactionId;
                        await _accountService.Update(employeeAccount);

                        string subject1 = $"Your Salary Has Been Credited";
                        string body1 =
                            $"""
                            Your Account ({ClientAccount.AccountNumber}) is Credited with Rs {emp.Salary}; 
                            """;
                        await _emailService.SendEmailToClientAsync((int)employeeAccount.ClientId, subject1, body1);
                    }

                    SalaryDisbursementDetails addedDetail = await _salaryDisbursementDetailsRepository.Add(detail);
                    details.Add(addedDetail);
                }

                salaryDisbursement.DisbursementDetails = details;
                salaryDisbursement.DisbursementStatusId = 1;

                Transaction debitTransaction = new Transaction
                {
                    TransactionTypeId = 2,
                    AccountId = ClientAccount.AccountId,
                    CreatedAt = DateTime.UtcNow,
                    Amount = (double)salaryDisbursement.TotalAmount,
                    SalaryDisbursementId = disbursementId
                };
                Transaction addDebTransacation = await _transactionRepository.Add(debitTransaction);
                ClientAccount.TransactionIds.Add(addDebTransacation.TransactionId);

                SalaryDisbursement? updatedDisbursement = await _salaryDisbursementRepository.Update(salaryDisbursement);
                await transaction.CommitAsync();
                string subject = $"Your SalaryDisbursement ID {disbursementId} is Approved!";
                string body =
                    $"""
                    Your SalaryDisbursement ({disbursementId}) has been approved at {DateTime.UtcNow}
                    Your Account ({ClientAccount.AccountNumber}) is Debited with Rs {salaryDisbursement.TotalAmount} 
                    """;
                await _emailService.SendEmailToClientAsync((int)salaryDisbursement.ClientId, subject, body);
                return updatedDisbursement;

            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<SalaryDisbursement> RejectSalaryDisbursement(int Id, string reason)
        {
            SalaryDisbursement? disbursement = await _salaryDisbursementRepository.GetById(Id);
            if (disbursement == null) throw new NullReferenceException("No Payment of id :" + Id);

            disbursement.DisbursementStatusId = 2;

            string subject = $"Salary Disbursement ID {Id} was Rejected!";
            string body = reason;

            await _emailService.SendEmailToClientAsync((int)disbursement.ClientId, subject, body);

            SalaryDisbursement? updatedPayment = await _salaryDisbursementRepository.Update(disbursement);
            return updatedPayment;
        }
    }
}
