using backend.Models;

namespace backend.Repositories.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly TayBacDbContext _dbContext;
        public UserRepository(TayBacDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public User getUserByLogin(string email,string password)
        {
            return _dbContext.Users.SingleOrDefault(u => u.Email == email && u.PasswordHash == password);   
        }
    }
}
