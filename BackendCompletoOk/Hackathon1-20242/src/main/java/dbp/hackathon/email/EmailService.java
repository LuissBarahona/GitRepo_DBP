package dbp.hackathon.email;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

    // Método para cargar la plantilla de correo y reemplazar los placeholders
    public String loadEmailTemplate(String nombre, String nombrePelicula, String fechaFuncion, int cantidadEntradas, double precioTotal, String qr) {
        StringBuilder contentBuilder = new StringBuilder();
        try {
            // Cargar la plantilla HTML del archivo
            ClassPathResource resource = new ClassPathResource("/home/luisbarahona/Documents/CreatedByBarahona/Repositories_Code/DBP_Repository/Historial_Hackatones/Hackaton2/Hackathon1-20242/src/main/resources");
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8)
            );
            String line;
            while ((line = reader.readLine()) != null) {
                contentBuilder.append(line).append("\n");
            }
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
            return "Error al cargar la plantilla de correo";
        }

        // Reemplazar los placeholders con los datos reales
        String emailBody = contentBuilder.toString();
        emailBody = emailBody.replace("{{nombre}}", nombre)
                .replace("{{nombrePelicula}}", nombrePelicula)
                .replace("{{fechaFuncion}}", fechaFuncion)
                .replace("{{cantidadEntradas}}", String.valueOf(cantidadEntradas))
                .replace("{{precioTotal}}", String.format("%.2f", precioTotal))
                .replace("{{qr}}", qr);

        return emailBody;
    }
}
