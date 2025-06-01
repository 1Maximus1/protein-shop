namespace protein_shop.Models
{
    public class User
    {
        public int Id { get; set; }
        public int CartId { get; set; }
        public int ReviewId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public DateTime CreatedAt {  get; set; }

        public string Role { get; set; } ="User";

    }
}
