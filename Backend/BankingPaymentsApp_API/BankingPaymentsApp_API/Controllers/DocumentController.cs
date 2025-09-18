using AutoMapper;
using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BankingPaymentsApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentController : ControllerBase
    {
        private readonly IDocumentRepository _documentRepository;
        private readonly ICloudinaryRepository _cloudinaryRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IMapper _mapper;

        public DocumentController(IDocumentRepository documentRepository, IMapper mapper, ICloudinaryRepository cloudinaryRepository, IAccountRepository accountRepository)
        {
            _documentRepository = documentRepository;
            _mapper = mapper;
            _cloudinaryRepository = cloudinaryRepository;
            _accountRepository = accountRepository;
        }

        // GET: api/Document
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DocumentDTO>>> GetAll()
        {
            var docs = await _documentRepository.GetAll();
            var docDtos = _mapper.Map<IEnumerable<DocumentDTO>>(docs);
            return Ok(docDtos);
        }

        // GET: api/Document/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<DocumentDTO>> GetById(int id)
        {
            var doc = await _documentRepository.GetById(id);
            if (doc == null) return NotFound($"Document with ID {id} not found");

            var docDto = _mapper.Map<DocumentDTO>(doc);
            return Ok(docDto);
        }

        // POST: api/Document
        [HttpPost]
        public async Task<ActionResult<DocumentDTO>> Add(DocumentDTO dto)
        {
            var document = _mapper.Map<Document>(dto);
            var created = await _documentRepository.Add(document);
            var createdDto = _mapper.Map<DocumentDTO>(created);

            return CreatedAtAction(nameof(GetById), new { id = created.DocumentId }, createdDto);
        }

        // PUT: api/Document/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<DocumentDTO>> Update(int id, DocumentDTO dto)
        {
            var existingDoc = await _documentRepository.GetById(id);
            if (existingDoc == null) return NotFound($"Document with ID {id} not found");

            _mapper.Map(dto, existingDoc); // Map new values into existing entity
            var updated = await _documentRepository.Update(existingDoc);

            var updatedDto = _mapper.Map<DocumentDTO>(updated);
            return Ok(updatedDto);
        }

        // DELETE: api/Document/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var existingDoc = await _documentRepository.GetById(id);
            if (existingDoc == null) return NotFound($"Document with ID {id} not found");

            await _documentRepository.DeleteById(id);
            return NoContent();
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile([FromForm] DocumentDTO dto, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file selected!");

            // Check if account exists
            var account = await _accountRepository.GetById(dto.ClientId);
            if (account == null)
                return NotFound($"Account with id {dto.ClientId} not found!");

            // Upload to Cloudinary
            var uploadResult = await _cloudinaryRepository.UploadFileAsync(file);

            // Save in database
            var document = new Document
            {
                DocumentURL = uploadResult.FileUrl,
                DocumentName = dto.DocumentName ?? file.FileName,
                ProofTypeId = dto.ProofTypeId,
                PublicId = uploadResult.PublicId,
                ClientId = dto.ClientId
            };

            await _documentRepository.Add(document);

            return Ok(new
            {
                DocumentId = document.DocumentId,
                AccountId = document.ClientId,
                DocumentURL = document.DocumentURL,
                PublicId = document.PublicId,
                Message = "File uploaded successfully!"
            });
        }
    }
}
