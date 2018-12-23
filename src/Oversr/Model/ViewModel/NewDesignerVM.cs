using System.ComponentModel.DataAnnotations;

namespace Oversr.Model.ViewModel
{
    public class NewDesignerVM
    {
        [Required]
        public string Name { get; set; }
    }
}
