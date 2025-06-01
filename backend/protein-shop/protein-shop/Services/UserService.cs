using Marten;
using Microsoft.AspNetCore.Http;
using protein_shop.Abstactions;
using protein_shop.Models;

namespace protein_shop.Services
{
    public class UserService(IDocumentSession session) : IUserService
    {
        public async Task<User> GetUserById(int userId)
        {
            var user = await session.LoadAsync<User>(userId);
            return user;
        }

        public async Task<User> GetUserByEmail(string email)
        { 
            var user = await session
                .Query<User>()
                .FirstOrDefaultAsync(u => u.Email == email);
            return user;
        }

        public async Task<User> CreateUser(User user)
        {
            session.Store(user);
            await session.SaveChangesAsync();
            return user;
        }

        public async Task<IReadOnlyList<User>> GetAllUsersAsync()
        {
            return await session.Query<User>().ToListAsync();
        }

        public async Task<bool> DeleteUserByIdAsync(int userId)
        {
            var cart = await session.Query<Cart>().FirstOrDefaultAsync(c => c.UserId == userId);
            if (cart != null)
            {
                session.Delete(cart);
                await session.SaveChangesAsync();
            }
            var orders = await session.Query<Order>().Where(o => o.UserId == userId).ToListAsync();
            foreach (var order in orders)
            {
                session.Delete(order);
            }
            await session.SaveChangesAsync();
            var user = await session.LoadAsync<User>(userId);
            if (user == null) return false;

            session.Delete<User>(userId);
            await session.SaveChangesAsync();
            return true;
        }

        public async Task UpdateUserAsync(User user)
        {
            session.Store(user);
            await session.SaveChangesAsync();
        }
    }
}
