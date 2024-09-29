package dbp.hackathon.email;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

@Service
public class EmailService3 {

    @Autowired
    private JavaMailSender mailSender;

    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

    public String loadEmailTemplate(String nombre, String nombrePelicula, String fechaFuncion, int cantidadEntradas, double precioTotal, String qr) {
        StringBuilder contentBuilder = new StringBuilder();
        String absolutePath = "/home/luisbarahona/Documents/CreatedByBarahona/Repositories_Code/DBP_Repository/Historial_Hackatones/Hackaton2/Hackathon1-20242/src/main/resources/templates/template.html";
        try {
            File file = new File(absolutePath);
            BufferedReader reader = new BufferedReader(new FileReader(file));
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
