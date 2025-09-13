using BankingPaymentsApp_API.Data;
using BankingPaymentsApp_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Repositories
{
    public class DocumentRepository
    {
        private readonly BankingPaymentsDBContext _dbContext;
        public DocumentRepository(BankingPaymentsDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public IEnumerable<Document> GetAll()
        {
            return _dbContext.Documents.ToList();
        }

        public Document Add(Document document)
        {
            _dbContext.Documents.Add(document);
            _dbContext.SaveChanges();
            return document;
        }

        public Document? getById(int id)
        {
            return _dbContext.Documents.Include(d=>d.ProofType).FirstOrDefault(d => d.DocumentId.Equals(id));
        }

        public Document? Update(Document document)
        {
            Document? existingDocument = getById(document.DocumentId);

            if (existingDocument == null)
                return null;

            existingDocument.DocumentName = document.DocumentName;
            existingDocument.DocumentURL = document.DocumentURL;
            existingDocument.ProofTypeId = document.ProofTypeId;

            _dbContext.SaveChanges();
            return existingDocument;
        }

        public void DeleteById(int id)
        {
            Document? exisitngDocument = getById(id);
            if (exisitngDocument == null) return;
            _dbContext.Documents.Remove(exisitngDocument);
        }
    }
}
