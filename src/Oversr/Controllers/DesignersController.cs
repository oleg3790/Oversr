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

        // api/Designers/{getEnabledOnly}
        [HttpGet("{getEnabledOnly}")]
        public ActionResult Get(bool getEnabledOnly)
        {
            try
            {
                ICollection<Designer> designers = _inventoryService.GetDesigners(getEnabledOnly);

                if (designers == null || designers.Count == 0)
                {
                    // return empty designer vm list
                    return Ok(new List<DesignerVM>());
                }

                return Ok(designers.Select(x => new DesignerVM() { Id = x.Id.ToString("N"), Created = x.Created, Name = x.Name, Deleted = x.Deleted }));
            }
            catch (Exception ex)
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

            try
            {
                var designers = _inventoryService.GetDesigners(false);

                if (designers.Any(x => x.Name.ToLower() == vm.Name.ToLower()))
                {
                    return Ok("A designer with this name already exists");
                }

                _inventoryService.AddDesigner(vm.Name);
                return Ok();
            } 
            catch (Exception ex)
            {
                return StatusCode(500);
            }            
        }

        // api/Designer/Edit
        [HttpPost("[action]")]
        public ActionResult Edit([FromBody] DesignerVM vm)
        {
            if (!ModelState.IsValid)
            {
                return Ok(ModelState.GetAllErrors());
            }

            try
            {
                var existingDesigners = _inventoryService.GetDesignersExceptThis(Guid.Parse(vm.Id));

                if (existingDesigners.Any(x => x.Name.ToLower() == vm.Name.ToLower()))
                {
                    return Ok("A designer with this name already exists");
                }

                var designer = new Designer()
                {
                    Id = Guid.Parse(vm.Id),
                    Created = vm.Created,
                    LastModified = DateTime.Now,
                    Name = vm.Name,
                    Deleted = vm.Deleted
                };

                _inventoryService.EditDesigner(designer);
                return Ok();
            }
            catch (FormatException)
            {
                return StatusCode(500, "Designer ID is in an incorrect format");
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }
    }
}
