using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Oversr.Model;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Dapper;
using System.Data.SqlClient;

namespace Oversr.Services
{
    public class UserService : IUserService
    {
        private const string AllUsersSql = "select * from users where username = @Username;";
        private readonly IConfiguration _config;

        public UserService(IConfiguration config)
        {
            _config = config;
        }       

        public User Login(string username, string password)
        {

            var user = GetUser(username, password);

            if (user == null)
                return null;

            // Authentication successful so generate JWT token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config.GetValue<string>("authSecret"));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // Remove password before returning
            user.PasswordHash = null;

            return user;
        }

        private User GetUser(string username, string password)
        {
            User user = null;

            using (var conn = new SqlConnection(_config.GetValue<string>("defaultConnection")))
            {
                // First get salt by username, then validate password
                user = conn.QueryFirstOrDefault<User>(AllUsersSql, new { Username = username });
                var passwordHash = new PasswordHash(password, user.PasswordSalt);

                if (user.PasswordHash != passwordHash.Hash)
                {
                    user = null;
                }
            }
            return user;
        }
    }
}
