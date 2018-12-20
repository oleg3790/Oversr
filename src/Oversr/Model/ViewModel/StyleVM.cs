using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Oversr.Model.ViewModel
{
    public class StyleVM
    {
        public string Id { get; set; }

        public string Number { get; set; }

        public string Name { get; set; }

        public DateTime? Created { get; set; }

        public DesignerVM Designer { get; set; }
    }
}
