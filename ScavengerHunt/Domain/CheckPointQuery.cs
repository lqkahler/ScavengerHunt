using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace ScavengerHunt.Domain {
    public record CheckPointQuery(Guid CheckPointId) : IRequest<CheckPointQuery.Response> {
        public record Response(CheckPoint CheckPoint);
    }

    public sealed class CheckPointQueryHandler : IRequestHandler<CheckPointQuery, CheckPointQuery.Response> {
        private readonly ScavengerHuntContext _context;
        
        public CheckPointQueryHandler(ScavengerHuntContext context) {
            _context = context;
        }

        public async Task<CheckPointQuery.Response> Handle(CheckPointQuery request, CancellationToken cancellationToken) {
            var checkPoint = await _context.CheckPoints
                .FirstOrDefaultAsync(n => n.Id.Equals(request.CheckPointId), cancellationToken);

            if (checkPoint is null) throw new NotFoundException();

            return new CheckPointQuery.Response(checkPoint);
        }
    }
}