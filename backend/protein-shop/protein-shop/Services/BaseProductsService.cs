using Marten;
using protein_shop.Abstactions;
using protein_shop.Models;

namespace protein_shop.Services
{
    public class BaseProductsService(IDocumentSession session) : IBaseProductsService
    {
        public async Task<IReadOnlyList<Product>> GetAllProductsAsync()
        {
            return await session.Query<Product>().ToListAsync();
        }

        public async Task<Product?> GetProductByIdAsync(int productId)
        {
            return await session.LoadAsync<Product>(productId);
        }

        public async Task<Product> AddProductAsync(Product product)
        {
            session.Store(product);
            await session.SaveChangesAsync();
            return product;
        }

        public async Task<bool> DeleteProductAsync(int productId)
        {
            var product = await session.LoadAsync<Product>(productId);
            if (product is null)
                return false;

            session.Delete(product);
            await session.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteProductByIdAsync(int productId)
        {
            var product = await session.LoadAsync<Product>(productId);
            if (product == null)
                return false;

            session.Delete(product);
            await session.SaveChangesAsync();
            return true;
        }

    }
}
