using AutoMapper;
using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BankingPaymentsApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BeneficiaryController : ControllerBase
    {
        private readonly IBeneficiaryService _beneficiaryService;
        private readonly IMapper _mapper;
        public BeneficiaryController(IBeneficiaryService beneficiaryService, IMapper mapper)
        {
            _beneficiaryService = beneficiaryService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBeneficiarys()
        {
            var beneficiaries = await _beneficiaryService.GetAll();
            if (beneficiaries.Count() == 0)
                return NotFound("No Beneficiary to display");
            return Ok(beneficiaries);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBeneficiary(BeneficiaryDTO beneficiary)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Beneficiary newBeneficiary = _mapper.Map<Beneficiary>(beneficiary);
            Beneficiary addedBeneficiary = await _beneficiaryService.Add(newBeneficiary);
            return CreatedAtAction("CreateBeneficiary", addedBeneficiary);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetBeneficiaryById(int id)
        {
            Beneficiary? existingBeneficiary = await _beneficiaryService.GetById(id);
            if (existingBeneficiary == null)
                return NotFound($"No Beneficiary of id: {id}");
            return Ok(existingBeneficiary);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateBeneficiary(int id, BeneficiaryDTO beneficiary)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Beneficiary? existingBeneficiary = await _beneficiaryService.GetById(id);
            if (existingBeneficiary == null)
                return NotFound($"No Beneficiary of id: {id}");

            _mapper.Map(beneficiary, existingBeneficiary);

            Beneficiary? updatedBeneficiary = await _beneficiaryService.Update(existingBeneficiary);
            return Ok(updatedBeneficiary);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteBeneficiary(int id)
        {
            Beneficiary? existingBeneficiary = await _beneficiaryService.GetById(id);
            if (existingBeneficiary == null)
                return NotFound($"No Beneficiary of id: {id}");

            await _beneficiaryService.DeleteById(id);
            return Ok("Beneficiary has been deleted Sucessfully!");
        }
    }
}
