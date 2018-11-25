using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Oversr.Model;
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
        [HttpPost("[action]")]
        public IActionResult Login([FromBody]User userParam)
        {
            var user = _userService.Login(userParam.Username, userParam.Password);

            if (user == null)
            {
                return BadRequest(new { message = "Username or Password is incorrect" });
            }

            return Ok(user);
        }

        [HttpGet("[action]")]
        public IActionResult Authenticate()
        {
            return Ok();
        }
    }
}