using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BankingPaymentsApp_API.Services
{
    public class DocumentService : IDocumentService
    {
        private readonly IDocumentRepository _documentRepository;

        public DocumentService(IDocumentRepository documentRepository)
        {
            _documentRepository = documentRepository;
        }

        public async Task<PagedResultDTO<Document>> GetAll(string? documentName, int pageNumber = 1, int pageSize = 10)
        {
            var query = _documentRepository.GetAll();

            if (!string.IsNullOrEmpty(documentName))
                query = query.Where(d => d.DocumentName.Contains(documentName));

            var totalRecords = await query.CountAsync();

            var data = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedResultDTO<Document>
            {
                Data = data,
                TotalRecords = totalRecords,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
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

        public async Task<IEnumerable<Document>> GetDocumentByClientId(int clientId)
        {
            return await _documentRepository.GetDocumentByClientId(clientId);
        }


    }
}
