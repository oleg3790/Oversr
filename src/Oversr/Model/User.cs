using System;
using System.ComponentModel.DataAnnotations;

namespace Oversr.Model
{
    public class User
    {
        public Guid Id { get; set; }

        [Required]
        public DateTime Created { get; set; }

        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(100)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(100)]
        public string Username { get; set; }

        [Required]
        [MaxLength(300)]
        public string PasswordHash { get; set; }

        [Required]
        [MaxLength(200)]
        public string PasswordSalt { get; set; }        
    }
}
