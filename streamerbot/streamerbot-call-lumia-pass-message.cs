using System;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json.Linq;

public class CPHInline
{
    private string lumiaToken = "";
    private string commandName = "colorLeft";
    
    private static JObject buildChatCommand(string command, string msg, string user)
    {
        var extraSettings = new JObject();
        var jsonParams = new JObject();
        var chatCommand = new JObject();

        extraSettings["message"] = msg;
        extraSettings["user"] = user;
        jsonParams["value"] = command;
        jsonParams["extraSettings"] = extraSettings;
        chatCommand["type"] = "chat-command";
        chatCommand["params"] = jsonParams;

        return chatCommand;
    }

    private static string postRequest(string uri, string command, string msg, string user)
    {
        var requestJson = buildChatCommand(command, msg, user);
        using (var client = new HttpClient())
        {
            var endpoint = new Uri(uri);
            var payload = new StringContent(requestJson.ToString(), Encoding.UTF8, "application/json");
            var result = client.PostAsync(endpoint, payload).Result.Content.ReadAsStringAsync().Result;
            return result;
        }
    }

    public bool Execute()
    {
        var msg = args["rawInput"].ToString();
        var user = args["user"].ToString();
        var uri = string.Format("http://localhost:39231/api/send?token={0}", lumiaToken);
        postRequest(uri, commandName, msg, user);
        return true;
    }
}