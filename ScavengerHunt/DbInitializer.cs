using Microsoft.EntityFrameworkCore;

namespace ScavengerHunt {
    public static class DbInitializer {
        public static void Initialize(ScavengerHuntContext context) {
            context.Database.Migrate();
        }
    }
}
