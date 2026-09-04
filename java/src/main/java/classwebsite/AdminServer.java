package classwebsite;

import com.sun.net.httpserver.HttpServer;
import classwebsite.handler.AdminHandler;
import classwebsite.handler.DataHandler;
import classwebsite.service.DataStore;
import java.net.InetSocketAddress;

public class AdminServer {
    private static final int PORT = 8889;

    public static void main(String[] args) throws Exception {
        DataStore.getInstance().load();

        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);
        server.createContext("/api/admin/", new AdminHandler());
        server.createContext("/api/data/", new DataHandler());
        server.setExecutor(java.util.concurrent.Executors.newFixedThreadPool(10));
        server.start();

        System.out.println("=== Java Admin API Server ===");
        System.out.println("Port: " + PORT);
        System.out.println("URL: http://localhost:" + PORT);
    }
}
