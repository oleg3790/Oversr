using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Oversr.Model
{
    public class LookupBase
    {
        [Key]
        public int Id { get; set; }

        [MinLength(2), MaxLength(100)]
        public string Name { get; set; }

        protected static T[] Seed<T, TEnum>() where T : LookupBase, new()
        {
            List<T> data = new List<T>();

            foreach (var x in Enum.GetValues(typeof(TEnum)))
                data.Add(new T() { Id = (int)x, Name = x.ToString() });

            return data.ToArray();
        }
    }
}
