using Oversr.Model.Entities;
using System;
using System.Collections.Generic;

namespace Oversr.Services
{
    public interface IInventoryService
    {
        // Designers
        ICollection<Designer> GetAllDesigners();
        void AddDesigner(string name);
        void DeleteDesigner(Guid id);

        // Styles
        ICollection<Style> GetAllStyles();
        Style GetStyleById(Guid id);
        void AddStyle(string number, string name = null);
        void DeleteStyle(Guid id);

        // Status
        ICollection<SampleInventoryStatusLookup> GetAllStatuses();

        // Inventory Items
        ICollection<SampleInventoryItem> GetAllSampleInventoryItems();
        ICollection<SampleInventoryItem> GetSampleInventoryItemsByStatus(SampleInventoryStatus status);
        void AddSampleInventoryItem(Style style, SampleInventoryStatus inventoryStatus, string size, string color, int wholesalePrice, int msrpPrice, DateTime dateOrdered, DateTime? dateRecieved);
    }
}
