using System.ComponentModel.DataAnnotations;

namespace Oversr.Model.ViewModel
{
    public class NewStyleVM
    {
        [Required]
        public string Number { get; set; }

        public string Name { get; set; }

        [Required]
        public int WholesalePrice { get; set; }

        [Required]
        public int MsrpPrice { get; set; }

        [Required]
        public DesignerVM Designer { get; set; }
    }
}
