using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Oversr.Model;
using System.Linq;
using Oversr.Data;

namespace Oversr.Services
{
    public class InventoryService : IInventoryService
    {
        private readonly IConfiguration _config;
        private readonly ApplicationDbContext _dbContext;

        public InventoryService(IConfiguration config, ApplicationDbContext dbContext)
        {
            _config = config;
            _dbContext = dbContext;
        }

        public void AddDesigner(string name)
        {
            _dbContext.Add(new Designer() { Name = name });
            _dbContext.SaveChanges();
        }

        public ICollection<Designer> GetAllDesigners()
        {
            return _dbContext.Designers.ToList();
            _dbContext.SaveChanges();
        }
    }
}
