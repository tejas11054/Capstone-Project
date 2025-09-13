using BankingPaymentsApp_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Data
{
    public class BankingPaymentsDBContext : DbContext
    {
        public BankingPaymentsDBContext() { }
        public BankingPaymentsDBContext(DbContextOptions options) : base(options) { }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<AccountStatus> AccountStatuses { get; set; }
        public DbSet<AccountType> AccountTypes { get; set; }
        public DbSet<BankUser> BankUsers { get; set; }
        public DbSet<Beneficiary> Beneficiaries { get; set; }
        public DbSet<ClientUser> ClientUsers { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<PaymentStatus> PaymentStatuses { get; set; }
        public DbSet<ProofType> ProofTypes { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<TransactionType> TransactionTypes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AccountStatus>()
                .HasData(
                    new AccountStatus { StatusId = 1, Status = AccStatus.ACTIVE },
                    new AccountStatus { StatusId = 2, Status = AccStatus.INACTIVE },
                    new AccountStatus { StatusId = 3, Status = AccStatus.CLOSED }
                );

            modelBuilder.Entity<AccountType>()
                .HasData(
                    new AccountType { TypeId = 1, Type = AccType.SAVINGS },
                    new AccountType { TypeId = 2, Type = AccType.CURRENT },
                    new AccountType { TypeId = 3, Type = AccType.SALARY }
                );

            modelBuilder.Entity<PaymentStatus>()
                .HasData(
                    new PaymentStatus { StatusId = 1, Status = PayStatus.APPROVED },
                    new PaymentStatus { StatusId = 2, Status = PayStatus.DECLINED },
                    new PaymentStatus { StatusId = 3, Status = PayStatus.PENDING }
                );

            modelBuilder.Entity<ProofType>()
                .HasData(
                    new ProofType { TypeId = 1, Type = DocProofType.IDENTITY_PROOF },
                    new ProofType { TypeId = 2, Type = DocProofType.ADDRESS_PROOF },
                    new ProofType { TypeId = 3, Type = DocProofType.DATE_OF_BIRTH_PROOF },
                    new ProofType { TypeId = 4, Type = DocProofType.PHOTOGRAPH },
                    new ProofType { TypeId = 5, Type = DocProofType.PAN_CARD },
                    new ProofType { TypeId = 6, Type = DocProofType.OTHER }
                );

            modelBuilder.Entity<TransactionType>()
                .HasData(
                    new TransactionType { TypeId = 1, Type = TxnType.CREDIT },
                    new TransactionType { TypeId = 2, Type = TxnType.DEBIT }
                );

            modelBuilder.Entity<UserRole>()
                .HasData(
                    new UserRole { RoleId = 1, Role = Role.ADMIN },
                    new UserRole { RoleId = 2, Role = Role.BANK_USER },
                    new UserRole { RoleId = 3, Role = Role.CLIENT_USER }
                );

            modelBuilder.Entity<Payment>()
                .HasOne(p => p.PayerAccount)
                .WithMany()
                .HasForeignKey(p => p.PayerAccountId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Payment>()
                .HasOne(p => p.PayeeAccount)
                .WithMany()
                .HasForeignKey(p => p.PayeeAccountId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
