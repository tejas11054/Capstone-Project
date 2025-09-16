namespace BankingPaymentsApp_API.Services
{
    public interface ICloudinaryService
    {
        Task<string> UploadFileAsync(IFormFile file);
    }
}
