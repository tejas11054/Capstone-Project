
using BankingPaymentsApp_API.Data;
using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;
using BankingPaymentsApp_API.Services;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            //Adding DBContext
            builder.Services.AddDbContext<BankingPaymentsDBContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("connString"));
            });
            //Adding Repositories
            builder.Services.AddScoped<IAccountRepository, AccountRepository>();
            builder.Services.AddScoped<IBankUserRepository, BankUserRepository>();
            builder.Services.AddScoped<IBeneficiaryRepository, BeneficiaryRepository>();
            builder.Services.AddScoped<IClientUserRepository, ClientUserRepository>();
            builder.Services.AddScoped<IDocumentRepository, DocumentRepository>();
            builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();
            builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            //Adding Services
            builder.Services.AddScoped<IAccountService, AccountService>();
            builder.Services.AddScoped<IBankUserService, BankUserService>();
            builder.Services.AddScoped<IBeneficiaryService, BeneficiaryService>();
            builder.Services.AddScoped<IClientUserService, ClientUserService>();
            builder.Services.AddScoped<IDocumentService, DocumentService>();
            builder.Services.AddScoped<IEmployeeService, EmployeeService>();
            builder.Services.AddScoped<IPaymentService, PaymentService>();
            builder.Services.AddScoped<ITransactionService, TransactionService>();
            builder.Services.AddScoped<IUserService, UserService>();
            //Adding AutoMapper
            builder.Services.AddAutoMapper(options =>
            {
                options.CreateMap<RegisterUserDTO, User>();
                options.CreateMap<UserResponseDTO, User>();
                options.CreateMap<User, UserResponseDTO>();
                options.CreateMap<Account, AccountResponseDTO>();
                options.CreateMap<AccountResponseDTO, Account>();
                options.CreateMap<RegisterAccountDTO, Account>();
                options.CreateMap<RegisterClientUserDTO, ClientUser>();
                options.CreateMap<ClientUser, ClientUserResponseDTO>();
                options.CreateMap<ClientUserResponseDTO, ClientUser>();
                options.CreateMap<RegisterBankUserDTO, BankUser>();
                options.CreateMap<BankUserResponseDTO, BankUser>();
                options.CreateMap<BankUser, BankUserResponseDTO>();
                options.CreateMap<RegisterTransactionDTO, Transaction>();
                options.CreateMap<DocumentDTO, Document>();
                options.CreateMap<EmployeeDTO, Employee>();
                options.CreateMap<BeneficiaryDTO, Beneficiary>();
                options.CreateMap<EmployeeDTO, Employee>();
            });


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
