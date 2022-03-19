using System;

namespace ScavengerHunt.Domain {
    public class CheckIn {
        public Guid Id { get; set; }

        public DateTime Timestamp { get; set; }

        public Guid CheckPointId { get; set; }

        public string Name { get; set; }
    }
}
