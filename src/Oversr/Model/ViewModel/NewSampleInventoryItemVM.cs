using Oversr.Model.Entities;
using System;
using System.ComponentModel.DataAnnotations;

namespace Oversr.Model.ViewModel
{
    public class NewSampleInventoryItemVM
    {
        [Required]
        public string Size { get; set; }

        [Required]
        public string Color { get; set; }

        [Required]
        public DateTime DateOrdered { get; set; }

        public DateTime? DateRecieved { get; set; }

        [Required]
        public SampleInventoryStatusLookup InventoryStatus { get; set; }

        [Required]
        public StyleVM Style { get; set; }
    }
}
