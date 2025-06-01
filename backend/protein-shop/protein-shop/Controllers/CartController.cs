using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using protein_shop.Abstactions;
using protein_shop.Models;
using System.Security.Claims;

namespace protein_shop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController(ICartService _cartService, IBaseProductsService _baseProductsService) : ControllerBase    
    {
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserCart()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized();

            var cart = await _cartService.GetCartByUserId(userId);

            return Ok(new { items = cart.Products });
        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddToCart([FromBody] AddCartItemDto dto)
        {
            if (!int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var userId))
                return Unauthorized();

            var cart = await _cartService.GetCartByUserId(userId)
                       ?? new Cart { UserId = userId, Products = new List<Product>() };

            var product = await _baseProductsService.GetProductByIdAsync(dto.ProductId);
            if (cart.Products is null)
            {
                
                product.Quantity = dto.Quantity;
                
                cart.Products = new List<Product>();

                cart.Products.Add(product);

            }
            else
            {
                var existing = cart.Products.FirstOrDefault(p => p.Id == dto.ProductId);
                if (existing != null)
                {
                    existing.Quantity += dto.Quantity;
                }
                else
                {
                    product.Quantity = dto.Quantity;
                    cart.Products.Add(product);
                }
            }
           

            Cart updatedCart;
            if (cart.Id == 0)
                throw new Exception("Cart is not existing");
            else
                updatedCart = await _cartService.UpdateCart(cart);

            return Ok();
        }


        [HttpPut("{productId}")]
        [Authorize]
        public async Task<IActionResult> UpdateCartItem(int productId, [FromBody] UpdateCartItemDto dto)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized();

            var cart = await _cartService.GetCartByUserId(userId);

            if (cart.Products == null)
                cart.Products = new List<Product>();

            var existing = cart.Products.FirstOrDefault(i => i.Id == productId);
            if (existing == null)
                return NotFound($"Product with id {productId} is not in the cart");


            existing.Quantity = dto.Quantity;

            var updatedCart = await _cartService.UpdateCart(cart);

            return Ok(new { items = cart.Products });
        }


        [HttpDelete("{productId}")]
        [Authorize]
        public async Task<ActionResult> RemoveCartItem(int productId)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized();

            var cart = await _cartService.GetCartByUserId(userId);

            if (cart.Products == null)
                cart.Products = new List<Product>();

            var existing = cart.Products.FirstOrDefault(i => i.Id == productId);
            if (existing != null)
                cart.Products.Remove(existing);

            var updatedCart = await _cartService.UpdateCart(cart);

            return Ok(new { items = updatedCart.Products });
        }
    }

    public class AddCartItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class UpdateCartItemDto
    {
        public int Quantity { get; set; }
    }
}
