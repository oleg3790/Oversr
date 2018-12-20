using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Oversr.Model.ViewModel;
using Oversr.Services;

namespace Oversr.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class DesignersController : Controller
    {
        private readonly IInventoryService _inventoryService;

        public DesignersController(IInventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }

        [HttpGet]
        public IEnumerable<DesignerVM> Index()
        {
            IEnumerable<DesignerVM> designers = _inventoryService.GetAllDesigners()
                .Select(x => new DesignerVM() { Id = x.Id.ToString("N"), Created = x.Created, Name = x.Name });          

            return designers;
        }

        [HttpPost("[action]")]
        public ActionResult Create([FromBody] DesignerVM vm)
        {
            if (string.IsNullOrWhiteSpace(vm.Name) || vm == null)
            {
                return BadRequest("The designer name cannot be null or empty");
            }

            var designers = _inventoryService.GetAllDesigners();

            if (designers.Any(x => x.Name.ToLower() == vm.Name.ToLower()))
            {
                return BadRequest("A designer with this name already exists");
            }

            _inventoryService.AddDesigner(vm.Name);
            return Ok();
        }

        [HttpPost("[action]")]
        public ActionResult Delete([FromBody] DesignerVM vm)
        {
            if (!ModelState.IsValid)
            {
                BadRequest("Server error encountered, examine request parameters");
            }

            if (string.IsNullOrEmpty(vm.Id))
            {
                BadRequest("Designer ID is required");
            }

            var designerId = Guid.Parse(vm.Id);
            _inventoryService.DeleteDesigner(designerId);
            return Ok();
        }
    }
}
