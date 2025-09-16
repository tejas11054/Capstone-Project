using BankingPaymentsApp_API.DTOs;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace BankingPaymentsApp_API.Repositories
{
    public class CloudinaryRepository : ICloudinaryRepository
    {
        private readonly Cloudinary _cloudinary;

        public CloudinaryRepository(IOptions<CloudinarySettingsDTO> config)
        {
            var account = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(account);
        }

        public async Task<UploadResultDTO> UploadFileAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("File cannot be null or empty");

            using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                PublicId = Guid.NewGuid().ToString() 
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);

            return new UploadResultDTO
            {
                FileUrl = uploadResult.SecureUrl.ToString(),
                PublicId = uploadResult.PublicId
            };
        }
    }
}
