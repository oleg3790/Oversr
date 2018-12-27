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

        /// <summary>
        /// Get all entities that have a deleted flag set to false
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <returns></returns>
        protected ICollection<TEntity> GetAllEnabled<TEntity>() where TEntity : EntityBase
        {
            return _dbContext.Set<TEntity>().Where(x => x.Deleted.Equals(false)).ToList();
        }

        /// <summary>
        /// Get all (deleted and enabled) entities
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <returns></returns>
        protected ICollection<TEntity> GetAllEntities<TEntity>() where TEntity : EntityBase
        {
            return _dbContext.Set<TEntity>().ToList();
        }

        protected ICollection<TEntity> GetAllExceptThis<TEntity>(Guid id) where TEntity : EntityBase
        {
            return _dbContext.Set<TEntity>().Where(x => x.Id != id).ToList();
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
    }
}
