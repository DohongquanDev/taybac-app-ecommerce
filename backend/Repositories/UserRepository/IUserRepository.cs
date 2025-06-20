using backend.Models;

namespace backend.Repositories.UserRepository
{
    public interface IUserRepository
    {
        User getUserByLogin(string email,String password);
    }
}
