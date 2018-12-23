using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Linq;

namespace Oversr.Model.Extensions
{
    public static class Extensions
    {
        /// <summary>
        /// Gets an aggregate of all errors seperated by pipe
        /// </summary>
        /// <param name="modelState"></param>
        /// <returns></returns>
        public static string GetAllErrors(this ModelStateDictionary modelState)
        {
            if (!modelState.IsValid)
            {
                return modelState.Values.SelectMany(x => x.Errors.Select(y => y.ErrorMessage)).Aggregate((a, b) => string.Format("{0}|{1}", a, b));
            }
            else
            {
                return null;
            }
        }
    }
}
