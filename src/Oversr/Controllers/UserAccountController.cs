using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Oversr.Model.ViewModel;
using Oversr.Services;

namespace Oversr.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UserAccountController : Controller
    {
        private readonly IUserService _userService;

        public UserAccountController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost()]
        public IActionResult Login([FromBody]UserVM vm)
        {
            var user = _userService.Login(vm);

            if (user == null)
            {
                return BadRequest(new { message = "Username or Password is incorrect" });
            }

            return Ok(user);
        }
    }
}