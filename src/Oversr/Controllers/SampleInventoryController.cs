using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Oversr.Model.Entities;
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

        [HttpGet("[action]")]
        public IEnumerable<SampleInventoryStatusLookup> Statuses()
        {
            return _inventoryService.GetAllStatuses();
        }

        [HttpGet]
        public IEnumerable<SampleInventoryItem> Index()
        {
            return _inventoryService.GetAllSampleInventoryItems();
        }

        [HttpGet("{statusString}")]
        public IEnumerable<SampleInventoryItem> Index(string statusString)
        {
            SampleInventoryStatus status;
            bool isStatusValid = Enum.TryParse(statusString, out status);

            if (!isStatusValid)
            {
                return _inventoryService.GetAllSampleInventoryItems();
            }

            return _inventoryService.GetSampleInventoryItemsByStatus(status);
        }

        [HttpPost("[action]")]
        public ActionResult Create([FromBody] SampleInventoryItemVM vm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("An error was encountered, the passed data was invalid");
            }

            if (vm.Style == null)
            {
                return BadRequest("No style has been passed");
            }

            var style = _inventoryService.GetStyleById(Guid.Parse(vm.Style.Id));
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
    }
}
