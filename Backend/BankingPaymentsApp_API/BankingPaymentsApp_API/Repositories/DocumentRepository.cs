using BankingPaymentsApp_API.Data;
using BankingPaymentsApp_API.Models;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Repositories
{
    public class DocumentRepository : IDocumentRepository
    {
        private readonly BankingPaymentsDBContext _dbContext;
        public DocumentRepository(BankingPaymentsDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public IQueryable<Document> GetAll()
        {
            return _dbContext.Documents.AsQueryable();
        }


        public async Task<Document> Add(Document document)
        {
            await _dbContext.Documents.AddAsync(document);
            await _dbContext.SaveChangesAsync();
            return document;
        }

        public async Task<Document?> GetById(int id)
        {
            return await _dbContext.Documents.Include(d=>d.ProofType).FirstOrDefaultAsync(d => d.DocumentId.Equals(id));
        }

        public async Task<Document?> Update(Document document)
        {
            Document? existingDocument = await GetById(document.DocumentId);

            if (existingDocument == null)
                return null;

            existingDocument.DocumentName = document.DocumentName;
            existingDocument.DocumentURL = document.DocumentURL;
            existingDocument.ProofTypeId = document.ProofTypeId;

            await _dbContext.SaveChangesAsync();
            return existingDocument;
        }

        public async Task DeleteById(int id)
        {
            Document? exisitngDocument = await GetById(id);
            if (exisitngDocument == null) return;
            _dbContext.Documents.Remove(exisitngDocument);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Document>> GetDocumentByClientId(int clientId)
        {
            return await _dbContext.Documents
                                   .Include(d => d.ProofType) 
                                   .Where(d => d.ClientId == clientId)
                                   .ToListAsync();
        }

    }
}
