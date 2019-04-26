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
    public class SampleInventoryController : Controller
    {
        private readonly IInventoryService _inventoryService;
        private readonly IMapper _mapper;

        public SampleInventoryController(IInventoryService inventoryService, IMapper mapper)
        {
            _inventoryService = inventoryService;
            _mapper = mapper;
        }

        // api/SampleInventory/Statuses
        [HttpGet("Statuses")]
        public ActionResult GetStatuses()
        {
            try
            {
                return Ok(_inventoryService.GetAllStatuses());
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // api/SampleInventory?enabledOnly={bool}
        [HttpGet]
        public ActionResult Get(bool enabledOnly)
        {
            try
            {
                ICollection<SampleInventoryItem> items = _inventoryService.GetSampleInventoryItems(enabledOnly);

                if (items == null || items.Count == 0)
                {
                    return Ok(new List<SampleInventoryItemVM>());
                }

                return Ok(items.Select(x => _mapper.Map<SampleInventoryItemVM>(x)));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // api/SampleInventory?status={status}
        [HttpGet]
        public ActionResult GetByStatus(string status)
        {
            try
            {
                SampleInventoryStatus sampleInventoryStatus;
                bool isStatusValid = Enum.TryParse(status, out sampleInventoryStatus);

                if (!isStatusValid)
                {
                    return BadRequest("Invalid status");
                }

                ICollection<SampleInventoryItem> items = _inventoryService.GetSampleInventoryItemsByStatus(sampleInventoryStatus, true);
                return Ok(items.Select(x => _mapper.Map<SampleInventoryItemVM>(x)));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        // api/SampleInventory
        [HttpPost]
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

                var existingItems = _inventoryService.GetSampleInventoryItems(false);

                if (existingItems.Any(x => x.Style.Equals(style) 
                    && x.Size.Equals(vm.Size)
                    && x.Color.Equals(vm.Color)))
                {
                    return Ok("An item with this style, size, and color already exists");
                }

                _inventoryService.AddSampleInventoryItem(
                    style,
                    vm.InventoryStatus,
                    vm.Size,
                    vm.Color,
                    vm.DateOrdered,
                    vm.DateRecieved);

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

        // api/SampleInventory
        [HttpPut]
        public ActionResult Edit([FromBody] SampleInventoryItemVM vm)
        {
            if (!ModelState.IsValid)
            {
                return Ok(ModelState.GetAllErrors());
            }

            try
            {
                var sampleInventoryItem = _mapper.Map<SampleInventoryItem>(vm);
                _inventoryService.EditSampleInventoryItem(sampleInventoryItem);

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
