using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using protein_shop.Abstactions;
using protein_shop.Models;
using protein_shop.Services;
using System.Security.Claims;

namespace protein_shop.Controllers
{
    [ApiController]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        private readonly IReviewService _reviewService;
        private readonly IUserService _userService;
        private readonly IBaseProductsService _baseProductsService;

        public AdminController(
            IReviewService reviewService,
            IUserService userService,
            IBaseProductsService baseProductsService)
        {
            _reviewService = reviewService;
            _userService = userService;
            _baseProductsService = baseProductsService;
        }

        [HttpGet("reviews")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> GetAllReviews()
        {
            var reviews = await _reviewService.GetAllReviewsAsync();

            return Ok(reviews);
        }

        [HttpDelete("reviews/{id:int}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var success = await _reviewService.DeleteReviewByIdAsync(id);
            if (!success)
                return NotFound(new { message = $"Review with Id={id} not found." });

            return NoContent();
        }

        [HttpGet("users")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> GetAllUsers()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized(new { message = "Невірний токен" });

            var users = await _userService.GetAllUsersAsync();

            users = users.Where(u => u.Id != userId).ToList();
            return Ok(users);
        }

        [HttpDelete("users/{id:int}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> DeleteUser(int id)
        {

            var success = await _userService.DeleteUserByIdAsync(id);

            if (!success)
                return NotFound(new { message = $"User with Id={id} not found." });

            return Ok();
        }

        [HttpPut("users/{id}/make-admin")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> MakeUserAdmin(int id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null)
                return NotFound(new { message = $"User with Id={id} not found." });

            user.Role = "Admin";
            await _userService.UpdateUserAsync(user);

            return Ok();
        }

        [HttpDelete("products/{id:int}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var success = await _baseProductsService.DeleteProductByIdAsync(id);
            if (!success)
                return NotFound(new { message = $"Product with Id={id} not found." });

            return Ok(); 
        }

        [HttpPost("/api/products")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> AddProduct([FromBody] ProductCreateDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Name) || dto.Price <= 0)
                return BadRequest(new { message = "Некоректні дані продукту." });

            // Мапінг DTO у модель
            var product = new Product
            {
                Name = dto.Name,
                Price = dto.Price,
                Category = dto.Category,
                ImageUrl = dto.ImageUrl
            };

            await _baseProductsService.AddProductAsync(product);

            return Ok(product);
        }
    }

    public class ProductCreateDto
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }
        public string ImageUrl { get; set; }
    }

}
