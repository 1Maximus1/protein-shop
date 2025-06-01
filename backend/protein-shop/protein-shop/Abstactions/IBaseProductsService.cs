using protein_shop.Models;

namespace protein_shop.Abstactions
{
    public interface IBaseProductsService
    {
        Task<IReadOnlyList<Product>> GetAllProductsAsync();
        Task<Product> GetProductByIdAsync(int productId);
        Task<Product> AddProductAsync(Product product);
        Task<bool> DeleteProductAsync(int productId);
        Task<bool> DeleteProductByIdAsync(int productId);
    }
}
