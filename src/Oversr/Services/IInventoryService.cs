using Oversr.Model;
using System.Collections.Generic;

namespace Oversr.Services
{
    public interface IInventoryService
    {
        ICollection<Designer> GetAllDesigners();
        void AddDesigner(string name);

        ICollection<SampleInventoryStatusLookup> GetAllStatuses(); 
    }
}
