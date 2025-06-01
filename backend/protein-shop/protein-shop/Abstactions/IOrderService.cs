using protein_shop.Models;

namespace protein_shop.Abstactions
{
    public interface IOrderService
    {
        Task<IReadOnlyList<Order>> GetAllOrdersAsync();
        Task<IReadOnlyList<Order>> GetOrdersByUserAsync(int userId);
        Task<Order> CreateOrderAsync(Order order);
        Task<bool> DeleteOrderByIdAsync(int orderId);
    }
}
