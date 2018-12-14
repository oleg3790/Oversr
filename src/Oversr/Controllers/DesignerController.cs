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
        public ActionResult Post([FromBody] string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return BadRequest("The designer name cannot be null or empty");
            }

            var designers = _inventoryService.GetAllDesigners();

            if (designers.Any(x => x.Name.ToLower() == name.ToLower()))
            {
                return BadRequest("A designer with this name already exists");
            }

            _inventoryService.AddDesigner(name);
            return Ok();
        }
    }
}
