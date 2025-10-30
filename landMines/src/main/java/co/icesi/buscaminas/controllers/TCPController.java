package co.icesi.buscaminas.controllers;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import co.icesi.buscaminas.controllers.dtos.Request;
import co.icesi.buscaminas.controllers.dtos.Response;
import co.icesi.buscaminas.model.Cell;
import co.icesi.buscaminas.services.ServicesImpl;

public class TCPController {

    private ServicesImpl services;

    private ServerSocket serverSocket;

    private boolean running;

    private Executor executor;

    private Gson gson;

    public TCPController(ServicesImpl services) {
        this(services, 12345);
    }

    public TCPController(ServicesImpl services, int port) {
        this.services = services;
        try {
            serverSocket = new ServerSocket(port);
            executor = Executors.newFixedThreadPool(5);
            gson = new GsonBuilder().create();
        } catch (Exception e) {
            e.printStackTrace();
        }
        running = true;
    }

    public void setRunning(boolean running) {
        this.running = running;
    }

    public boolean isRunning() {
        return running;
    }

    public void startService() {
        System.out.println("TCP Service started on port " + serverSocket.getLocalPort());
        while (running) {
            try {
                executor.execute(new TCPClientHandler(serverSocket.accept(), services));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        try {
            serverSocket.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    class TCPClientHandler implements Runnable {

        private Socket clientSocket;
        private ServicesImpl services;

        public TCPClientHandler(Socket clientSocket, ServicesImpl services) {
            this.clientSocket = clientSocket;
            this.services = services;
        }

        @Override
        public void run() {
            try {
                System.out.println("Client connected: " + clientSocket.getInetAddress());
                BufferedReader reader = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(clientSocket.getOutputStream()));

                String line = reader.readLine();
                Request rq = gson.fromJson(line, Request.class);
                Map<String, String> data = rq.data;
                Response response = new Response();
                response.data = new HashMap<>();
                switch (rq.action) {
                    case "SELECT_CELL":
                        int i = Integer.parseInt(data.get("i"));
                        int j = Integer.parseInt(data.get("j"));
                        try {
                            boolean resp = services.selectCell(i, j);
                            response.status = "OK";
                            response.data.put("win", resp);

                            response.data.put("gameEnd", resp);
                        } catch (Exception e) {
                            response.data.put("gameEnd", true);
                            response.data.put("win", false);

                        }
                        Cell[][] board = services.printBoard();
                        response.data.put("board", board);
                        break;
                    case "SOW_ALL":
                        services.showAll(true);
                        board = services.printBoard();
                        response.status = "OK";
                        response.data.put("board", board);
                        break;
                    case "GET_BOARD":
                        board = services.printBoard();
                        response.status = "OK";
                        response.data.put("board", board);
                        break;
                    case "INIT_GAME":
                        i = Integer.parseInt(data.get("n"));
                        j = Integer.parseInt(data.get("m"));
                        int m = Integer.parseInt(data.get("minas"));
                        services.initGame(i, j, m);
                        board = services.printBoard();
                        response.status = "OK";
                        response.data.put("board", board);
                        break;

                    default:
                        break;
                }

                String json = gson.toJson(response);
                writer.write(json);
                writer.newLine();
                writer.flush();
                writer.close();
                reader.close();

                clientSocket.close();
                System.out.println("Client disconnected: " + clientSocket.getInetAddress());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

    }

}
