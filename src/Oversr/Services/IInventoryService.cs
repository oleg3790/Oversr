using Oversr.Model.Entities;
using System;
using System.Collections.Generic;

namespace Oversr.Services
{
    public interface IInventoryService
    {
        // Designers
        ICollection<Designer> GetDesigners(bool enabledOnly);
        Designer GetDesigner(Guid id);
        void AddDesigner(string name);
        void EditDesigner(Designer designer);
        void DeleteDesigner(Guid id);        

        // Styles
        ICollection<Style> GetStyles(bool enabledOnly);
        Style GetStyleById(Guid id);
        void AddStyle(Designer designer, string number, string name = null);
        void EditStyle(Style style);
        void DeleteStyle(Guid id);

        // Status
        ICollection<SampleInventoryStatusLookup> GetAllStatuses();

        // Inventory Items
        ICollection<SampleInventoryItem> GetSampleInventoryItems(bool enabledOnly);
        ICollection<SampleInventoryItem> GetSampleInventoryItemsByStatus(SampleInventoryStatus status, bool enabledOnly);
        void AddSampleInventoryItem(Style style, SampleInventoryStatus inventoryStatus, string size, string color, int wholesalePrice, int msrpPrice, DateTime dateOrdered, DateTime? dateRecieved);
        void EditSampleInventoryItem(SampleInventoryItem sampleInventoryItem);
        void DeleteSampleInventoryItem(Guid id);
    }
}
