var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.Use(async (context, next) =>
{
    context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Append("X-Frame-Options", "DENY");
    context.Response.Headers.Append("X-XSS-Protection", "1; mode=block");
    context.Response.Headers.Append("Referrer-Policy", "strict-origin-when-cross-origin");
    context.Response.Headers.Append("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    await next();
});

app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        var path = ctx.File.PhysicalPath;
        if (path.EndsWith(".css") || path.EndsWith(".js") || path.EndsWith(".png") ||
            path.EndsWith(".jpg") || path.EndsWith(".svg") || path.EndsWith(".ico") ||
            path.EndsWith(".woff2") || path.EndsWith(".woff"))
        {
            ctx.Context.Response.Headers.Append("Cache-Control", "public, max-age=31536000, immutable");
        }
        else if (path.EndsWith(".html") || path.EndsWith(".webmanifest"))
        {
            ctx.Context.Response.Headers.Append("Cache-Control", "no-cache, no-store, must-revalidate");
        }
    }
});

app.MapFallbackToFile("index.html");

app.Run();
