using AutoMapper;
using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;
using BankingPaymentsApp_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BankingPaymentsApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentController : ControllerBase
    {
        private readonly IDocumentService _documentService;
        private readonly ICloudinaryService _cloudinaryService;
        private readonly IAccountService _accountService;
        private readonly IClientUserService _clientUserService;
        private readonly ILogger<DocumentController> _logger;
        private readonly IMapper _mapper;

        public DocumentController(IDocumentService documentService, IMapper mapper, ICloudinaryService cloudinaryService, IAccountService accountService, IClientUserService clientUserService, ILogger<DocumentController> logger)
        {
            _documentService = documentService;
            _mapper = mapper;
            _cloudinaryService = cloudinaryService;
            _accountService = accountService;
            _clientUserService = clientUserService;
            _logger = logger;
        }

        // GET: api/Document
        [HttpGet]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<ActionResult<PagedResultDTO<DocumentDTO>>> GetAll(
            [FromQuery] string? documentName,
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10)
        {
            _logger.LogInformation("GetAllDocuments started!");

            var pagedResult = await _documentService.GetAll(documentName, pageNumber, pageSize);

            if (!pagedResult.Data.Any())
                return NotFound("No documents found!");

            var docDtos = pagedResult.Data.Select(d => new DocumentDTO
            {
                DocumentId = d.DocumentId,
                ClientId = d.ClientId,
                DocumentName = d.DocumentName,
                DocumentURL = d.DocumentURL,
                ProofTypeId = d.ProofTypeId,
                PublicId = d.PublicId
            }).ToList();

            return Ok(new
            {
                Data = docDtos,
                pagedResult.TotalRecords,
                pagedResult.PageNumber,
                pagedResult.PageSize
            });
        }


        // GET: api/Document/{id}
        [HttpGet("{id}")]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<ActionResult<DocumentDTO>> GetById(int id)
        {
            var doc = await _documentService.GetById(id);
            if (doc == null) return NotFound($"Document with ID {id} not found");

            //var docDto = _mapper.Map<DocumentDTO>(doc);
            return Ok(doc);
        }

        // POST: api/Document
        [HttpPost]
        [Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<ActionResult<DocumentDTO>> Add(DocumentDTO dto)
        {
            var document = _mapper.Map<Document>(dto);
            var created = await _documentService.Add(document);
            var createdDto = _mapper.Map<DocumentDTO>(created);

            return CreatedAtAction(nameof(GetById), new { id = created.DocumentId }, createdDto);
        }

        // PUT: api/Document/update/{id}
        [HttpPut("update/{id}")]
       // [Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> UpdateDocument(int id, [FromForm] DocumentDTO dto, IFormFile file)
        {
            var existingDoc = await _documentService.GetById(id);
            if (existingDoc == null)
                return NotFound($"Document with ID {id} not found");

            if (file == null || file.Length == 0)
                return BadRequest("No file selected to update");

            var uploadResult = await _cloudinaryService.UploadFileAsync(file);

            existingDoc.DocumentName = dto.DocumentName ?? file.FileName;
            existingDoc.DocumentURL = uploadResult.FileUrl;
            existingDoc.PublicId = uploadResult.PublicId;
            existingDoc.ProofTypeId = dto.ProofTypeId != 0 ? dto.ProofTypeId : existingDoc.ProofTypeId;

            var updatedDoc = await _documentService.Update(existingDoc);

            var updatedDto = new DocumentDTO
            {
                DocumentId = updatedDoc.DocumentId,
                ClientId = updatedDoc.ClientId,
                DocumentName = updatedDoc.DocumentName,
                DocumentURL = updatedDoc.DocumentURL,
                ProofTypeId = updatedDoc.ProofTypeId,
                PublicId = updatedDoc.PublicId
            };

            return Ok(updatedDto);
        }


        // DELETE: api/Document/{id}
        [HttpDelete("{id}")]
        //[Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<ActionResult> Delete(int id)
        {
            var existingDoc = await _documentService.GetById(id);
            if (existingDoc == null) return NotFound($"Document with ID {id} not found");

            await _documentService.DeleteById(id);
            return NoContent();
        }

        // upload documents
        // POST: api/Document/upload/{id}
        [HttpPost("upload")]
        //[Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> UploadFile([FromForm] DocumentDTO dto, IFormFile file)
        {
            _logger.LogInformation("UploadDocument started!");

            if (file == null || file.Length == 0)
                return BadRequest("No file selected!");

            // Check if account exists
            var account = await _clientUserService.GetById(dto.ClientId);
            if (account == null)
                return NotFound($"Account with id {dto.ClientId} not found!");

            // Upload to Cloudinary
            var uploadResult = await _cloudinaryService.UploadFileAsync(file);

            // Save in database
            var document = new Document
            {
                DocumentURL = uploadResult.FileUrl,
                DocumentName = dto.DocumentName ?? file.FileName,
                ProofTypeId = dto.ProofTypeId,
                PublicId = uploadResult.PublicId,
                ClientId = dto.ClientId
            };

            Document addedDocument = await _documentService.Add(document);

            // Get client
            ClientUser client = await _clientUserService.GetById(dto.ClientId);
            if (client == null)
                return NotFound($"Client with id {dto.ClientId} not found!");

            // Assign DocumentId to ClientUser
            client.Documents.Add(addedDocument);

            // Update client in DB
            await _clientUserService.Update(client);
            _logger.LogInformation("Documnet was uploaded!");


            return Ok(new
            {
                DocumentId = addedDocument.DocumentId,
                AccountId = addedDocument.ClientId,
                DocumentURL = addedDocument.DocumentURL,
                PublicId = addedDocument.PublicId,
                Message = "File uploaded successfully!"
            });

        }

        // GET: api/Document/client/{clientId}
        [HttpGet("client/{clientId}")]
        // [Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<ActionResult> GetDocumentsByClientId(int clientId,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 5)
        {
            _logger.LogInformation("GetDocumentsByClientId started!");

            var pagedResult = await _documentService.GetDocumentByClientId(clientId, pageNumber, pageSize);

            if (!pagedResult.Data.Any())
                return NotFound($"No documents found for ClientId {clientId}");

            var docDtos = pagedResult.Data.Select(d => new DocumentDTO
            {
                DocumentId = d.DocumentId,
                ClientId = d.ClientId,
                DocumentName = d.DocumentName,
                DocumentURL = d.DocumentURL,
                ProofTypeId = d.ProofTypeId,
                PublicId = d.PublicId
            }).ToList();

            return Ok(new
            {
                Data = docDtos,
                pagedResult.TotalRecords,
                pagedResult.PageNumber,
                pagedResult.PageSize
            });
        }



    }
}
