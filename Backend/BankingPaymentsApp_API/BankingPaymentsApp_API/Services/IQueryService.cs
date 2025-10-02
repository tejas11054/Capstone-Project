using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface IQueryService
    {
        IQueryable<Query> GetAll();
        Task<Query?> GetById(int id);
        Task<Query> Add(Query query);
    }
}
