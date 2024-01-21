
using API.HealthChecks;
using Microsoft.OpenApi.Models;
using PizzeriaAPI.Security;
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
            builder.Services.AddServices(builder.Configuration);
            builder.Services.AddSecurityServices(builder.Configuration);
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddOptions();
            builder.Services.AddJobs();
            builder.Services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
              Enter 'Bearer' [space] and then your token in the text input below.
              \r\n\r\nExample: 'Bearer 12345abcdef'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                options.OperationFilter<SecurityRequirementsOperationFilter>();

                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Pizzeria API",
                    Description = "API using .NET 6"
                });
            });

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("Open",
                    builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });

            builder.Services.AddHealthChecks()
                .AddCheck<DBHealthCheck>(nameof(DBHealthCheck));

            var app = builder.Build();
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.AddExceptionHandler();
            }

            app.Services.OnInitialize();
            app.UseCors("Open");
            app.UseAuthentication();
            app.UseRouting();

            app.UseAuthorization();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "PizzeriaAPI");
            });
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHealthChecks("/health");
            });
            app.UseHealthChecks("/health");
            app.UseHttpsRedirection();

            app.Run();

        }
    }
}