using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Repositories
{
    public interface IQueryRepository
    {
        IQueryable<Query> GetAll();
        Task<Query?> GetById(int id);
        Task<Query> Add(Query query);
        Task<Query> Update(Query query);
    }
}
