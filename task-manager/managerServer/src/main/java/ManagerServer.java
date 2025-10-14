import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

import dtos.Request;
import model.TaskStage;
import services.TaskServices;

public class ManagerServer {

    private Gson gson;
    private TaskServices services;
    private boolean running;

    public static void main(String[] args) throws Exception {
        new ManagerServer();
    }

    public ManagerServer() throws Exception {
        gson = new Gson();
        services = new TaskServices();
        ServerSocket socket = new ServerSocket(5000);
        running = true;
        while (running) {
            Socket sc = socket.accept();
            resolveClient(sc);
        }
        socket.close();
    }

    public void resolveClient(Socket sc) throws IOException {
        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(sc.getInputStream()));
            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(sc.getOutputStream()));
            while (true) {
                String line = br.readLine();
                String resp = "";
                Request rq = gson.fromJson(line, Request.class);
                switch (rq.getCommand()) {
                    case "GET_TASKS":
                        List<TaskStage> stages = services.getTasks();
                        resp = gson.toJson(stages);
                        break;

                    default:
                        Map<String, String> map = new HashMap<>();
                        map.put("msg", "Operation not supported");
                        resp = gson.toJson(map);
                        break;
                }
                System.out.println(resp);
                writer.write(resp + "\n");
                writer.flush();
            }
        } catch (Exception e) {
            sc.close();
        }
    }

}
