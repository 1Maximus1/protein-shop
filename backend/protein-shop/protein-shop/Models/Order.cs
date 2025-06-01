using protein_shop.ValueObjects;

namespace protein_shop.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public Address Address { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Status { get; set; }
        public decimal TotalAmount { get; set; }    

        public List<Product> Products{ get; set; }
        public User User { get; set; }
    }
}
