using BankingPaymentsApp_API.DTOs;

namespace BankingPaymentsApp_API.Repositories
{
    public interface ICloudinaryRepository
    {
        Task<UploadResultDTO> UploadFileAsync(IFormFile file);
    }
}
