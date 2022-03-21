using Microsoft.EntityFrameworkCore;
using ScavengerHunt.Domain;

namespace ScavengerHunt {
    public class ScavengerHuntContext : DbContext {
        public ScavengerHuntContext(DbContextOptions<ScavengerHuntContext> options) : base(options) { }

        public DbSet<CheckPoint> CheckPoints { get; set; }

        public DbSet<Visit> Visits { get; set; }
    }
}
