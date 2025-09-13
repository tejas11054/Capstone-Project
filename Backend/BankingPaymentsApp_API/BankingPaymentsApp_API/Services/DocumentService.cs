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

        public IEnumerable<Document> GetAll()
        {
            return _documentRepository.GetAll();
        }

        public Document Add(Document document)
        {
            return _documentRepository.Add(document);
        }

        public Document? GetById(int id)
        {
            return _documentRepository.GetById(id);
        }

        public Document? Update(Document document)
        {
            return _documentRepository.Update(document);
        }

        public void DeleteById(int id)
        {
            _documentRepository.DeleteById(id);
        }
    }
}
