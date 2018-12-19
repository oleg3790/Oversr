using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Oversr.Model;
using System.Linq;
using Oversr.Data;
using Oversr.Model.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace Oversr.Services
{
    public class InventoryService : IInventoryService
    {
        private readonly IConfiguration _config;
        private readonly ApplicationDbContext _dbContext;

        public InventoryService(IConfiguration config, ApplicationDbContext dbContext)
        {
            _config = config;
            _dbContext = dbContext;
        }               

        public ICollection<Designer> GetAllDesigners()
        {
            return _dbContext.Designers.ToList();
        }

        public void AddDesigner(string name)
        {
            _dbContext.Add(new Designer() { Name = name });
            _dbContext.SaveChanges();
        }

        public ICollection<SampleInventoryStatusLookup> GetAllStatuses()
        {
            return _dbContext.SampleInventoryStatuses.ToList();
        }

        public ICollection<SampleInventoryItem> GetSampleInventoryItemsByStatus(SampleInventoryStatus status)
        {
            return _dbContext.SampleInventoryItems
                .Include(x => x.Designer)
                .Include(x => x.InventoryStatus)
                .Where(x => x.InventoryStatus.Id == (int)status)                
                .ToList();
        }

        public ICollection<SampleInventoryItem> GetAllSampleInventoryItems()
        {
            return _dbContext.SampleInventoryItems
                .Include(x => x.Designer)
                .Include(x => x.InventoryStatus)
                .ToList();
        }

        public void AddSampleInventoryItem(SampleInventoryItemVM vm)
        {            
            var item = new SampleInventoryItem()
            {
                DesignerId = vm.Designer.Id,
                StyleNumber = vm.StyleNumber,
                StyleName = vm.StyleName,
                Size = vm.Size,
                Color = vm.Color,
                WholesalePrice = vm.WholesalePrice,
                MsrpPrice = vm.MsrpPrice,
                DateOrdered = vm.DateOrdered,
                DateRecieved = vm.DateRecieved,
                InventoryStatusId = (int)vm.InventoryStatus
            };

            _dbContext.Add(item);
            _dbContext.SaveChanges();
        }        
    }
}
