﻿using Oversr.Model.Entities;
using System;
using System.Collections.Generic;

namespace Oversr.Services
{
    public interface IInventoryService
    {
        // Designers
        ICollection<Designer> GetAllDesigners();
        ICollection<Designer> GetEnabledDesigners();
        Designer GetDesigner(Guid id);
        void AddDesigner(string name);
        void DeleteDesigner(Guid id);

        // Styles
        ICollection<Style> GetAllStyles();
        ICollection<Style> GetEnabledStyles();
        Style GetStyleById(Guid id);
        void AddStyle(Designer designer, string number, string name = null);
        void DeleteStyle(Guid id);

        // Status
        ICollection<SampleInventoryStatusLookup> GetAllStatuses();

        // Inventory Items
        ICollection<SampleInventoryItem> GetAllSampleInventoryItems();
        ICollection<SampleInventoryItem> GetEnabledSampleInventoryItems();
        ICollection<SampleInventoryItem> GetEnabledSampleInventoryItemsByStatus(SampleInventoryStatus status);
        void AddSampleInventoryItem(Style style, SampleInventoryStatus inventoryStatus, string size, string color, int wholesalePrice, int msrpPrice, DateTime dateOrdered, DateTime? dateRecieved);
        void DeleteSampleInventoryItem(Guid id);
    }
}
