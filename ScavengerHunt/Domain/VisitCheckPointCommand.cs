using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace ScavengerHunt.Domain {
    public record VisitCheckPointCommand(Guid CheckPointId, string PlayerName) : IRequest;

    public sealed class VisitCheckPointCommandHandler : IRequestHandler<VisitCheckPointCommand> {
        private readonly ScavengerHuntContext _context;
        
        public VisitCheckPointCommandHandler(ScavengerHuntContext context) {
            _context = context;
        }

        public async Task<Unit> Handle(VisitCheckPointCommand request, CancellationToken cancellationToken) {
            if (!(await IsCheckPoint(request.CheckPointId))) throw new NotFoundException();

            _context.Visits.Add(new Visit {
                CheckPointId = request.CheckPointId,
                PlayerName = request.PlayerName,
                Timestamp = DateTime.UtcNow
            });

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }

        private async Task<bool> IsCheckPoint(Guid checkPointId) =>
            await _context.CheckPoints.AnyAsync(n => n.Id.Equals(checkPointId));
    }
}
