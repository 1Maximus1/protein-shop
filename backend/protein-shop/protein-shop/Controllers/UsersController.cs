using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using protein_shop.Abstactions;
using System.Security.Claims;

namespace protein_shop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
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
            catch (Exception)
            {
                return StatusCode(500, new { message = "Внутрішня помилка сервера" });
            }
        }

        class UserDto
        {
            public string Name { get; set; }
            public string Email { get; set; }
        }
    }
}
