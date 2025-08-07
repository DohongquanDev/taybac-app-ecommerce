using backend.DTOs.UserDTO;
using backend.DTOs.UserDTO.RegisterRequest;

namespace backend.Services.UserService
{
    public interface IAuthService
    {
        LoginResponse Login(LoginRequest request);
        RegisterResponse Register(RegisterRequest request);
    }
}
