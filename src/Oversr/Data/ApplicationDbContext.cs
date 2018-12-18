using Microsoft.EntityFrameworkCore;
using Oversr.Model;

namespace Oversr.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Designer> Designers { get; set; }

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
            });
        }
    }
}
