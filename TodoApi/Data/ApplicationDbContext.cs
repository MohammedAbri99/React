using Microsoft.EntityFrameworkCore;
using TodoApi.Model;

namespace TodoApi.Data
{
    public class ApplicationDbContext:DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> optoin):base(optoin) 
        {
            
        }

        public DbSet<Todo> todos { get; set; }

    }
}
