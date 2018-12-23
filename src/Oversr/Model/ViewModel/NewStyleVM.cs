﻿using System;
using System.ComponentModel.DataAnnotations;

namespace Oversr.Model.ViewModel
{
    public class NewStyleVM
    {
        [Required]
        public string Number { get; set; }

        [Required]
        public string Name { get; set; }        

        [Required]
        public DesignerVM Designer { get; set; }
    }
}