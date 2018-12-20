using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Oversr.Data;
using Oversr.Model.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Oversr.Services
{
    public class InventoryService : ServiceBase, IInventoryService
    {
        public InventoryService(IConfiguration config, ApplicationDbContext dbContext)
            :base(config, dbContext)
        {
        }

        #region designers
        public ICollection<Designer> GetAllDesigners()
        {
            return base.GetAllActive<Designer>();
        }

        public void AddDesigner(string name)
        {
            base.Add<Designer>(new Designer() { Name = name });
        }

        public void DeleteDesigner(Guid id)
        {
            base.Delete<Designer>(id);
        }
        #endregion

        #region styles
        public ICollection<Style> GetAllStyles()
        {
            return base.GetAllActive<Style>();
        }

        public Style GetStyleById(Guid id)
        {
            return base.GetById<Style>(id);
        }

        public void AddStyle(string number, string name = null)
        {
            base.Add<Style>(new Style() { Number = number, Name = name });
        }

        public void DeleteStyle(Guid id)
        {
            base.Delete<Style>(id);
        }
        #endregion

        #region statuses
        public ICollection<SampleInventoryStatusLookup> GetAllStatuses()
        {
            return base.GetAllLookups<SampleInventoryStatusLookup>();
        }
        #endregion

        #region inventory items
        public ICollection<SampleInventoryItem> GetSampleInventoryItemsByStatus(SampleInventoryStatus status)
        {
            return _dbContext.SampleInventoryItems
                .Include(x => x.Style)
                    .ThenInclude(x => x.Designer)
                .Include(x => x.InventoryStatus)
                .Where(x => x.InventoryStatus.Id == (int)status)
                .ToList();
        }

        public ICollection<SampleInventoryItem> GetAllSampleInventoryItems()
        {
            return _dbContext.SampleInventoryItems
                .Include(x => x.Style)
                    .ThenInclude(x => x.Designer)
                .Include(x => x.InventoryStatus)
                .ToList();
        }

        public void AddSampleInventoryItem(
            Style style,
            SampleInventoryStatus inventoryStatus,
            string size,
            string color,
            int wholesalePrice,
            int msrpPrice,
            DateTime dateOrdered,
            DateTime? dateRecieved)
        {
            var item = new SampleInventoryItem()
            {
                Style = style,
                Size = size,
                Color = color,
                WholesalePrice = wholesalePrice,
                MsrpPrice = msrpPrice,
                DateOrdered = dateOrdered,
                DateRecieved = dateRecieved,
                InventoryStatusId = (int)inventoryStatus
            };

            base.Add<SampleInventoryItem>(item);
        }
        #endregion
    }
}
