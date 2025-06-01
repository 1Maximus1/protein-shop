using Marten;
using protein_shop.Abstactions;
using protein_shop.Models;

namespace protein_shop.Services
{
    public class OrderService(IDocumentSession session) : IOrderService
    {
        public async Task<IReadOnlyList<Order>> GetAllOrdersAsync()
        {
            return await session.Query<Order>().ToListAsync();
        }

        public async Task<IReadOnlyList<Order>> GetOrdersByUserAsync(int userId)
        {
            return await session.Query<Order>()
                .Where(o => o.UserId == userId)
                .ToListAsync();
        }

        public async Task<Order> CreateOrderAsync(Order order)
        {
            session.Store(order);
            await session.SaveChangesAsync();
            return order;
        }

        public async Task<bool> DeleteOrderByIdAsync(int orderId)
        {
            session.Delete<Order>(orderId);
            await session.SaveChangesAsync();
            return true;
        }
    }
}
