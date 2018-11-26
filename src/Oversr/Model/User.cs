using System;

namespace Oversr.Model
{
    public class User
    {
        public Guid Id { get; set; }
        public DateTime Created { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
        public string Token { get; set; }
    }
}
