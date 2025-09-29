using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace BankingPaymentsApp_API.Services
{
    public class QueryService : IQueryService
    {
        private readonly IQueryRepository _queryRepository;
        private readonly IEmailService _emailService;
        public QueryService(IQueryRepository queryRepository)
        {
            _queryRepository = queryRepository;
        }
        public IQueryable<Query> GetAll()
        {
            return _queryRepository.GetAll();
        }
        public async Task<Query?> GetById(int id)
        {
            return await _queryRepository.GetById(id);
        }
        public async Task<Query> Add(Query query)
        {
            return await _queryRepository.Add(query);
        }

    }
}
