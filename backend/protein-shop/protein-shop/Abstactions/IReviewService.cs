using protein_shop.Models;

namespace protein_shop.Abstactions
{
    public interface IReviewService
    {
        Task<IReadOnlyList<Review>> GetAllReviewsAsync();
        Task<Review> AddReviewAsync(Review review);
        Task<bool> DeleteReviewByIdAsync(int reviewId);
    }

}
