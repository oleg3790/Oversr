using System;
using System.ComponentModel.DataAnnotations;

namespace Oversr.Model.Entities
{
    abstract public class EntityBase
    {
        public Guid Id { get; set; }

        [Required]
        public DateTime Created { get; set; }

        [Required]
        public bool Deleted { get; set; }
    }
}
