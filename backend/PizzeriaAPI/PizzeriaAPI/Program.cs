using Microsoft.Extensions.DependencyInjection;
using Serilog;
using System.Reflection;

namespace PizzeriaAPI
{
	public class Program
	{
		public static void Main(string[] args)
		{

			var builder = WebApplication.CreateBuilder(args);
			builder.Host.UseSerilog((ctx, lc) => lc.WriteTo.Console());
			builder.Services.AddControllers();
			builder.Services.AddServices();
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			var app = builder.Build();
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}
			app.Services.OnInitialize();
			app.UseRouting();
			app.UseAuthentication();
			app.UseAuthorization();
			app.UseEndpoints(endpoints => endpoints.MapControllers());
			app.UseHttpsRedirection();

			app.MapControllers();

			app.Run();

		}
	}
}