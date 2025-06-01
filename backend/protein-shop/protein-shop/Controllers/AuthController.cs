using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using protein_shop.Abstactions;
using protein_shop.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private IConfiguration _config;
        private IUserService _userService;
        private ICartService _cartService;
        public AuthController(IConfiguration config, IUserService userService, ICartService cartService){
            _config = config;
            _userService = userService;
            _cartService = cartService;
        } 

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {

            var user = await _userService.GetUserByEmail(dto.Email);
            if (user == null)
                return Unauthorized("Невірні облікові дані.");

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized("Невірні облікові дані.");

            var claims = new[] {
              new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
              //new Claim(ClaimTypes.Email, dto.Email),
              //new Claim(ClaimTypes.Name, "Іван Петренко")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Secret"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
              issuer: _config["Jwt:Issuer"],
              audience: _config["Jwt:Audience"],
              claims: claims,
              expires: DateTime.UtcNow.AddHours(2),
              signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new { token = jwt });
        }


        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("token", new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true
            });
            return Ok();
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (!int.TryParse(userIdClaim, out var userId))
                    return Unauthorized(new { message = "Невірний токен" });

                var user = await _userService.GetUserById(userId);
                if (user == null)
                    return NotFound(new { message = "Користувача не знайдено" });

                var profile = new
                {
                    id = user.Id,
                    name = user.Name,
                    email = user.Email
                };

                return Ok(profile);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (await _userService.GetUserByEmail(dto.Email) != null)
                return Conflict("Користувач з таким email вже існує.");

            var createdCart = await _cartService.CreateCart(new Cart());

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                CartId = createdCart.Id,
                Role = "User",
                CreatedAt = DateTime.UtcNow
            };

            var createdUser = await _userService.CreateUser(user);

            await _cartService.UpdateCart(new Cart
            {
                Id = createdCart.Id,
                UserId = createdUser.Id,
            });

            return Ok(new
            {
                status = "OK"
            });
        }


        [Authorize]
        [HttpGet("profile/admin")]
        public async Task<IActionResult> CheckOnAdmin()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized();

            var user = await _userService.GetUserById(userId);
            if (user == null)
                return NotFound(new { message = "Користувача не знайдено" });

            bool isAdmin = user.Role?.Equals("Admin", System.StringComparison.OrdinalIgnoreCase) == true;

            return Ok(new { isAdmin });
        }

        public class LoginDto
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class RegisterDto
        {
            public string Name { get; set; } = default!;
            public string Email { get; set; } = default!;
            public string Password { get; set; } = default!;
        }
    }
}