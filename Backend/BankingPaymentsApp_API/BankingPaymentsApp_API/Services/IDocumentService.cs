using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface IDocumentService
    {
        public IEnumerable<Document> GetAll();
        public Document Add(Document document);
        public Document? GetById(int id);
        public Document? Update(Document document);
        public void DeleteById(int id);
    }
}
