package classwebsite.handler;

import com.sun.net.httpserver.*;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class DataHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");

        String json = classwebsite.service.DataStore.getInstance().toJson();
        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
        exchange.sendResponseHeaders(200, bytes.length);
        exchange.getResponseBody().write(bytes);
        exchange.getResponseBody().close();
    }
}
