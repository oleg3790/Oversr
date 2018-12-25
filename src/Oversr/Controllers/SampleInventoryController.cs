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
    public class SampleInventoryController : Controller
    {
        private readonly IInventoryService _inventoryService;

        public SampleInventoryController(IInventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }

        // api/SampleInventory/Statuses
        [HttpGet("[action]")]
        public ActionResult Statuses()
        {
            try
            {
                return Ok(_inventoryService.GetAllStatuses());
            }
            catch
            {
                return StatusCode(500, "Could not return statuses");
            }
        }

        // api/SampleInventory
        [HttpGet("{enabledOnly}")]
        public ActionResult Get(bool enabledOnly)
        {
            try
            {
                ICollection<SampleInventoryItem> items = _inventoryService.GetSampleInventoryItems(enabledOnly);

                if (items == null || items.Count == 0)
                {
                    return Ok(new List<SampleInventoryItemVM>());
                }

                return Ok(items.Select(x =>                
                    new SampleInventoryItemVM()
                    {
                        Id = x.Id.ToString("N"),
                        Created = x.Created,
                        Size = x.Size,
                        Color = x.Color,
                        WholesalePrice = x.WholesalePrice,
                        MsrpPrice = x.MsrpPrice,
                        DateOrdered = x.DateOrdered,
                        DateRecieved = x.DateRecieved,
                        InventoryStatus = Enum.Parse<SampleInventoryStatus>(x.InventoryStatus.Name),
                        Deleted = x.Deleted,                        
                        Style = new StyleVM()
                        {
                            Id = x.Style.Id.ToString("N"),
                            Designer = new DesignerVM()
                            {
                                Id = x.Style.Designer.Id.ToString("N"),
                                Created = x.Style.Designer.Created,
                                Name = x.Style.Designer.Name,
                                Deleted = x.Style.Designer.Deleted
                            },
                            Created = x.Style.Created,
                            Name = x.Style.Name,
                            Number = x.Style.Number,
                            Discontinued = x.Style.Discontinued,
                            Deleted = x.Style.Deleted
                        }
                    }
                ));
            }
            catch
            {
                return StatusCode(500);
            }
        }

        // api/SampleInventory/{statusString}/{enabledOnly}
        [HttpGet("{statusString}/{enabledOnly}")]
        public ActionResult GetByStatus(string statusString, bool enabledOnly)
        {
            try
            {
                SampleInventoryStatus status;
                bool isStatusValid = Enum.TryParse(statusString, out status);

                if (!isStatusValid)
                {
                    return BadRequest("Invalid status");
                }

                ICollection<SampleInventoryItem> items = _inventoryService.GetSampleInventoryItemsByStatus(status, enabledOnly);

                return Ok(items.Select(x =>
                    new SampleInventoryItemVM()
                    {
                        Id = x.Id.ToString("N"),
                        Created = x.Created,
                        Size = x.Size,
                        Color = x.Color,
                        WholesalePrice = x.WholesalePrice,
                        MsrpPrice = x.MsrpPrice,
                        DateOrdered = x.DateOrdered,
                        DateRecieved = x.DateRecieved,
                        InventoryStatus = Enum.Parse<SampleInventoryStatus>(x.InventoryStatus.Name),
                        Deleted = x.Deleted,
                        Style = new StyleVM()
                        {
                            Id = x.Style.Id.ToString("N"),
                            Designer = new DesignerVM()
                            {
                                Id = x.Style.Designer.Id.ToString("N"),
                                Created = x.Style.Designer.Created,
                                Name = x.Style.Designer.Name,
                                Deleted = x.Style.Designer.Deleted
                            },
                            Created = x.Style.Created,
                            Name = x.Style.Name,
                            Number = x.Style.Number,
                            Discontinued = x.Style.Discontinued,
                            Deleted = x.Style.Deleted
                        }
                    }
                ));
            }
            catch
            {
                return StatusCode(500);
            }

        }

        // api/SampleInventory/Create
        [HttpPost("[action]")]
        public ActionResult Create([FromBody] NewSampleInventoryItemVM vm)
        {
            if (!ModelState.IsValid)
            {
                return Ok(ModelState.GetAllErrors());
            }

            try
            {
                var styleId = Guid.Parse(vm.Style.Id);
                var style = _inventoryService.GetStyleById(styleId);

                _inventoryService.AddSampleInventoryItem(
                    style,
                    vm.InventoryStatus,
                    vm.Size,
                    vm.Color,
                    vm.WholesalePrice,
                    vm.MsrpPrice,
                    vm.DateOrdered,
                    vm.DateRecieved);

                return Ok();
            }
            catch (FormatException)
            {
                return StatusCode(500, "Could not parse Id");
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpPost("[action]")]
        public ActionResult Delete([FromBody] SampleInventoryItemVM vm)
        {
            if (!ModelState.IsValid)
            {
                return Ok(ModelState.GetAllErrors());
            }

            try
            {
                var itemId = Guid.Parse(vm.Id);
                _inventoryService.DeleteSampleInventoryItem(itemId);
                return Ok();
            }
            catch (FormatException)
            {
                return StatusCode(500, "Could not parse Id");
            }
            catch
            {
                return StatusCode(500, "Error encountered while trying to delete sample inventory item");
            }
        }
    }
}
