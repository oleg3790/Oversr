namespace Oversr.Model.Entities
{
    public enum SampleInventoryStatus
    {
        Discontinued = 1,
        Active = 2,        
        InTransit = 3,
        Sold = 4
    }

    public class SampleInventoryStatusLookup : LookupBase
    {
        public static SampleInventoryStatusLookup[] Seed() => Seed<SampleInventoryStatusLookup, SampleInventoryStatus>();
    }
}
