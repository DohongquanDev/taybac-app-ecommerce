using backend.DTOs.UserDTO;

namespace backend.Services.UserService
{
    public interface IAuthService
    {
        LoginResponse Login(LoginRequest request);
    }
}
