namespace Oversr.Model.Entities
{
    public enum SampleInventoryStatus
    {
        InStock = 1,        
        InTransit = 2,
        Sold = 3
    }

    public class SampleInventoryStatusLookup : LookupBase
    {
        public static SampleInventoryStatusLookup[] Seed() => Seed<SampleInventoryStatusLookup, SampleInventoryStatus>();
    }
}
