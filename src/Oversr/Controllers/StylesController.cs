using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Oversr.Model.Entities;
using Oversr.Model.ViewModel;
using Oversr.Services;

namespace Oversr.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class StylesController : Controller
    {
        private readonly IInventoryService _inventoryService;

        public StylesController(IInventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }

        // api/Styles/
        [HttpGet]
        public IEnumerable<StyleVM> GetEnabled()
        {
            IEnumerable<StyleVM> styles = _inventoryService.GetEnabledStyles()
                .Select(x => new StyleVM()
                {
                    Id = x.Id.ToString("N"),
                    Designer = new DesignerVM() { Id = x.Designer.Id.ToString("N"), Created = x.Designer.Created, Name = x.Designer.Name },
                    Created = x.Created,
                    Name = x.Name,
                    Number = x.Number
                });

            return styles;
        }

        // api/Styles/Create
        [HttpPost("[action]")]
        public ActionResult Create([FromBody] StyleVM vm)
        {
            if (string.IsNullOrWhiteSpace(vm.Number) || vm.Designer == null)
            {
                return BadRequest("A style number and designer is required");
            }

            var styles = _inventoryService.GetAllStyles();

            var designerId = Guid.Parse(vm.Designer.Id);
            if (styles.Any(x => x.Designer.Id == designerId && x.Number == vm.Number))
            {                
                return BadRequest("A style with this designer and number already exists");
            }

            Designer designer = _inventoryService.GetDesigner(designerId);
            _inventoryService.AddStyle(designer, vm.Number, vm.Name);
            return Ok();
        }

        // api/Styles/Delete
        [HttpPost("[action]")]
        public ActionResult Delete([FromBody] StyleVM vm)
        {
            if (string.IsNullOrWhiteSpace(vm.Id))
            {
                return BadRequest("Style ID is required");
            }

            var id = Guid.Parse(vm.Id);
            _inventoryService.DeleteStyle(id);
            return Ok();
        }
    }
}
