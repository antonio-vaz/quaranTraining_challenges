using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace MyAwesomeWebservice
{
    /// <summary>
    /// Summary description for MyAwesomeWebservice
    /// </summary>
    [WebService(Namespace = "https://myawesomeserver.info.tm/" )]
    [WebServiceBinding(ConformsTo = WsiProfiles.None)]
    
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class MyAwesomeWebservice : System.Web.Services.WebService
    {

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }

        [WebMethod]
        public int  AddNumbers(int number1, int number2)
        {
            return number1 + number2;
        }
    }
}
