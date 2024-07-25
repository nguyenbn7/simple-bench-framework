using System.Text.Json;
using Demo;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContextPool<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await dbContext.Database.MigrateAsync();

    using var reader = File.OpenRead("people.json");

    var people = JsonSerializer.Deserialize<List<Person>>(reader, new JsonSerializerOptions
    {
        PropertyNameCaseInsensitive = true
    });

    if (!dbContext.People.Any())
        if (people is not null)
        {
            dbContext.AddRange(people);
            await dbContext.SaveChangesAsync();
        }
}

app.Run();
