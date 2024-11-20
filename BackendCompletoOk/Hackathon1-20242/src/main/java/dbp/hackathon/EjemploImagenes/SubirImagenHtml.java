package dbp.hackathon.EjemploImagenes;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SubirImagenHtml {

    @GetMapping("/pagina")
    public String mostrarPagina() {
        return "<!DOCTYPE html>"
                + "<html lang='es'>"
                + "<head>"
                + "<meta charset='UTF-8'>"
                + "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
                + "<title>Mi página con imagen</title>"
                + "</head>"
                + "<body>"
                + "<h1>Bienvenido a mi página web</h1>"
                + "<img src='/qr_29.png' alt='Descripción de la imagen'>"
                + "</body>"
                + "</html>";
    }
}
