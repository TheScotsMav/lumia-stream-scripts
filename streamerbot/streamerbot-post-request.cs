using System;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json.Linq;

public class CPHInline
{
    private string lumiaToken = "";
    private string commandName = "colorLeft";
    private string color = "green";

    private static JObject buildChatCommand(string command, string msg)
    {
        var extraSettings = new JObject();
        var jsonParams = new JObject();
        var chatCommand = new JObject();

        extraSettings["message"] = msg;
        jsonParams["value"] = command;
        jsonParams["extraSettings"] = extraSettings;
        chatCommand["type"] = "chat-command";
        chatCommand["params"] = jsonParams;

        return chatCommand;
    }

    private static string postRequest(string uri, string command, string msg)
    {
        var requestJson = buildChatCommand(command, msg);
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
        var uri = string.Format("http://localhost:39231/api/send?token={0}", lumiaToken);
        postRequest(uri, commandName, color);
        return true;
    }
}