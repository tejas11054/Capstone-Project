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

        public async Task<string> UploadFileAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("File cannot be empty");

            await using var stream = file.OpenReadStream();
            var uploadParams = new RawUploadParams()
            {
                File = new FileDescription(file.FileName, stream)
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);

            if (uploadResult.StatusCode != System.Net.HttpStatusCode.OK)
                throw new Exception("File upload failed!");

            return uploadResult.SecureUrl.ToString();
        }
    }
}
