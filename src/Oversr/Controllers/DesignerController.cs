using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Oversr.Model;
using Oversr.Services;

namespace Oversr.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    public class DesignerController : Controller
    {
        private readonly IInventoryService _inventoryService;

        public DesignerController(IInventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }

        [HttpGet]
        public IEnumerable<Designer> Get()
        {
            return _inventoryService.GetAllDesigners();
        }

        // POST: api/Designer
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }
    }
}
