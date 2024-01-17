using API.HealthChecks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Domain;
using PizzeriaAPI.Job;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Repositories;
using PizzeriaAPI.Security;
using PizzeriaAPI.Settings;
using PizzeriaAPI.Upgrades;
using Quartz.Impl;
using Quartz.Spi;
using Quartz;
using System.Text;
using Google.Protobuf.WellKnownTypes;


namespace PizzeriaAPI
{
	public static class ModuleInitialize
	{
		public static void AddSecurityServices(this IServiceCollection services, IConfiguration configuration)
		{
			services.Configure<JSONWebTokensSettings>
				(configuration.GetSection("JSONWebTokensSettings"));


			services.AddSingleton<IUserManager<User>, UserManager>();
			services.AddTransient<IEmailSender, EmailSender>();
			services.AddTransient<IAuthenticationService, AuthenticationService>();

			services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			})
				.AddJwtBearer(o =>
				{
					o.RequireHttpsMetadata = false;
					o.SaveToken = false;
					o.TokenValidationParameters = new TokenValidationParameters
					{
						ValidateIssuerSigningKey = true,
						ValidateIssuer = true,
						ValidateAudience = true,
						ValidateLifetime = true,
						ClockSkew = TimeSpan.Zero,
						ValidIssuer = configuration["JSONWebTokensSettings:Issuer"],
						ValidAudience = configuration["JSONWebTokensSettings:Audience"],
						IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JSONWebTokensSettings:Key"]))
					};

					o.Events = new JwtBearerEvents()
					{
						OnAuthenticationFailed = c =>
						{
							c.NoResult();
							c.Response.StatusCode = 500;
							c.Response.ContentType = "text/plain";
							return c.Response.WriteAsync(c.Exception.ToString());
						},
						OnChallenge = context =>
						{
							context.HandleResponse();
							context.Response.StatusCode = 401;
							context.Response.ContentType = "application/json";
							var result = JsonConvert.SerializeObject("401 Not authorized");
							return context.Response.WriteAsync(result);
						},
						OnForbidden = context =>
						{
							context.Response.StatusCode = 403;
							context.Response.ContentType = "application/json";
							var result = JsonConvert.SerializeObject("403 Not authorized");
							return context.Response.WriteAsync(result);
						},
					};
				});
		}
		public static void AddExceptionHandler(this WebApplication app)
		{
			app.UseExceptionHandler(errorApp =>
			{
				errorApp.Run(async context =>
				{
					var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
					var exception = exceptionHandlerPathFeature.Error;

					context.Response.ContentType = "application/json";

					if (exception is ApiException apiException)
					{
						context.Response.StatusCode = apiException.StatusCode;

						var response = new ErrorResponse { Message = apiException.Message };
						await context.Response.WriteAsync(JsonConvert.SerializeObject(response));
					}
					else
					{
						context.Response.StatusCode = 500;

						var response = new ErrorResponse { Message = "An internal server error occurred." };
						await context.Response.WriteAsync(JsonConvert.SerializeObject(response));
					}
				});
			});
		}
		public static void AddServices(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddSingleton<INHibernateHelper, NHibernateHelper>();
			services.AddSingleton<ITransactionCoordinator, TransactionCoordinator>();
			services.AddSingleton<IHealthCheck, DBHealthCheck>();

			services.AddSingleton<ISocialMediaRepository, SocialMediaRepository>();
			services.AddSingleton<IBannerRepository, BannerRepository>();
			services.AddSingleton<IUserRepository, UserRepository>();
			services.AddSingleton<IBannerRepository, BannerRepository>();
			services.AddSingleton<IPictureRepository, PictureRepository>();
			services.AddSingleton<ISliderRepository, SliderRepository>();
			services.AddSingleton<ITeamMemberRepository, TeamMemberRepository>();
			services.AddSingleton<IRoleRepository, RoleRepository>();
			services.AddSingleton<IContactInfoRepository, ContactInfoRepository>();
			services.AddSingleton<ITestimonialRepository, TestimonialRepository>();
			services.AddSingleton<ITabSliderRepository, TabSliderRepository>();
			services.AddSingleton<IInformationTabRepository, InformationTabRepository>();
			services.AddSingleton<IGalleryRepository, GalleryRepository>();
			services.AddSingleton<IProductRepository, ProductRepository>();
			services.AddSingleton<ICategoryRepository, CategoryRepository>();
			services.AddSingleton<IKeyValueRepository, KeyValueRepository>();
			services.AddSingleton<IMenuElementRepository, MenuElementRepository>();
			services.AddSingleton<IUserTokenRepository, UserTokenRepository>();
			services.AddSingleton<IUpgradesService, UpgradesService>();

			services.AddSingleton<IUpgrade, Upgrade1>();
			services.AddSingleton<IUpgrade, Upgrade2>();
			services.AddSingleton<IUpgrade, Upgrade3>();

			services.Configure<EmailSenderSettings>(configuration.GetSection("EmailSenderSettings"));
			services.Configure<HashSettings>(configuration.GetSection("HashSettings"));

		}
		public static void AddJobs(this IServiceCollection services)
		{
			services.AddSingleton<IJobFactory, JobFactory>();
			services.AddSingleton<ISchedulerFactory, StdSchedulerFactory>();
			services.AddHostedService<QuartzHostedService>();

			services.AddSingleton<DeleteExpiredUserTokenJob>();

			services.AddSingleton(new JobSchedule(
				jobType: typeof(DeleteExpiredUserTokenJob),
				cronExpression: "0 15 10 * * ?"));
		}

		public static void OnInitialize(this IServiceProvider services)
		{
			services.GetRequiredService<ISchedulerFactory>().GetScheduler().Result.Start();

			var upgradeService = services.GetRequiredService<IUpgradesService>();

			upgradeService.UpgradeServices();
		}
	}
}
