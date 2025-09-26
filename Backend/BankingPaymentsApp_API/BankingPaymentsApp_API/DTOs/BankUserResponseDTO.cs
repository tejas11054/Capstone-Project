namespace BankingPaymentsApp_API.DTOs
{
    public class BankUserResponseDTO
    {
        public int UserId { get; set; }
        public string UserFullName { get; set; }
        public string UserName { get; set; }
        public int UserRoleId { get; set; }
        public int BankId {  get; set; }
        public string UserEmail { get; set; }
        public string UserPhone { get; set; }
        public DateTime UserJoiningDate { get; set; }
        public string RefferalCode { get; set; }
        public string Branch { get; set; }
    }
}
