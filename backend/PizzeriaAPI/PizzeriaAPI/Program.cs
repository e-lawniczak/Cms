
using API.HealthChecks;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Serilog;

namespace PizzeriaAPI
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			builder.Host.UseSerilog((ctx, lc) => lc.ReadFrom.Configuration(ctx.Configuration));

			builder.Services.AddControllers();
			builder.Services.AddServices();
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			builder.Services.AddHealthChecks()
				.AddCheck<DBHealthCheck>(nameof(DBHealthCheck));

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
			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
				endpoints.MapHealthChecks("/health");
			});
			app.UseHttpsRedirection();

			app.Run();

		}
	}
}