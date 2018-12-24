﻿using System;
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
        public ICollection<Designer> GetDesigners(bool enabledOnly)
        {
            return enabledOnly ? base.GetAllEnabled<Designer>() : base.GetAllEntities<Designer>();
        }

        public Designer GetDesigner(Guid id)
        {
            return base.GetById<Designer>(id);
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
        public ICollection<Style> GetStyles(bool enabledOnly)
        {
            return enabledOnly
                ? this.QueryAllStyles().Where(x => x.Deleted.Equals(false) && x.Designer.Deleted.Equals(false)).ToList()
                : this.QueryAllStyles().ToList();
            ;
        }

        public Style GetStyleById(Guid id)
        {
            return this.QueryAllStyles()
                .FirstOrDefault(x => x.Id.Equals(id));
        }

        public void AddStyle(Designer designer, string number, string name = null)
        {
            base.Add<Style>(new Style() { Designer = designer, Number = number, Name = name });
        }

        public void DeleteStyle(Guid id)
        {
            base.Delete<Style>(id);
        }

        private IQueryable<Style> QueryAllStyles()
        {
            return _dbContext.Styles
                .Include(x => x.Designer);
        }
        #endregion

        #region statuses
        public ICollection<SampleInventoryStatusLookup> GetAllStatuses()
        {
            return base.GetAllLookups<SampleInventoryStatusLookup>();
        }
        #endregion

        #region inventory items
        public ICollection<SampleInventoryItem> GetSampleInventoryItems(bool enabledOnly)
        {
            return enabledOnly
                ? this.QueryAllSampleInventoryItems()
                    .Where(x => x.Deleted.Equals(false)
                        && x.Style.Deleted.Equals(false)
                        && x.Style.Designer.Deleted.Equals(false))
                    .ToList()
                : this.QueryAllSampleInventoryItems().ToList();                
        }

        public ICollection<SampleInventoryItem> GetSampleInventoryItemsByStatus(SampleInventoryStatus status, bool enabledOnly)
        {
            return enabledOnly
                ? this.QueryAllSampleInventoryItems()
                    .Where(x => x.InventoryStatus.Id.Equals((int)status)
                        && x.Deleted.Equals(false)
                        && x.Style.Deleted.Equals(false)
                        && x.Style.Designer.Deleted.Equals(false))
                    .ToList()
                : this.QueryAllSampleInventoryItems()
                    .Where(x => x.InventoryStatus.Id.Equals((int)status))
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

        public void DeleteSampleInventoryItem(Guid id)
        {
            base.Delete<SampleInventoryItem>(id);
        }

        private IQueryable<SampleInventoryItem> QueryAllSampleInventoryItems()
        {
            return _dbContext.SampleInventoryItems
                .Include(x => x.Style)
                    .ThenInclude(x => x.Designer)
                .Include(x => x.InventoryStatus);
        }
        #endregion
    }
}
