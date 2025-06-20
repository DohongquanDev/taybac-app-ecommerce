using backend.DTOs.UserDTO;
using backend.Helpers;
using backend.Repositories.UserRepository;

namespace backend.Services.UserService
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _config;
        public AuthService(IUserRepository userRepository, IConfiguration config)
        {
            _userRepository = userRepository;
            _config = config;
        }
        public LoginResponse Login(LoginRequest request)
        {
            var user = _userRepository.getUserByLogin(request.Email,request.Password);
            if (user == null)
            {
                return new LoginResponse { Success = false, Message = "User not found" };
            }
            string token = JwtHelper.GenerateToken(user.Username, _config["Jwt:Key"]);
            return new LoginResponse
            {
                Success = true,
                Message = "Đăng nhập thành công",
                Token = token
            };
        }
    }
}

