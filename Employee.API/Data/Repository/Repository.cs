using EmployeeApp.API.Data.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace EmployeeApp.API.Data.Repository
{
    public class Repository<D, T> : IRepository<T>
        where T : class
            where D : DbContext
    {
        private readonly DbContext db = null;

        public Repository(DbContext dbContext)
        {
            db = (D)dbContext;
        }

        public async Task Create(T entity)
        {
            await db.Set<T>().AddAsync(entity);
            await db.SaveChangesAsync();
        }

        public Task Delete(T entity)
        {
            db.Set<T>().Remove(entity);
            return db.SaveChangesAsync();
        }

        public IQueryable<T> FindAll()
        {
            return db.Set<T>().AsNoTracking();
        }

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return db.Set<T>().Where(expression).AsNoTracking();
        }

        public Task Update(T entity)
        {
            db.Set<T>().Update(entity);
            return db.SaveChangesAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await db.SaveChangesAsync() > 0;
        }
    }

}
