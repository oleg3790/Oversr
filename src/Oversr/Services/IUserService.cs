using Oversr.Model;

namespace Oversr.Services
{
    public interface IUserService
    {
        User Login(string username, string password);
    }
}
