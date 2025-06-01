using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using protein_shop.Abstactions;
using protein_shop.Models;
using System.Security.Claims;

namespace protein_shop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewsController : Controller
    {
        private readonly IReviewService _reviewService;
        private readonly IUserService _userService;

        public ReviewsController(IReviewService reviewService, IUserService userService)
        {
            _reviewService = reviewService;
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReviewDto>>> GetReviews()
        {
            var reviews = await _reviewService.GetAllReviewsAsync();

            var dtos = new List<ReviewDto>();
            foreach (var r in reviews)
            {
                var user = await _userService.GetUserById(r.AuthorId);
                dtos.Add(new ReviewDto
                {
                    Id = r.Id,
                    Author = user?.Name ?? "Невідомий користувач",
                    Text = r.Text,
                    Rating = r.Rating,
                    CreatedAt = r.CreatedAt
                });
            }

            return Ok(dtos);
        }


        [Authorize]
        [HttpGet("user")]
        public async Task<ActionResult<IEnumerable<ReviewDto>>> GetUserReviews()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized();

            var allReviews = await _reviewService.GetAllReviewsAsync();
            var myReviews = allReviews.Where(r => r.AuthorId == userId);

            var myDtos = new List<ReviewDto>();
            var userName = User.FindFirstValue(ClaimTypes.Name)
                           ?? (await _userService.GetUserById(userId))?.Name
                           ?? "Невідомий";

            foreach (var r in myReviews)
            {
                myDtos.Add(new ReviewDto
                {
                    Id = r.Id,
                    Author = userName,
                    Text = r.Text,
                    Rating = r.Rating,
                    CreatedAt = r.CreatedAt
                });
            }

            return Ok(myDtos);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ReviewDto>> PostReview([FromBody] ReviewPostDto dto)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized();

            var userName = User.FindFirstValue(ClaimTypes.Name)
                           ?? (await _userService.GetUserById(userId))?.Name
                           ?? "Невідомий";

            var review = new Review
            {
                AuthorId = userId,
                Text = dto.Text,
                Rating = dto.Rating,
                CreatedAt = DateTime.UtcNow
            };

            var created = await _reviewService.AddReviewAsync(review);

            var resultDto = new ReviewDto
            {
                Id = created.Id,
                Author = userName,
                Text = created.Text,
                Rating = created.Rating,
                CreatedAt = created.CreatedAt
            };

            return CreatedAtAction(
                nameof(GetReviews),
                new { id = resultDto.Id },
                resultDto
            );
        }
    }

    public class ReviewDto
    {
        public int Id { get; set; }
        public string Author { get; set; }
        public string Text { get; set; }
        public int Rating { get; set; }
        public DateTime CreatedAt { get; set; }
    }


    public class ReviewPostDto
    {
        public string CreatedAt { get; set; }
        public int Rating { get; set; }
        public string Text { get; set; }
    }

}
