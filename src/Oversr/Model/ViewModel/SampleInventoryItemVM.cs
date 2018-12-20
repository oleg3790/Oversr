using Oversr.Model.Entities;
using System;

namespace Oversr.Model.ViewModel
{
    public class SampleInventoryItemVM
    {
        public string Id { get; set; }        

        public string Size { get; set; }

        public string Color { get; set; }

        public int WholesalePrice { get; set; }

        public int MsrpPrice { get; set; }

        public DateTime DateOrdered { get; set; }
    
        public DateTime? DateRecieved { get; set; }

        public SampleInventoryStatus InventoryStatus { get; set; }

        public StyleVM Style { get; set; }
    }
}
