namespace BankingPaymentsApp_API.Repositories
{
    public interface ICloudinaryRepository
    {
        Task<string> UploadFileAsync(IFormFile file);
    }
}
