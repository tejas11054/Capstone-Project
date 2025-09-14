namespace BankingPaymentsApp_API.DTOs
{
    public class ClientUserResponseDTO
    {
        public int UserId { get; set; }
        public string UserFullName { get; set; }
        public string UserName { get; set; }
        public int UserRoleId { get; set; }
        public string UserEmail { get; set; }
        public string UserPhone { get; set; }
        public DateTime UserJoiningDate { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public bool KycVierified { get; set; }
        public int? AccountId { get; set; }
    }
}
