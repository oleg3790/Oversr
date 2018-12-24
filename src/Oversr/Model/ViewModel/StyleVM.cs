using System;
using System.ComponentModel.DataAnnotations;

namespace Oversr.Model.ViewModel
{
    public class StyleVM : NewStyleVM
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public DateTime Created { get; set; }

        [Required]
        public bool Discontinued { get; set; }

        [Required]
        public bool Deleted { get; set; }
    }
}
