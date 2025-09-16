using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Repositories;

namespace BankingPaymentsApp_API.Services
{
    public class CloudinaryService : ICloudinaryService
    {
        private readonly ICloudinaryRepository _cloudinaryRepository;

        public CloudinaryService(ICloudinaryRepository cloudinaryRepository)
        {
            _cloudinaryRepository = cloudinaryRepository;
        }

        public async Task<UploadResultDTO> UploadFileAsync(IFormFile file)
        {
            return await _cloudinaryRepository.UploadFileAsync(file);
        }
    }
}
