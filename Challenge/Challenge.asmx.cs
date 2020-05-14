using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI.WebControls.WebParts;

namespace Challenge
{
    /// <summary>
    /// Summary description for Challenge
    /// </summary>
    [WebService(Namespace = "https://myawesomeserver.info/tm/challenge/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class Challenge : System.Web.Services.WebService
    {

        [WebMethod ]        
        public string NothingHereToSee()
        {
            return "flag{yeah_I_Can_Invoke_a Soap_method_}";
        }

        [WebMethod]
        public string ITellYouASecretIfYouGiveMeAnEvenNumber(int myGuess)
        {
            if(myGuess % 2 == 0) return "flag{_one_odd_flag_for_me}";
            return String.Format("Your guess was: ?", myGuess);

        }

        [WebMethod]
        public List<string> Secret1(int myGuess, string challengeKey)
        {
            
            List<string> list = new List<string>();

            if (!challengeKey.Equals("IWannaPlayAGame")) { list.Add("Read the challenge page before ... you are missing something");  return list; }

             list.Add("Your guess is smaller than the secret number ... keep trying");

            if (myGuess < 1000) return list;
            list.Clear();

            list.Add("123456");
            list.Add("123A56");
            list.Add("I23456");
            list.Add("123456");
            list.Add("123456");
            list.Add("123456");
            list.Add("123456");
            list.Add("123456");
            list.Add("234567");
            list.Add("123456");
            list.Add("12E456");
            list.Add("123456");


            return list;

        }

        [WebMethod]
        public List<string> Secret2(string entryKey)
        {

            List<string> list = new List<string>();

            if (!entryKey.Equals("12E456")) { list.Add("Nop, wrong key, try again"); return list; }

            
            list.Add("A123456");
            list.Add("A123A56");
            list.Add("AI23456");
            list.Add("A123456");
            list.Add("A123456");
            list.Add("A123456");
            list.Add("A123456");
            list.Add("A123456");
            list.Add("A234567");
            list.Add("A123456");
            list.Add("A12E456");
            list.Add("A123456");


            return list;

        }

        [WebMethod]

        public List<string> Secret3(string entryKey)
        {

            List<string> list = new List<string>();

            if (!entryKey.Equals("AI23456")) { list.Add("Nop, wrong key, try again"); return list; }


            list.Add("AA123456");
            list.Add("AA123A56");
            list.Add("AAI23456");
            list.Add("AA123456");
            list.Add("flag{3_levels_for_this_seriouslyyy_bahhhh}");
            list.Add("AA123456");
            list.Add("AA123456");
            list.Add("AA123456");
            list.Add("AA234567");
            list.Add("AA123456");
            list.Add("AA12E456");
            list.Add("AA123456");


            return list;

        }

    }
}
