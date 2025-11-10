using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly TayBacDbContext _dbContext;
        public UserRepository(TayBacDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddUser(User user)
        {
           _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
        }

        public User? GetUserByUsernameOrEmail(string username, string email)
        {
            return _dbContext.Users.FirstOrDefault(u => u.Username == username || u.Email == email);
        }

        public User? getUserByLogin(string email, string password)
        {
            var user = _dbContext.Users.SingleOrDefault(u => u.Email == email);
            if (user != null && BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return user;
            }
            return null;
        }


    }
}
