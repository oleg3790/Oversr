using Oversr.Model.ViewModel;

namespace Oversr.Services
{
    public interface IUserService
    {
        UserVM Login(UserVM vm);
    }
}
