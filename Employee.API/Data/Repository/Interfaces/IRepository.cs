using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace EmployeeApp.API.Data.Repository.Interfaces
{
    public interface IRepository<T> where T:class
    {
        // CRUD Operations...
        Task Create(T entity);
        //IQueryable<T> Read(); 
        IQueryable<T> FindAll();
        IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression);
        Task Update(T entity);
        Task Delete(T entity);
        Task<bool> SaveAll();
    }
}
