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

        public void EditDesigner(Designer designer)
        {
            var dbItem = base.GetById<Designer>(designer.Id);

            dbItem.LastModified = DateTime.Now;
            dbItem.Name = designer.Name;
            dbItem.Deleted = designer.Deleted;
            _dbContext.SaveChanges();
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

        public ICollection<Style> GetStylesByDesigner(Guid designerId, bool enabledOnly)
        {
            return enabledOnly
                ? this.QueryAllStylesByDesigner(designerId).Where(x => x.Deleted.Equals(false) && x.Designer.Deleted.Equals(false)).ToList()
                : this.QueryAllStylesByDesigner(designerId).ToList();
        }

        public Style GetStyleById(Guid id)
        {
            return this.QueryAllStyles()
                .FirstOrDefault(x => x.Id.Equals(id));
        }

        public void AddStyle(Designer designer, int msrpPrice, int wholesalePrice, string number, string name = null)
        {
            base.Add<Style>(new Style() { Designer = designer, MsrpPrice = msrpPrice, WholesalePrice = wholesalePrice, Number = number, Name = name });
        }

        public void EditStyle(Style style)
        {
            var dbItem = base.GetById<Style>(style.Id);

            dbItem.LastModified = DateTime.Now;
            dbItem.DesignerId = style.Designer.Id;
            dbItem.Number = style.Number;
            dbItem.Name = style.Name;
            dbItem.MsrpPrice = style.MsrpPrice;
            dbItem.WholesalePrice = style.WholesalePrice;
            dbItem.Discontinued = style.Discontinued;
            dbItem.Deleted = style.Deleted;

            _dbContext.SaveChanges();
        }

        private IQueryable<Style> QueryAllStylesByDesigner(Guid designerId)
        {
            return this.QueryAllStyles().Where(x => x.Designer.Id == designerId);
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
            SampleInventoryStatusLookup inventoryStatus,
            string size,
            string color,
            DateTime dateOrdered,
            DateTime? dateRecieved)
        {
            var item = new SampleInventoryItem()
            {
                Style = style,
                Size = size,
                Color = color,
                DateOrdered = dateOrdered,
                DateRecieved = dateRecieved,
                InventoryStatus = inventoryStatus
            };

            base.Add<SampleInventoryItem>(item);
        }

        public void EditSampleInventoryItem(SampleInventoryItem sampleInventoryItem)
        {
            var dbItem = base.GetById<SampleInventoryItem>(sampleInventoryItem.Id);

            dbItem.LastModified = DateTime.Now;
            dbItem.StyleId = sampleInventoryItem.Style.Id;
            dbItem.Size = sampleInventoryItem.Size;
            dbItem.Color = sampleInventoryItem.Color;
            dbItem.InventoryStatusId = sampleInventoryItem.InventoryStatus.Id;
            dbItem.DateOrdered = sampleInventoryItem.DateOrdered;
            dbItem.DateRecieved = sampleInventoryItem.DateRecieved;
            dbItem.Deleted = sampleInventoryItem.Deleted;

            _dbContext.SaveChanges();
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
