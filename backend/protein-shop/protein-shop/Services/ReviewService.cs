using Marten;
using protein_shop.Abstactions;
using protein_shop.Models;

namespace protein_shop.Services
{
    public class ReviewService(IDocumentSession session) : IReviewService
    {
        public async Task<IReadOnlyList<Review>> GetAllReviewsAsync()
        {
            return await session.Query<Review>().ToListAsync();
        }

        public async Task<Review> AddReviewAsync(Review review)
        {
            session.Store(review);
            await session.SaveChangesAsync();
            return review;
        }

        public async Task<bool> DeleteReviewByIdAsync(int reviewId)
        {
            session.Delete<Review>(reviewId);
            await session.SaveChangesAsync();
            return true;
        }
    }
}
