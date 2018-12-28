using System;
using System.ComponentModel.DataAnnotations;

namespace Oversr.Model.Entities
{
    public class SampleInventoryItem : EntityBase
    {
        [Required]
        public DateTime LastModified { get; set; }

        [Required]
        public Guid StyleId { get; set; }
        public Style Style { get; set; }

        [Required]  
        public int InventoryStatusId { get; set; }
        public SampleInventoryStatusLookup InventoryStatus { get; set; }

        [Required]
        public string Size { get; set; }

        [Required]
        public string Color { get; set; }

        [Required]
        public DateTime DateOrdered { get; set; }

        public DateTime? DateRecieved { get; set; }
    }
}
