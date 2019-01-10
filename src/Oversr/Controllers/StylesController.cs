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
    public class StylesController : Controller
    {
        private readonly IInventoryService _inventoryService;
        private readonly IMapper _mapper;

        public StylesController(IInventoryService inventoryService, IMapper mapper)
        {
            _inventoryService = inventoryService;
            _mapper = mapper;
        }

        // api/Styles/
        [HttpGet("{getEnabledOnly}")]
        public ActionResult Get(bool getEnabledOnly)
        {
            try
            {
                ICollection<Style> styles = _inventoryService.GetStyles(getEnabledOnly);

                if (styles == null || styles.Count == 0)
                {
                    return Ok(new List<StyleVM>());
                }

                return Ok(styles.Select(x => _mapper.Map<StyleVM>(x)));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
                
        }

        // api/Styles/Designer/{designerId}/{getEnabledOnly}
        [HttpGet("Designer/{designerId}/{getEnabledOnly}")]
        public ActionResult GetByDesigner(string designerId, bool getEnabledOnly)
        {
            try
            {
                ICollection<Style> styles = _inventoryService.GetStylesByDesigner(Guid.Parse(designerId), getEnabledOnly);

                if (styles == null || styles.Count == 0)
                {
                    return Ok(new List<StyleVM>());
                }

                return Ok(styles.Select(x => _mapper.Map<StyleVM>(x)));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // api/Styles/Create
        [HttpPost("[action]")]
        public ActionResult Create([FromBody] NewStyleVM vm)
        {
            if (!ModelState.IsValid)
            {
                return Ok(ModelState.GetAllErrors());
            }

            try
            {
                if (vm.Designer == null)
                {
                    return Ok("A designer is required");
                }

                if (string.IsNullOrWhiteSpace(vm.Number))
                {
                    return Ok("A number is required");
                }

                var styles = _inventoryService.GetStyles(false);

                var designerId = Guid.Parse(vm.Designer.Id);
                if (styles.Any(x => x.Designer.Id == designerId && x.Number == vm.Number))
                {
                    return Ok("A style with this designer and number already exists");
                }

                Designer designer = _inventoryService.GetDesigner(designerId);
                _inventoryService.AddStyle(designer, vm.MsrpPrice, vm.WholesalePrice, vm.Number, vm.Name);
                return Ok();
            }
            catch (FormatException)
            {
                return StatusCode(500, "Could not parse Id");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }            
        }

        // api/Styles/Edit
        [HttpPost("[action]")]
        public ActionResult Edit([FromBody] StyleVM vm)
        {
            if (!ModelState.IsValid)
            {
                return Ok(ModelState.GetAllErrors());
            }

            try
            {
                var allStyles = _inventoryService.GetStyles(false);

                if (!allStyles.Any(x => x.Id == Guid.Parse(vm.Id)))
                {
                    return Ok("A style with this Id is not found");
                }

                if (allStyles.Where(x => x.Id != Guid.Parse(vm.Id)).Any(x => x.Number == vm.Number))
                {
                    return Ok("A style with this number already exists");
                }

                var style = _mapper.Map<Style>(vm);                
                _inventoryService.EditStyle(style);

                return Ok();
            }
            catch (FormatException)
            {
                return StatusCode(500, "Could not parse Id");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }            
        }
    }
}
