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

                return Ok(styles.Select(x => new StyleVM()
                {
                    Id = x.Id.ToString("N"),
                    Designer = new DesignerVM()
                    {
                        Id = x.Designer.Id.ToString("N"),
                        Created = x.Designer.Created,
                        Name = x.Designer.Name,
                        Deleted = x.Designer.Deleted
                    },
                    Created = x.Created,
                    Name = x.Name,
                    Number = x.Number,
                    Discontinued = x.Discontinued,
                    Deleted = x.Deleted
                }));
            }
            catch (Exception ex)
            {
                return StatusCode(500);
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

                return Ok(styles.Select(x => new StyleVM()
                {
                    Id = x.Id.ToString("N"),
                    Designer = new DesignerVM()
                    {
                        Id = x.Designer.Id.ToString("N"),
                        Created = x.Designer.Created,
                        Name = x.Designer.Name,
                        Deleted = x.Designer.Deleted
                    },
                    Created = x.Created,
                    Name = x.Name,
                    Number = x.Number,
                    Discontinued = x.Discontinued,
                    Deleted = x.Deleted
                }));
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }

        // api/Styles/Create
        [HttpPost("[action]")]
        public ActionResult Create([FromBody] NewStyleVM vm)
        {
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
                _inventoryService.AddStyle(designer, vm.Number, vm.Name);
                return Ok();
            }
            catch (FormatException)
            {
                return StatusCode(500, "Could not parse Id");
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }            
        }

        // api/Styles/Edit
        [HttpPost("[action]")]
        public ActionResult Edit([FromBody] StyleVM vm)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(vm.Id))
                {
                    return BadRequest("Style ID is required");
                }

                var style = new Style()
                {
                    Id = Guid.Parse(vm.Id),
                    Created = vm.Created,
                    LastModified = DateTime.Now,
                    Number = vm.Number,
                    Name = vm.Name,
                    Deleted = vm.Deleted,
                    Discontinued = vm.Discontinued,
                    Designer = _inventoryService.GetDesigner(Guid.Parse(vm.Designer.Id)),
                };                

                _inventoryService.EditStyle(style);
                return Ok();
            }
            catch (FormatException)
            {
                return StatusCode(500, "Could not parse Id");
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }            
        }
    }
}
