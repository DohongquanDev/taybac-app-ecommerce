using backend.DTOs.UserDTO;
using backend.DTOs.UserDTO.RegisterRequest;
using backend.Services.UserService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers.UserController
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAuthService _authService;
        public UserController(IAuthService authService)
        {
            _authService = authService;
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var result = _authService.Login(request);
            if(!result.Success) 
                return Unauthorized(result);
            return Ok(result);  
        }
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            var result = _authService.Register(request);
            if (!result.Success)
               return BadRequest(result);
            return Ok(result);
            
        }
    }
}                                   
