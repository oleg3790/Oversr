using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Oversr.Model;
using Dapper;
using System.Linq;

namespace Oversr.Services
{
    public class InventoryService : IInventoryService
    {
        private readonly IConfiguration _config;

        public InventoryService(IConfiguration config)
        {
            _config = config;
        }

        public ICollection<Designer> GetAllDesigners()
        {
            var designers = new List<Designer>();

            using (var conn = new SqlConnection(_config.GetValue<string>("defaultConnection")))
            {
                var result = conn.Query<Designer>("select * from designers");
                designers = result.ToList();
            }
            
            return designers;
        }
    }
}
