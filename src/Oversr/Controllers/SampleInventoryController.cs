using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Oversr.Model;
using Oversr.Model.ViewModel;
using Oversr.Services;

namespace Oversr.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class SampleInventoryController : Controller
    {
        private readonly IInventoryService _inventoryService;

        public SampleInventoryController(IInventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }

        [HttpGet]
        public IEnumerable<SampleInventoryStatusLookup> Statuses()
        {
            return _inventoryService.GetAllStatuses();
        }

        [HttpPost]
        public JsonResult Create([FromBody] SampleInventoryItemVM vm)
        {
            throw new NotImplementedException();
        }
    }
}
