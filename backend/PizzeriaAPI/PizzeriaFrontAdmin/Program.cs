using PizzeriaFrontAdmin.Models;
using Serilog;
namespace PizzeriaFrontAdmin
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Host.UseSerilog((ctx, lc) => lc.ReadFrom.Configuration(ctx.Configuration));
			builder.Services.Configure<HashSettings>(builder.Configuration.GetSection("HashSettings"));
			builder.Services.AddOptions();
            builder.Services.AddDistributedMemoryCache();
            // Add services to the container.
            builder.Services.AddSession(opt =>
            {
                opt.IdleTimeout = TimeSpan.FromMinutes(30);
            });
			builder.Services.AddRazorPages();

            var app = builder.Build();
            app.UseStaticFiles();
            app.UseSession();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.MapRazorPages();
            
            app.Run();
        }
    }
}