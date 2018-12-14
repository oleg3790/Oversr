using Oversr.Model.Enums;
using System;

namespace Oversr.Model.ViewModel
{
    public class SampleInventoryItemVM
    {
        public Designer Designer { get; set; }
        public string StyleNumber { get; set; }
        public string StyleName { get; set; }
        public string Size { get; set; }
        public string Color { get; set; }
        public int WholesalePrice { get; set; }
        public int MsrpPrice { get; set; }
        public DateTime DateOrdered { get; set; }
        public DateTime DateRecieved { get; set; }
        public SampleInventoryStatus InventoryStatus { get; set; }
    }
}
