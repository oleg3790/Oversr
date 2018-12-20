using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Oversr.Model;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Oversr.Model.ViewModel;
using Oversr.Data;
using Oversr.Model.Entities;

namespace Oversr.Services
{
    public class UserService : IUserService
    {
        private readonly IConfiguration _config;
        private readonly ApplicationDbContext _userContext;

        public UserService(IConfiguration config, ApplicationDbContext userContext)
        {
            _config = config;
            _userContext = userContext;
        }       

        public UserVM Login(UserVM vm)
        {
            var user = GetUser(vm.Username, vm.Password);

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
            vm.Token = tokenHandler.WriteToken(token);          

            // Remove password before returning
            vm.Password = null;
            return vm;
        }

        private User GetUser(string username, string password)
        {
            User user = null;

            // First get salt by username, then validate password
            user = _userContext.Users.FirstOrDefault(x => x.Username.Equals(username));

            if (user == null)
                return user;

            var passwordHash = new PasswordHash(password, user.PasswordSalt);

            if (user.PasswordHash != passwordHash.Hash)
            {
                user = null;
            }
            return user;
        }
    }
}
