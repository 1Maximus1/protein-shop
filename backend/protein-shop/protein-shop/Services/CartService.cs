using Marten;
using protein_shop.Abstactions;
using protein_shop.Models;

namespace protein_shop.Services
{
    public class CartService(IDocumentSession session) : ICartService
    {
        public async Task<Cart> GetCartByUserId(int userId)
        {
            var cart = await session
                .Query<Cart>()
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart is null)
            {
                throw new FileNotFoundException("Cart is not found!"); 
            }

            return cart;
        }

        public async Task<Cart> CreateCart(Cart cart)
        {
            session.Store(cart);
            await session.SaveChangesAsync();
            return cart;
        }

        public async Task<Cart> UpdateCart(Cart cart)
        {
            session.Store(cart);
            await session.SaveChangesAsync();
            return cart;
        }

        public async Task DeleteCartById(int cartId)
        {
            session.Delete<Cart>(cartId);
            await session.SaveChangesAsync();
        }

    }
}
