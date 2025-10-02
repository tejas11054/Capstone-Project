using System.ComponentModel.DataAnnotations;

namespace BankingPaymentsApp_API.Models
{
    public class Query
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required!")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email is required!")]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Message is required!")]
        public string Message { get; set; }

        public string? Response { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
