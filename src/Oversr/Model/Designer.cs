using System;
using System.ComponentModel.DataAnnotations;

namespace Oversr.Model
{
    public class Designer
    {
        public Guid Id { get; set; }

        [Required]
        public DateTime Created { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; }
    }
}
