using protein_shop.Models;

namespace protein_shop.Abstactions
{
    public interface ICartService
    {
        Task<Cart> GetCartByUserId(int userId);
        Task<Cart> CreateCart(Cart cart);
        Task<Cart> UpdateCart(Cart cart);
        Task DeleteCartById(int cartId);
    }
}
