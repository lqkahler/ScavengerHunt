using System;

namespace ScavengerHunt.Domain {
    public class Visit {
        public Guid Id { get; set; }

        public Guid CheckPointId { get; set; }

        public DateTime Timestamp { get; set; }

        public string PlayerName { get; set; }
    }
}
