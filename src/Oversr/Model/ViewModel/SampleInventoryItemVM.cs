﻿using System;
using System.ComponentModel.DataAnnotations;

namespace Oversr.Model.ViewModel
{
    public class SampleInventoryItemVM
    {
        [Required]
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
        public SampleInventoryStatus InventoryStatus { get; set; }
    }
}
