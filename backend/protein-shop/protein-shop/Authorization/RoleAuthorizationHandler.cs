using Microsoft.AspNetCore.Authorization;
using protein_shop.Abstactions;
using System.Security.Claims;

namespace protein_shop.Authorization
{
    public class RoleAuthorizationHandler : AuthorizationHandler<RoleRequirement>
    {
        private readonly IUserService _userService;

        public RoleAuthorizationHandler(IUserService userService)
            => _userService = userService;

        protected override async Task HandleRequirementAsync(
            AuthorizationHandlerContext context,
            RoleRequirement requirement)
        {
            var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdClaim, out var userId))
            {
                context.Fail();
                return;
            }

            var user = await _userService.GetUserById(userId);
            if (user == null)
            {
                context.Fail();
                return;
            }

            if (user.Role?.Equals(requirement.RequiredRole, StringComparison.OrdinalIgnoreCase) == true)
                context.Succeed(requirement);
            else
                context.Fail();
        }
    }
}
