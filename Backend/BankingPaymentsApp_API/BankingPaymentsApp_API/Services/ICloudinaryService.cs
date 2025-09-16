using BankingPaymentsApp_API.DTOs;

namespace BankingPaymentsApp_API.Services
{
    public interface ICloudinaryService
    {
        Task<UploadResultDTO> UploadFileAsync(IFormFile file);
    }
}
