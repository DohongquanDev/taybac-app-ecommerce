using backend.DTOs.UserDTO;
using backend.DTOs.UserDTO.RegisterRequest;
using backend.Helpers;
using backend.Models;
using backend.Repositories.UserRepository;
using BCrypt.Net;

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
            var user = _userRepository.getUserByLogin(request.Email, request.Password);
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

        public RegisterResponse Register(RegisterRequest request)
        {
            var existingUser = _userRepository.GetUserByUsernameOrEmail(request.UserName, request.Email);
            var errors = new List<string>();
            if (existingUser != null)
            {
                if (existingUser.Username == request.UserName)
                errors.Add("Username already exist");
                if (existingUser.Email == request.Email)
                    errors.Add("Email already exists");
                if(errors.Count > 0)
                {
                    return new RegisterResponse
                    {
                        Success = false,
                        Message = string.Join(" and ", errors)
                    };
                }
            }
            String passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
            var newUser = new User
            {
                Username = request.UserName,
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                PasswordHash = passwordHash,
            };
            _userRepository.AddUser(newUser);
                    return new RegisterResponse
            {
                Success = true,
                Message = "Registration successful"
            };
        }
    }
}

