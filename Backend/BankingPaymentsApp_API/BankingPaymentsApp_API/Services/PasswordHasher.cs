//using System.Diagnostics.Eventing.Reader;
//using System.Security.Cryptography;

//namespace BankingPaymentsApp_API.Services
//{
//    public class PasswordHasher
//    {
//        public (string hash, string salt) HashPassword(string password)
//        {
//            //generate bytes 
//            byte[] saltBytes = RandomNumberGenerator.GetBytes(16);

//            var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes,10000,HashAlgorithmName.SHA256);
//            byte[] hashBytes = pbkdf2.GetBytes(32);

//            return (Convert.ToBase64String(hashBytes), Convert.ToBase64String(saltBytes));
//        }

//        public bool VerifyPassword(string password,string storedHash, string storedSalt)
//        {
//            byte[] saltBytes = Convert.FromBase64String(storedSalt);
//            var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, 100000, HashAlgorithmName.SHA256);
//            byte[] hashBytes = pbkdf2.GetBytes(32);

//            return Convert.ToBase64String(hashBytes) == storedHash;
//        }
//    }
//}
