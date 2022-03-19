using MediatR;
using Microsoft.AspNetCore.Mvc;
using ScavengerHunt.Controllers.dtos;
using ScavengerHunt.Domain;
using System.Threading.Tasks;

namespace ScavengerHunt.Controllers {
    [ApiController, Route("[controller]")]
    public class CheckInController : ControllerBase {
        private readonly IMediator _mediator;

        public CheckInController(IMediator mediator) {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult> CheckIn(CheckInDto checkIn) {
            await _mediator.Send(new CheckInCommand(checkIn.CheckPointId, checkIn.Name));
            return Ok();
        }
    }
}
