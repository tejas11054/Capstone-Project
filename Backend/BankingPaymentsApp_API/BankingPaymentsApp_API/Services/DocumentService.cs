using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;

namespace BankingPaymentsApp_API.Services
{
    public class DocumentService : IDocumentService
    {
        private readonly IDocumentRepository _documentRepository;

        public DocumentService(IDocumentRepository documentRepository)
        {
            _documentRepository = documentRepository;
        }

        public async Task<IEnumerable<Document>> GetAll()
        {
            return await _documentRepository.GetAll();
        }

        public async Task<Document> Add(Document document)
        {
            return await _documentRepository.Add(document);
        }

        public async Task<Document?> GetById(int id)
        {
            return await _documentRepository.GetById(id);
        }

        public async Task<Document?> Update(Document document)
        {
            return await _documentRepository.Update(document);
        }

        public async Task DeleteById(int id)
        {
            await _documentRepository.DeleteById(id);
        }
    }
}
