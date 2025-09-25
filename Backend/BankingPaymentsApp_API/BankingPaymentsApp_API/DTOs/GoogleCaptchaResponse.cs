using Newtonsoft.Json;

namespace BankingPaymentsApp_API.DTOs
{
    public class GoogleCaptchaResponse
    {
        [JsonProperty("success")] 
        public bool Success { get; set; }
        [JsonProperty("score")] 
        public double Score { get; set; }
        [JsonProperty("action")] 
        public string Action { get; set; }
        [JsonProperty("challenge_ts")] 
        public DateTime ChallengeTs { get; set; }
        [JsonProperty("hostname")] 
        public string Hostname { get; set; }
    }
}
