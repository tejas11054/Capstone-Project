using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface IDocumentService
    {
        public Task<PagedResultDTO<Document>> GetAll(
            string? documentName,
            int pageNumber = 1,
            int pageSize = 10);
        public Task<Document> Add(Document document);
        public Task<Document?> GetById(int id);
        public Task<Document?> Update(Document document);
        public Task DeleteById(int id);

        public Task<IEnumerable<Document>> GetDocumentByClientId(int clientId);
    }
}
