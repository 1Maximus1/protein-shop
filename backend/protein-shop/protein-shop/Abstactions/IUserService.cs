using Microsoft.AspNetCore.Http;
using protein_shop.Models;

namespace protein_shop.Abstactions
{
    public interface IUserService
    {
        Task<User> GetUserById(int userId);
        Task<User> GetUserByEmail(string email);
        Task<User> CreateUser(User user);
        Task<IReadOnlyList<User>> GetAllUsersAsync();
        Task<bool> DeleteUserByIdAsync(int userId);
        Task UpdateUserAsync(User user);
    }
}