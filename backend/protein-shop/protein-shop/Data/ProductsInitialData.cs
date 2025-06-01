using Marten;
using Marten.Schema;
using protein_shop.Models;

namespace protein_shop.Data
{
    public class ProductsInitialData : IInitialData
    {
        public async Task Populate(IDocumentStore store, CancellationToken cancellation)
        {
            using var session = store.LightweightSession();

            if (await session.Query<Product>().AnyAsync())
            {
                return;
            }

            session.Store<Product>(GetPreconfiguredProducts());
            await session.SaveChangesAsync();
        }
            private static IEnumerable<Product> GetPreconfiguredProducts()
            {
                return new List<Product>
                {
                    new Product
                {
                    Name = "Musle Up, 1кг",
                    Price = 999.99m,
                    Category = "протеїн",
                    ImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUKN0w-gbRbIkNucnSJUiqG56HuwzqQf-moA&s",
                    Quantity = 0,
                },
                new Product
                {
                    Name = "Olimp, 500г",
                    Price = 499.5m,
                    Category = "протеїн",
                    ImageUrl = "https://strong.ua/i/1914/b2102noviy-razmer.jpg",
                    Quantity = 0,
                },
                new Product
                {
                    Name = "Whey Gold Standart, 2.31кг",
                    Price = 2300.0m,
                    Category = "протеїн",
                    ImageUrl = "https://static1.biotus.ua/media/catalog/product/_/w/_whey_gold_standard_optimum_nutrition_2.27__1.jpg?store=rus&image-type=image",
                    Quantity = 0,
                },
                new Product
                {
                    Name = "Willmax 80, 1кг",
                    Price = 1000.0m,
                    Category = "протеїн",
                    ImageUrl = "https://www.willmax.com.ua/image/cache/catalog/17-12-2021-001/80-80/11-800x800.jpg",
                    Quantity = 0,
                },
                new Product
                {
                    Name = "Farma VitaminD3, 100шт",
                    Price = 475.5m,
                    Category = "вітаміни",
                    ImageUrl = "https://boston-pharma.com/wp-content/uploads/2023/10/6224010901193-.-VITAMIN-D3-30-.-Jar-.-1.png",
                    Quantity = 0,
                },
                new Product
                {

                    Name = "Kangavites, 100sht",
                    Price = 100.0m,
                    Category = "вітаміни",
                    ImageUrl = "https://static1.biotus.ua/media/catalog/product/4/9/49_4_2.jpg?store=rus&image-type=image",
                    Quantity = 0,
                },
                new Product
                {
                    Name = "Креатин Моногідрат BIOTECH, 300гр",
                    Price = 800.0m,
                    Category = "креатини",
                    ImageUrl = "https://www.gladiatorfit.ch/wp-content/uploads/2022/12/100-Creatine-monohydrate-Biotech.jpg",
                    Quantity = 0,
                },
                new Product
                {
                    Name = "ActiveLab BCAA, 500г",
                    Price = 1000.99m,
                    Category = "аміно",
                    ImageUrl = "https://www.b2b.activlab.pl/wp-content/uploads/2019/02/bcaa_xtra_instant_2022_cola-view-1-min.png",
                    Quantity = 0,
                },
                new Product
                {
                    Name = "BCAA Nutrend, 400г",
                    Price = 555.0m,
                    Category = "аміно",
                    ImageUrl = "https://nutrendcdn.com/cdn-cgi/imagedelivery/v_g237akqysjqDvfyOsFkg/c68f6d6c-f166-4a62-772b-0802942ceb00/public",
                    Quantity = 0,
                },
                new Product
                {

                    Name = "MyVitamins, 400шт.",
                    Price = 120.49m,
                    Category = "вітаміни",
                    ImageUrl = "https://www.myvitamins.com/images?url=https://static.thcdn.com/productimg/original/10860388-1264860398797920.jpg&format=webp&auto=avif&crop=1100,1200,smart",
                    Quantity = 0,
                },
                new Product
                {
                    Name = "Шейкер, WaysSport, 1л",
                    Price = 679.0m,
                    Category = "шейкери",
                    ImageUrl = "https://waysport.ua/uploads/2024/02/4f85d10f493de031d0d65dd7d819168b.jpg",
                    Quantity = 0,
                },
                new Product
                {
                    Name = "Kobo, 13mm",
                    Price = 1700.99m,
                    Category = "пояси",
                    ImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4VpFdtrMdXmuD58N5pidieYJ5PaPABDFoVg&s",
                    Quantity = 0,
                }
            };
        }

    }
}

