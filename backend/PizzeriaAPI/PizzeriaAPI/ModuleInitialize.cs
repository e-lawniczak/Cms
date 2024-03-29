﻿using API.HealthChecks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using ISession = NHibernate.ISession;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using PizzeriaAPI.Database.Entities;
using PizzeriaAPI.Domain;
using PizzeriaAPI.Job;
using PizzeriaAPI.ORM;
using PizzeriaAPI.Security;
using PizzeriaAPI.Settings;
using PizzeriaAPI.Upgrades;
using Quartz;
using Quartz.Impl;
using Quartz.Spi;
using System.Text;
using PizzeriaAPI.Repositories.EntityWithPictureRepositories;
using PizzeriaAPI.Repositories.BaseEntityRepositories;
using PizzeriaAPI.Repositories.ExtendedBaseEntityRepositories;
using PizzeriaAPI.Repositories.EntityRepository;

namespace PizzeriaAPI
{
    public static class ModuleInitialize
    {
        public static void AddSecurityServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<SecuritySettings>
                (configuration.GetSection("SecuritySettings"));
            services.Configure<EmailSenderSettings>(
                configuration.GetSection("EmailSenderSettings"));

            services.AddHttpContextAccessor();
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
                        ValidIssuer = configuration["SecuritySettings:Issuer"],
                        ValidAudience = configuration["SecuritySettings:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["SecuritySettings:Key"] ?? ""))
                    };

                    o.Events = new JwtBearerEvents()
                    {
                        OnAuthenticationFailed = context => { return Task.CompletedTask; },
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
                    var exception = exceptionHandlerPathFeature?.Error;

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
        public static void AddServices(this IServiceCollection services)
        {
            services.AddSingleton<INHibernateHelper, NHibernateHelper>();
            services.AddSingleton<ITransactionCoordinator, TransactionCoordinator>();
            services.AddSingleton<IHealthCheck, DBHealthCheck>();

            services.AddSingleton<ISocialMediaRepository, SocialMediaRepository>();
            services.AddSingleton<IBannerRepository, BannerRepository>();
            services.AddSingleton<IUserRepository, UserRepository>();
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
            services.AddSingleton<IPageRepository, PageRepository>();
            services.AddSingleton<ICategoryRepository, CategoryRepository>();
            services.AddSingleton<IKeyValueRepository, KeyValueRepository>();
            services.AddSingleton<IMenuElementRepository, MenuElementRepository>();
            services.AddSingleton<IUserTokenRepository, UserTokenRepository>();
            services.AddSingleton<IEventRepository, EventRepository>();
            services.AddSingleton<IUpgradesService, UpgradesService>();

            services.AddSingleton<IUpgrade, Upgrade1>();
            services.AddSingleton<IUpgrade, Upgrade2>();
            services.AddSingleton<IUpgrade, Upgrade3>();
            services.AddSingleton<IUpgrade, Upgrade4>();
            services.AddSingleton<IUpgrade, Upgrade5>();
        }
        public static void AddJobs(this IServiceCollection services)
        {
            services.AddSingleton<IJobFactory, JobFactory>();
            services.AddSingleton<ISchedulerFactory, StdSchedulerFactory>();
            services.AddHostedService<QuartzHostedService>();

            services.AddSingleton<DeleteExpiredUserTokenJob>();

            services.AddSingleton(new JobSchedule(
                jobType: typeof(DeleteExpiredUserTokenJob),
                cronExpression: "0 0,30 * * * ?"));
        }

        public static void OnInitialize(this IServiceProvider services)
        {
            services.GetRequiredService<ISchedulerFactory>().GetScheduler().Result.Start();

            var upgradeService = services.GetRequiredService<IUpgradesService>();

            upgradeService.UpgradeServices();

            var eventRepository = services.GetRequiredService<IEventRepository>();
            var transactionCoordinator = services.GetRequiredService<ITransactionCoordinator>();
            transactionCoordinator.InRollbackScope(session =>
            {
                eventRepository.Initialize(session);
            });
        }
    }
}
