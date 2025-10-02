using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface IDocumentService
    {
        public Task<IEnumerable<Document>> GetAll(
            string? documentName,
            int? pageNumber,
            int? pageSize);
        public Task<Document> Add(Document document);
        public Task<Document?> GetById(int id);
        public Task<Document?> Update(Document document);
        public Task DeleteById(int id);

        Task<PagedResultDTO<Document>> GetDocumentByClientId(
        int clientId,
        int pageNumber = 1,
        int pageSize = 5);
    }
}
