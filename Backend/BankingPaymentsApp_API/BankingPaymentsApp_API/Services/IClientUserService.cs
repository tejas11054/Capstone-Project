using BankingPaymentsApp_API.DTOs;
using BankingPaymentsApp_API.Models;

namespace BankingPaymentsApp_API.Services
{
    public interface IClientUserService
    {
        public Task<IEnumerable<ClientUser>> GetAll(
            string? fullName,
            string? userName,
            string? email,
            string? phone,
            int? bankId,
            DateTime? dobFrom,
            DateTime? dobTo,
            string? address,
            bool? kycVerified,
            int? bankUserId,
            int? pageNumber,
            int? pageSize);
        public Task<ClientUser> Add(ClientUser user);
        public Task<ClientUser?> GetById(int id);
        public  Task<ClientUser?> Update(ClientUser user);
        public Task DeleteById(int id);
        public Task<ClientUser> ApproveClient(ClientUser clientUser);
        public Task RejectClient(ClientUser clientUser, string reason);
        public Task SoftDelete(int id);
    }
}
