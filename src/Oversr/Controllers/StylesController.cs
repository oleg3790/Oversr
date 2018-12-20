using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Oversr.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class StylesController : Controller
    {
        [HttpGet]
        public IEnumerable<string> Index()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpPost]
        public void Create([FromBody] string value)
        {
        }

        [HttpPost]
        public void Delete([FromBody] string value)
        {
        }
    }
}
