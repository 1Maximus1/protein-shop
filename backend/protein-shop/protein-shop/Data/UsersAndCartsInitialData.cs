using Marten.Schema;
using Marten;
using protein_shop.Models;

namespace protein_shop.Data
{
    public class UsersAndCartsInitialData : IInitialData
    {
        public async Task Populate(IDocumentStore store, CancellationToken cancellation)
        {
            using var session = store.LightweightSession();

            if (await session.Query<User>().AnyAsync())
                return;

            var user = new User
            {
                Name = "Oleg Olegenko",
                Role = "Admin",
                Email = "mamaluga@gmail.com",
                ReviewId = 0,
                CreatedAt = DateTime.Parse("2025-06-01T05:12:49.6939125Z"),
                PasswordHash = "$2a$11$mw/oCz0sp.QDTjJcf3ixbOmwA894PGAdkgvQFUgb5XdDxCCoIkY7O"
            };
            session.Store(user);
            await session.SaveChangesAsync();

            user = await session
                .Query<User>()
                .FirstOrDefaultAsync(u => u.Email == "mamaluga@gmail.com");

            var cart = new Cart
            {
                UserId = user.Id,
                Products = new List<Product>()
            };
            session.Store(cart);
            await session.SaveChangesAsync(); 

            user.CartId = cart.Id;
            session.Store(user);
            await session.SaveChangesAsync();
        }
    }
}
