using AutoMapper;
using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BankingPaymentsApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BeneficiaryController : ControllerBase
    {
        private readonly IBeneficiaryService _beneficiaryService;
        private readonly ILogger<BeneficiaryController> _logger;
        private readonly IMapper _mapper;
        public BeneficiaryController(IBeneficiaryService beneficiaryService, IMapper mapper, ILogger<BeneficiaryController> logger)
        {
            _beneficiaryService = beneficiaryService;
            _mapper = mapper;
            _logger = logger;
        }

        // GET: api/Beneficiary/
        [HttpGet]
        [Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> GetAllBeneficiaries(
             [FromQuery] int? clientId,
             [FromQuery] string? beneficiaryName,
             [FromQuery] string? accountNumber,
             [FromQuery] string? bankName,
             [FromQuery] string? ifsc,
             [FromQuery] int? pageNumber,
             [FromQuery] int? pageSize)
        {
            _logger.LogInformation("GetAllBeneficiaries started!");

            var response = await _beneficiaryService.GetAll(clientId, beneficiaryName, accountNumber, bankName, ifsc, pageNumber, pageSize);

            if (!response.Any())
                return Ok(response);

            _logger.LogInformation($"beneficiaries displayed!");

            return Ok(response);
        }


        // POST: api/Beneficiary
        [HttpPost()]
        //[Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> CreateBeneficiary(BeneficiaryDTO beneficiary)
        {
            _logger.LogInformation("CreateBeneficiary started!");

            if (!ModelState.IsValid) return BadRequest(ModelState);
            Beneficiary newBeneficiary = _mapper.Map<Beneficiary>(beneficiary);
            Beneficiary addedBeneficiary = await _beneficiaryService.Add(newBeneficiary);

            _logger.LogInformation("Beneficiary was created");
            return CreatedAtAction("CreateBeneficiary", addedBeneficiary);
        }

        // GET: api/Beneficiary/{id}
        [HttpGet]
        [Route("{id}")]
        //[Authorize(Roles = $"{nameof(Role.ADMIN)},{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> GetBeneficiaryById(int id)
        {
            _logger.LogInformation("GetBeneficiaryById started!");

            Beneficiary? existingBeneficiary = await _beneficiaryService.GetById(id);
            if (existingBeneficiary == null)
                return NotFound($"No Beneficiary of id: {id}");

            _logger.LogInformation($"Beneficiary with id {id} was displayed!");
            return Ok(existingBeneficiary);
        }

        // PUT: api/Beneficiary/{id}
        [HttpPut]
        [Route("{id}")]
        //[Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> UpdateBeneficiary(int id, BeneficiaryDTO beneficiary)
        {
            _logger.LogInformation("UpdateBeneficiary started!");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Beneficiary? existingBeneficiary = await _beneficiaryService.GetById(id);
            if (existingBeneficiary == null)
                return NotFound($"No Beneficiary of id: {id}");

            _mapper.Map(beneficiary, existingBeneficiary);

            Beneficiary? updatedBeneficiary = await _beneficiaryService.Update(existingBeneficiary);
            _logger.LogInformation("Beneficiary was updated!");

            return Ok(updatedBeneficiary);
        }

        // DELETE: api/Beneficiary/{id}
        [HttpDelete]
        [Route("{id}")]
       // [Authorize(Roles = $"{nameof(Role.CLIENT_USER)},{nameof(Role.BANK_USER)}")]
        public async Task<IActionResult> DeleteBeneficiary(int id)
        {
            _logger.LogInformation("DeleteBeneficiary started!");

            Beneficiary? existingBeneficiary = await _beneficiaryService.GetById(id);
            if (existingBeneficiary == null)
                return NotFound($"No Beneficiary of id: {id}");

            await _beneficiaryService.DeleteById(id);
            _logger.LogInformation("UpdateBeneficiary sucessfull!");

            return Ok("Beneficiary has been deleted Sucessfully!");
        }
    }
}
