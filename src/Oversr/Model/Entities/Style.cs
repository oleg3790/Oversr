using System;
using System.ComponentModel.DataAnnotations;

namespace Oversr.Model.Entities
{
    public class Style : EntityBase
    {
        [Required]
        public Guid DesignerId { get; set; }
        public Designer Designer { get; set; }

        [Required]
        public DateTime LastModified { get; set; }

        [Required]
        [MaxLength(100)]
        public string Number { get; set; }

        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        public int WholesalePrice { get; set; }

        [Required]
        public int MsrpPrice { get; set; }

        [Required]
        public bool Discontinued { get; set; }
    }
}
