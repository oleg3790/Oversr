using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Oversr.Model
{
    public class SampleInventoryItem
    {
        public Guid Id { get; set; }

        [Required]
        public DateTime Created { get; set; }

        [Required]
        public DateTime LastModified { get; set; }

        [Required]
        public Guid DesignerId { get; set; }
        public Designer Designer { get; set; }

        [Required]
        public string StyleNumber { get; set; }

        [Required]
        public string StyleName { get; set; }

        [Required]
        public string Size { get; set; }

        [Required]
        public string Color { get; set; }

        [Required]
        public int WholesalePrice { get; set; }

        [Required]
        public int MsrpPrice { get; set; }

        [Required]
        public DateTime DateOrdered { get; set; }

        public DateTime? DateRecieved { get; set; }

        [Required]
        [ForeignKey("SampleInventoryStatusLookup")]
        public int InventoryStatusId { get; set; }
        public SampleInventoryStatusLookup InventoryStatus { get; set; }
    }
}
