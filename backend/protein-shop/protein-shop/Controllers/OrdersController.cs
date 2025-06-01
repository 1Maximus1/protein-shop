using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using protein_shop.Abstactions;
using protein_shop.Models;
using protein_shop.ValueObjects;
using System.Security.Claims;

namespace protein_shop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private IBaseProductsService _productsService;
        private IUserService _userService;
        private IOrderService _orderService;
        private ICartService _cartService;

        public OrdersController(IBaseProductsService productsService, IUserService userService, IOrderService orderService, ICartService cartService)
        {
            _productsService = productsService;
            _userService = userService;
            _orderService = orderService;
            _cartService = cartService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetUserOrders()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized();

            var orders = await _orderService.GetOrdersByUserAsync(userId);

            var dtos = orders.Select(o => new OrderDto
            {
                Id = o.Id,
                CreatedAt = o.CreatedAt,
                Status = o.Status,
                TotalAmount = o.TotalAmount,
                Address = o.Address.AddressLine,
                Items = o.Products.Select(p => new Product
                {
                    Id = p.Id,
                    Name = p.Name,
                    ImageUrl = p.ImageUrl,
                    Price = p.Price,
                    Quantity = p.Quantity,
                }).ToList()
            }).ToList();

            return Ok(dtos);
        }


        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized();


            var products = new List<Product>();

            foreach (var item in request.Items)
            {
                var prodFromDb = await _productsService.GetProductByIdAsync(item.ProductId);
                products.Add(new Product
                {
                    Id = prodFromDb.Id,
                    Name = prodFromDb.Name,
                    Quantity = item.Quantity,
                    Price = item.Price
                });
            }

            var order = new Order
            {
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                Status = "processing",
                Address = new Address { AddressLine = request.ShippingAddress },
                TotalAmount = request.TotalAmount,
                Products = products
            };


            var created = await _orderService.CreateOrderAsync(order);

            var cart = await _cartService.GetCartByUserId(userId)
                      ?? new Cart { UserId = userId };
            cart.Products.Clear();
            await _cartService.UpdateCart(cart);

            return CreatedAtAction(
                nameof(GetUserOrders),
                new { /* id = created.Id if you had GET /api/orders/{id} */ },
                created
            );
        }
    }


    public class OrderDto
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Status { get; set; }
        public decimal TotalAmount { get; set; }
        public string Address { get; set; }
        public List<Product> Items { get; set; }
    }
    

    public class ProductDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
    public class CreateOrderRequest
    {
        public List<ProductDto> Items { get; set; }
        public string ShippingAddress { get; set; }
        public decimal TotalAmount { get; set; }
    }

}
