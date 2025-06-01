using Microsoft.AspNetCore.Mvc;
using protein_shop.Abstactions;
using protein_shop.Models;

namespace protein_shop.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : Controller
    {
        private readonly IBaseProductsService _productBaseService;

        public ProductsController(IBaseProductsService productBaseService)
        {
            _productBaseService = productBaseService;
        }

        [HttpGet("sport-nutrition")]
        public async Task<IActionResult> GetAll()
        {
            var products = await _productBaseService.GetAllProductsAsync();
            products = products.Where(p => p.Category == "протеїн" || p.Category == "креатини" || p.Category == "аміно" || p.Category == "вітаміни").ToList();
            return Ok(products);
        } 


        [HttpGet("accessories")]
        public async Task<ActionResult<IEnumerable<AccessoriesDto>>> GetAccesories()
        {
            var products = await _productBaseService.GetAllProductsAsync();
            products = products.Where(p => p.Category == "шейкери" || p.Category == "пляшки_для_води" || p.Category == "пояси" || p.Category == "бинти").ToList();
            return Ok(products);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productBaseService.GetAllProductsAsync();
            return Ok(products);
        }

    }
    public class SportNutritionDto : Product
    {
    }

    public class AccessoriesDto : Product
    {
    }
}
