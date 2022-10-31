using System;
using System.Net;
using System.IO;
using Newtonsoft.Json.Linq;

public class CPHInline
{
    private string lumiaToken = "";
    private string commandName = "colorLeft";
    private string color = "green";

    private static JObject buildChatCommand(string command, string color) {
        
        var extraSettings = new JObject();
        extraSettings.Add("message", color);
        var jsonParams = new JObject();
        jsonParams.Add("value", command);
        jsonParams.Add("extraSettings", extraSettings);
        var chatCommand = new JObject();
        chatCommand.Add("type", "chat-command");
        chatCommand.Add("params", jsonParams);

        return chatCommand;

    }

    private static string postRequest(string url, string command, string color)
    {
        var result = "";
        var requestJson = buildChatCommand(command, color);
        HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
        httpWebRequest.ContentType = "application/json; charset=utf-8";
        httpWebRequest.Method = "POST";
        using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
        {
            streamWriter.Write(requestJson.ToString());
            streamWriter.Flush();
            streamWriter.Close();
        }

        try
        {
            using (var response = httpWebRequest.GetResponse() as HttpWebResponse)
            {
                if (httpWebRequest.HaveResponse && response != null)
                {
                    using (var reader = new StreamReader(response.GetResponseStream()))
                    {
                        result = reader.ReadToEnd();
                    }
                }
            }
        }
        catch (WebException e)
        {
            if (e.Response != null)
            {
                using (var errorResponse = (HttpWebResponse)e.Response)
                {
                    using (var reader = new StreamReader(errorResponse.GetResponseStream()))
                    {
                        string error = reader.ReadToEnd();
                        result = error;
                    }
                }
            }
        }

        return result;
    }

    public bool Execute()
    {
        postRequest(string.Format("http://localhost:39231/api/send?token={0}", lumiaToken), commandName, color);
        return true;
    }
}