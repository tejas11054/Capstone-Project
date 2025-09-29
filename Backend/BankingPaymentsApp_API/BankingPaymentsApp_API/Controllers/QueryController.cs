using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;
using BankingPaymentsApp_API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BankingPaymentsApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QueryController : ControllerBase
    {
        private readonly IQueryService _queryService;
        private readonly ILogger<QueryController> _logger;

        public QueryController(IQueryService queryService, ILogger<QueryController> logger)
        {
            _queryService = queryService;
            _logger = logger;
        }

        // GET: api/Query
        [HttpGet]
        public IActionResult GetAllQueries()
        {
            var queries = _queryService.GetAll().ToList();
            if (queries.Count == 0)
                return NotFound("No queries found.");
            return Ok(queries);
        }

        // GET: api/Query/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetQueryById(int id)
        {
            var query = await _queryService.GetById(id);
            if (query == null)
                return NotFound($"No query found with id: {id}");
            return Ok(query);
        }

        // POST: api/Query
        [HttpPost]
        public async Task<IActionResult> CreateQuery([FromBody] Query query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var addedQuery = await _queryService.Add(query);
            return CreatedAtAction(nameof(GetQueryById), new { id = addedQuery.Id }, addedQuery);
        }

    }
}
