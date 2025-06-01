using Marten;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using protein_shop.Abstactions;
using protein_shop.Authorization;
using protein_shop.Data;
using protein_shop.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();


var jwtSecret = builder.Configuration["Jwt:Secret"];
if (string.IsNullOrEmpty(jwtSecret))
{
    throw new ApplicationException("JWT Secret not configured");
}

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.ASCII.GetBytes(jwtSecret)),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true
        };
    });


builder.Services.AddAuthorization();
builder.Services.AddCors(opt => opt.AddPolicy("cors", p =>
{
    p.WithOrigins("http://localhost:5173").AllowCredentials().AllowAnyHeader().AllowAnyMethod();
}));


builder.Services.AddMarten(opts =>
{
    opts.Connection(builder.Configuration.GetConnectionString("Database")!);
    //opts.AutoCreateSchemaObjects = Weasel.Core.AutoCreate.CreateOrUpdate;
}).UseLightweightSessions();



builder.Services.AddScoped<ICartService, CartService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IBaseProductsService, BaseProductsService>();
builder.Services.AddScoped<IReviewService, ReviewService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IQuestionService, QuestionService>();


builder.Services.InitializeMartenWith<ProductsInitialData>();
builder.Services.InitializeMartenWith<UsersAndCartsInitialData>();

builder.Services.AddScoped<IAuthorizationHandler, RoleAuthorizationHandler>();

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy =>
        policy.Requirements.Add(new RoleRequirement("Admin")));
    options.AddPolicy("UserOnly", policy =>
        policy.Requirements.Add(new RoleRequirement("User")));
});



var app = builder.Build();

app.UseCors("cors");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();