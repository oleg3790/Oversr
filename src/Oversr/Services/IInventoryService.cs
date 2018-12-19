using Oversr.Model;
using Oversr.Model.ViewModel;
using System.Collections.Generic;

namespace Oversr.Services
{
    public interface IInventoryService
    {
        ICollection<Designer> GetAllDesigners();
        void AddDesigner(string name);

        ICollection<SampleInventoryStatusLookup> GetAllStatuses();
        ICollection<SampleInventoryItem> GetAllSampleInventoryItems();
        ICollection<SampleInventoryItem> GetSampleInventoryItemsByStatus(SampleInventoryStatus status);
        void AddSampleInventoryItem(SampleInventoryItemVM vm);
    }
}
