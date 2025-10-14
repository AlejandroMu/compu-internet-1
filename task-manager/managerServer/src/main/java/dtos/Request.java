package dtos;

import com.google.gson.JsonObject;

public class Request {
    private String command;
    private JsonObject data;

    public Request(String command, JsonObject data) {
        this.command = command;
        this.data = data;
    }

    public String getCommand() {
        return command;
    }
    public JsonObject getData() {
        return data;
    }
    public void setCommand(String command) {
        this.command = command;
    }
    public void setData(JsonObject data) {
        this.data = data;
    }
}
