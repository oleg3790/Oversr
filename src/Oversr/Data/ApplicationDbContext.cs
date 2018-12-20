using Microsoft.EntityFrameworkCore;
using Oversr.Model.Entities;

namespace Oversr.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Designer> Designers { get; set; }
        public DbSet<Style> Styles { get; set; }
        public DbSet<SampleInventoryStatusLookup> SampleInventoryStatuses {get; set;}
        public DbSet<SampleInventoryItem> SampleInventoryItems { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> opts)
            : base(opts)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>(x =>
            {
                x.Property(e => e.Id).HasDefaultValueSql("newid()");
                x.Property(e => e.Created).HasDefaultValueSql("getdate()");
            });

            builder.Entity<Designer>(x =>
            {
                x.Property(e => e.Id).HasDefaultValueSql("newid()");
                x.Property(e => e.Created).HasDefaultValueSql("getdate()");
                x.Property(e => e.LastModified).HasDefaultValueSql("getdate()");
                x.Property(e => e.Deleted).HasDefaultValueSql("0");
            });

            builder.Entity<Style>(x =>
            {
                x.Property(e => e.Id).HasDefaultValueSql("newid()");
                x.Property(e => e.Created).HasDefaultValueSql("getdate()");
                x.Property(e => e.LastModified).HasDefaultValueSql("getdate()");
                x.Property(e => e.Deleted).HasDefaultValueSql("0");
            });

            builder.Entity<SampleInventoryStatusLookup>().HasData(SampleInventoryStatusLookup.Seed());

            builder.Entity<SampleInventoryItem>(x =>
            {
                x.Property(e => e.Id).HasDefaultValueSql("newid()");
                x.Property(e => e.Created).HasDefaultValueSql("getdate()");
                x.Property(e => e.LastModified).HasDefaultValueSql("getdate()");
            });
        }
    }
}
