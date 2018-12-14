using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Oversr.Model.ViewModel;

namespace Oversr.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class SampleInventoryController : Controller
    {
        [HttpPost]
        public JsonResult Create([FromBody] SampleInventoryItemVM vm)
        {
            throw new NotImplementedException();
        }
    }
}
