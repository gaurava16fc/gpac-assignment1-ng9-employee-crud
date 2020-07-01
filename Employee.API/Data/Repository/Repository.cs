using Microsoft.EntityFrameworkCore;
using System.Linq;
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

        public IQueryable<T> Read()
        {
            return db.Set<T>().AsQueryable();
        }

        public Task Update(T entity)
        {
            db.Set<T>().Update(entity);
            return db.SaveChangesAsync();
        }
    }

}
