using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Security.Cryptography;

namespace Oversr.Model
{
    public class PasswordHash
    {
        public string Hash { get; }

        public PasswordHash(string password, string salt)
        {
            Hash = GetHash(password, salt);
        }        

        /// <summary>
        /// Helper method used for generating test hash and salt
        /// </summary>
        /// <param name="password"></param>
        /// <returns></returns>
        public static Tuple<string[], string[]> GenerateAuthElements(string password)
        {
            var salt = GenerateSalt();
            var hash = GetHash(password, salt);

            return new Tuple<string[], string[]>
            (
                new string[] { "hash", hash },
                new string[] { "salt", salt }
            );
        }

        private static string GenerateSalt()
        {
            byte[] salt = new byte[128 / 8];

            using (var random = RandomNumberGenerator.Create())
            {
                random.GetBytes(salt);
            }

            return Convert.ToBase64String(salt);
        }

        private static string GetHash(string password, string salt)
        {
            return Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password,
                Convert.FromBase64String(salt),
                KeyDerivationPrf.HMACSHA1,
                10000,
                256 / 8));
        }        
    }
}
