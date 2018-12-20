using Microsoft.Extensions.Configuration;
using Oversr.Data;
using Oversr.Model;
using Oversr.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Oversr.Services
{
    public class ServiceBase
    {
        protected readonly IConfiguration _config;
        protected readonly ApplicationDbContext _dbContext;

        public ServiceBase(IConfiguration config, ApplicationDbContext dbContext)
        {
            _config = config;
            _dbContext = dbContext;
        }

        protected TEntity GetById<TEntity>(Guid id) where TEntity : EntityBase
        {
            return _dbContext.Set<TEntity>().FirstOrDefault(x => x.Id.Equals(id));
        }

        protected ICollection<TEntity> GetAllActive<TEntity>() where TEntity : EntityBase
        {
            return _dbContext.Set<TEntity>().Where(x => x.Deleted.Equals(false)).ToList();
        }

        protected ICollection<TEntity> GetAllEntities<TEntity>() where TEntity : EntityBase
        {
            return _dbContext.Set<TEntity>().ToList();
        }

        protected ICollection<TEntity> GetAllLookups<TEntity>() where TEntity : LookupBase
        {
            return _dbContext.Set<TEntity>().ToList();
        }

        protected void Add<TEntity>(TEntity entity) where TEntity : EntityBase
        {
            _dbContext.Add(entity);
            _dbContext.SaveChanges();
        }

        protected void Delete<TEntity>(Guid id) where TEntity : EntityBase
        {
            var entity = _dbContext.Set<TEntity>()
                .FirstOrDefault(x => x.Id.Equals(id));

            if (entity == null)
            {
                throw new NullReferenceException("No entity found to delete");
            }

            entity.Deleted = true;
            _dbContext.SaveChanges();
        }
    }
}
