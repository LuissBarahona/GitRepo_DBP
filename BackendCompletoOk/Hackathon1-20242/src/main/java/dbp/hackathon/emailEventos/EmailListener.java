package dbp.hackathon.emailEventos;

import dbp.hackathon.Ticket.TicketDTO;
import dbp.hackathon.Ticket.TicketService;
import dbp.hackathon.email.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;

@Component
public class EmailListener {

    @Autowired
    private EmailService emailService;

    @Autowired
    private TicketService ticketService;


    private TicketDTO ticketDTO;

    //Método que rellene los placeholders del html
    public String generarEmailHtml(String tickedId, String nombre, String nombrePelicula, String fechaFuncion, int cantidadEntradas, double precioTotal, String qr) {
        String qrImageUrl = "/qr_" + tickedId + ".png";

        String emailHtml = "<!DOCTYPE html>\n" +
                "<html>\n" +
                "<head>\n" +
                "  <title>¡Gracias por tu compra!</title>\n" +
                "</head>\n" +
                "<body>\n" +
                "  <h1>¡Gracias por tu compra!</h1>\n" +
                "  <h1> TICKED ID: {{tickedId}}</h1>\n" +
                "  <h2> LINK QR: {{qr}}</h2>\n" +
                "  <p>¡Hola {{nombre}}! Te informamos que tu compra ha sido exitosa. A continuación, te presentamos los detalles de tu compra:</p>\n" +
                "  <ul>\n" +
                "    <li>Nombre de la película: {{nombrePelicula}}</li>\n" +
                "    <li>Fecha de la función: {{fechaFuncion}}</li>\n" +
                "    <li>Cantidad de entradas: {{cantidadEntradas}}</li>\n" +
                "    <li>Precio total: {{precioTotal}}</li>\n" +
                "    <li>Código QR: <img src=\"" + qrImageUrl + "\"></li>\n"+
                "    <li>Código QR: <img src=\"{{qr}}\"></li>\n" +
                "  </ul>\n" +
                "  <p>¡No olvides llevar tu código QR impreso o en tu dispositivo móvil para poder ingresar a la función! ¡Te esperamos!</p>\n" +
                "</body>\n" +
                "</html>";

        emailHtml = emailHtml.replace("{{tickedId}}", tickedId)
                .replace("{{nombre}}", nombre)
                .replace("{{nombrePelicula}}", nombrePelicula)
                .replace("{{fechaFuncion}}", fechaFuncion)
                .replace("{{cantidadEntradas}}", String.valueOf(cantidadEntradas))
                .replace("{{precioTotal}}", String.format("%.2f", precioTotal))
                .replace("{{qr}}", qr); //tiene que ser una ruta a una imagen

        return emailHtml;
    }

    @EventListener
    @Async
    public void handleHelloEmailEvent(HelloEmailEvent event) throws MessagingException, jakarta.mail.MessagingException {

        String contenidoTxt = "mensaje simple en formato string - no html";
        //CODE ADICIONAL PARA ENVIAR HTML
        // Preparar contenido del correo
        String destinatario = "luis.barahona@utec.edu.pe"; // Puedes extraer esto del ticketDTO si lo necesitas
        String asunto = "Confirmación de Ticket creado desde EmailListener";
        String contenidoHTML = generarEmailHtml(event.getTickedId().toString(), event.getNombre(), event.getNombrePelicula(), event.getFechaFuncion(), event.getCantidadEntradas(), event.getPrecioTotal(), event.getQr());

        // Enviar el correo usando el EmailService - usa SimpleMessage - funciona
        //emailService.sendSimpleMessage(destinatario, asunto, contenidoTxt);

        //Enviar correo usando mimemessage
        emailService.enviarCorreoHTML(destinatario,asunto,contenidoHTML);
        //FIN DE CODE ADICIONAL
    }
}