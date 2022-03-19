using System;

namespace ScavengerHunt.Controllers.dtos {
    public record CheckInDto(Guid CheckPointId, string Name);
}
