package classwebsite.handler;

import com.sun.net.httpserver.*;
import classwebsite.service.DataStore;
import java.io.*;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.*;

public class AdminHandler implements HttpHandler {
    private static final String AUTH_TOKEN = "class2c-admin-token";

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        addCorsHeaders(exchange);
        if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
            exchange.sendResponseHeaders(204, -1);
            return;
        }

        String path = exchange.getRequestURI().getPath();
        String method = exchange.getRequestMethod();

        String auth = exchange.getRequestHeaders().getFirst("Authorization");
        if (auth == null || !auth.equals("Bearer " + AUTH_TOKEN)) {
            sendJson(exchange, 401, "{\"error\":\"Unauthorized\"}");
            return;
        }

        try {
            if (path.equals("/api/admin/login") && method.equals("POST")) {
                String body = readBody(exchange);
                if (body.contains("\"admin\"") && body.contains("\"0000\"")) {
                    sendJson(exchange, 200, "{\"token\":\"" + AUTH_TOKEN + "\",\"mustChangePassword\":true}");
                } else {
                    sendJson(exchange, 401, "{\"error\":\"Invalid credentials\"}");
                }
            } else if (path.equals("/api/admin/data") && method.equals("GET")) {
                sendJson(exchange, 200, DataStore.getInstance().toJson());
            } else if (path.equals("/api/admin/data") && method.equals("POST")) {
                String body = readBody(exchange);
                java.nio.file.Files.writeString(java.nio.file.Path.of("admin_data.json"), body);
                DataStore.getInstance().load();
                sendJson(exchange, 200, "{\"status\":\"imported\"}");
            } else {
                sendJson(exchange, 404, "{\"error\":\"Not found\"}");
            }
        } catch (Exception e) {
            sendJson(exchange, 500, "{\"error\":\"" + e.getMessage() + "\"}");
        }
    }

    private String readBody(HttpExchange exchange) throws IOException {
        return new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
    }

    private void addCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    private void sendJson(HttpExchange exchange, int code, String json) throws IOException {
        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
        exchange.sendResponseHeaders(code, bytes.length);
        exchange.getResponseBody().write(bytes);
        exchange.getResponseBody().close();
    }
}
