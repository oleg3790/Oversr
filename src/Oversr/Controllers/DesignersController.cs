using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Oversr.Model.Entities;
using Oversr.Model.Extensions;
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

        // api/Designers/
        [HttpGet]
        public ActionResult GetEnabled()
        {
            try
            {
                ICollection<Designer> designers = _inventoryService.GetEnabledDesigners();

                if (designers == null || designers.Count == 0)
                {
                    return Ok();
                }

                return Ok(designers.Select(x => new DesignerVM() { Id = x.Id.ToString("N"), Created = x.Created, Name = x.Name }));
            }
            catch
            {
                return StatusCode(500);
            }
        }

        // api/Designers/Create
        [HttpPost("[action]")]
        public ActionResult Create([FromBody] NewDesignerVM vm)
        {
            if (!ModelState.IsValid)
            {
                return Ok(ModelState.GetAllErrors());
            }

            var designers = _inventoryService.GetAllDesigners();

            if (designers.Any(x => x.Name.ToLower() == vm.Name.ToLower()))
            {
                return Ok("A designer with this name already exists");
            }

            _inventoryService.AddDesigner(vm.Name);
            return Ok();
        }

        // api/Designers/Delete
        [HttpPost("[action]")]
        public ActionResult Delete([FromBody] DesignerVM vm)
        {
            if (!ModelState.IsValid)
            {
                return Ok(ModelState.GetAllErrors());
            }

            try
            {
                var designerId = Guid.Parse(vm.Id);
                _inventoryService.DeleteDesigner(designerId);
                return Ok();
            }
            catch (FormatException)
            {
                return StatusCode(500, "Designer ID is in an incorrect format");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }                       
        }
    }
}
