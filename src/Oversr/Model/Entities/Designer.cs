using System;
using System.ComponentModel.DataAnnotations;

namespace Oversr.Model.Entities
{
    public class Designer : EntityBase
    {
        [Required]
        public DateTime LastModified { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; }
    }
}
