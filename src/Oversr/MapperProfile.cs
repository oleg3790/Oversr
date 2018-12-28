using AutoMapper;
using Oversr.Model.Entities;
using Oversr.Model.ViewModel;
using System;

namespace Oversr
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            // Generic conversions
            CreateMap<string, Guid>().ConvertUsing(x => Guid.Parse(x));
            CreateMap<Guid, string>().ConvertUsing(x => x.ToString("N"));
            CreateMap<SampleInventoryStatusLookup, SampleInventoryStatus>().ConstructUsing(x => Enum.Parse<SampleInventoryStatus>(x.Name));
            CreateMap<SampleInventoryStatus, SampleInventoryStatusLookup>().ConstructUsing(x => new SampleInventoryStatusLookup() { Id = (int)x, Name = x.ToString() });

            // Specific conversions
            CreateMap<Designer, DesignerVM>();
            CreateMap<DesignerVM, Designer>();
            CreateMap<Style, StyleVM>();
            CreateMap<StyleVM, Style>();
            CreateMap<SampleInventoryItem, SampleInventoryItemVM>();
            CreateMap<SampleInventoryItemVM, SampleInventoryItem>();
        }
    }
}
