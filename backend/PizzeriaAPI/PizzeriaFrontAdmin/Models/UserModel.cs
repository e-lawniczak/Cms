using Newtonsoft.Json.Linq;

namespace PizzeriaFrontAdmin.Models
{
    public class UserModel
    {

        public int id { get; set; }
        public string email { get; set; }
        public string token { get; set; }
        public UserModel(string user, string token, int id)
        {
            email = user;
            this.token = token;
            this.id = id;
        }
        
    }
}
