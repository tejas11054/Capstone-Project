using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;

namespace BankingPaymentsApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogController : ControllerBase
    {
        private readonly string logDirectory;

        public LogController()
        {
            logDirectory = Path.Combine(Directory.GetCurrentDirectory(), "logs");
        }

        // GET: api/logs
        [HttpGet]
        public IActionResult GetLogs([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            if (!Directory.Exists(logDirectory))
                return NotFound(new { message = "No logs found" });

            var files = Directory.GetFiles(logDirectory, "*.txt")
                                 .Select(f => new
                                 {
                                     FileName = Path.GetFileName(f),
                                     CreatedOn = System.IO.File.GetCreationTime(f).ToString("yyyy-MM-dd HH:mm:ss")
                                 })
                                 .OrderByDescending(f => f.CreatedOn) 
                                 .ToList();

            var totalRecords = files.Count;
            var pagedFiles = files
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            if (!pagedFiles.Any())
                return NotFound(new { message = "No logs to display for this page" });

            return Ok(new
            {
                Data = pagedFiles,
                TotalRecords = totalRecords,
                PageNumber = pageNumber,
                PageSize = pageSize
            });
        }

        // GET: api/logs/download/{fileName}
        [HttpGet("download/{fileName}")]
        public IActionResult DownloadLog(string fileName)
        {
            var filePath = Path.Combine(logDirectory, fileName);

            if (!System.IO.File.Exists(filePath))
                return NotFound(new { message = "File not found" });

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            return File(fileBytes, "text/plain", fileName);
        }



    }
}
