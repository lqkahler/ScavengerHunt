using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace ScavengerHunt.Domain {
    public record CheckInCommand(Guid CheckPointId, string Name) : IRequest;

    public sealed class CheckInCommandHandler : IRequestHandler<CheckInCommand> {
        private readonly ScavengerHuntContext _context;
        
        public CheckInCommandHandler(ScavengerHuntContext context) {
            _context = context;
        }

        public async Task<Unit> Handle(CheckInCommand request, CancellationToken cancellationToken) {
            _context.CheckIns.Add(new CheckIn {
                CheckPointId = request.CheckPointId,
                Name = request.Name,
                Timestamp = DateTime.UtcNow
            });
            await _context.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
