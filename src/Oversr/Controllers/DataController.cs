using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Oversr.Controllers
{
    [Route("api/[controller]")]
    public class DataController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<object> Index()
        {
            throw new NotImplementedException();
        }
    }
}
