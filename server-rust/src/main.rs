use actix_files::Files;
use actix_web::{web, App, HttpServer, HttpResponse, middleware::DefaultHeaders, middleware::Compress};
use log::info;
use std::env;

async fn spa_fallback() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(include_str!("../../index.html"))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    let port: u16 = env::var("PORT")
        .unwrap_or_else(|_| "8888".to_string())
        .parse()
        .expect("PORT must be a number");

    let bind = format!("0.0.0.0:{}", port);

    info!("Class Website (Rust) running at http://localhost:{}/", port);
    info!("Tailscale: http://100.103.66.24:{}/", port);

    HttpServer::new(|| {
        App::new()
            .wrap(Compress::default())
            .wrap(
                DefaultHeaders::new()
                    .add(("X-Content-Type-Options", "nosniff"))
                    .add(("X-Frame-Options", "DENY"))
                    .add(("X-XSS-Protection", "1; mode=block"))
                    .add(("Referrer-Policy", "strict-origin-when-cross-origin"))
            )
            .service(
                Files::new("/", ".")
                    .prefer_utf8(true)
                    .index_file("index.html")
                    .default_handler(web::to(spa_fallback))
            )
    })
    .workers(num_cpus::get().max(2))
    .bind(&bind)?
    .run()
    .await
}
