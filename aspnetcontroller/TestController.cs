using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Demo;

[ApiController]
[Route("api/")]
public class TestController : ControllerBase
{
    private readonly AppDbContext dbContext;

    public TestController(AppDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetAsync()
    {
        var people = await dbContext.People.AsNoTracking().ToListAsync();
        return Ok(people);
    }
}
