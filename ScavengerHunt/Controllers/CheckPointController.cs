using MediatR;
using Microsoft.AspNetCore.Mvc;
using ScavengerHunt.Controllers.dtos;
using ScavengerHunt.Domain;
using System;
using System.Threading.Tasks;

namespace ScavengerHunt.Controllers {
    [ApiController, Route("api/[controller]")]
    public class CheckPointController : ControllerBase {
        private readonly IMediator _mediator;

        public CheckPointController(IMediator mediator) {
            _mediator = mediator;
        }

        [HttpGet("{checkPointId}")]
        public async Task<ActionResult> GetCheckPoint(Guid checkPointId) {
            CheckPoint checkPoint;

            try {
                var response = await _mediator.Send(new CheckPointQuery(checkPointId));
                checkPoint = response.CheckPoint;
            } catch (NotFoundException) {
                return NotFound();
            }

            return Ok(new CheckPointDto(checkPoint.Name));
        }

        [HttpPost("{checkPointId}/visit")]
        public async Task<ActionResult> Visit(Guid checkPointId, VisitCheckPointDto request) {
            try {
                await _mediator.Send(new VisitCheckPointCommand(checkPointId, request.PlayerName));
            } catch (NotFoundException) {
                return BadRequest();
            }

            return Ok();
        }
    }
}
