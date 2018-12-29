using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
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
        private readonly IMapper _mapper;

        public DesignersController(IInventoryService inventoryService, IMapper mapper)
        {
            _inventoryService = inventoryService;
            _mapper = mapper;
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

                return Ok(designers.Select(x => _mapper.Map<DesignerVM>(x)));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
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
                return StatusCode(500, ex.Message);
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
                var designers = _inventoryService.GetDesigners(false);

                if (!designers.Any(x => x.Id == Guid.Parse(vm.Id)))
                {
                    return Ok("A designer with this Id does not exist");
                }

                if (designers.Where(x => x.Id != Guid.Parse(vm.Id)).Any(x => x.Name.ToLower() == vm.Name.ToLower()))
                {
                    return Ok("A designer with this name already exists");
                }

                var designer = _mapper.Map<Designer>(vm);
                _inventoryService.EditDesigner(designer);

                return Ok();
            }
            catch (FormatException)
            {
                return StatusCode(500, "Designer ID is in an incorrect format");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
