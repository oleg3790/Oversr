using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Oversr.Model.ViewModel
{
    public class SampleInventoryItemVM
    {
        public string Designer { get; set; }
        public string StyleNumber { get; set; }
        public string StyleName { get; set; }
        public string Sizes { get; set; }
        public string Color { get; set; }
        public int WholesalePrice { get; set; }
        public int MsrpPrice { get; set; }
        public DateTime DateOrdered { get; set; }
        public DateTime DateRecieved { get; set; }
    }
}
