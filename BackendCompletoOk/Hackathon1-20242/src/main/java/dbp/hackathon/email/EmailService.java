package dbp.hackathon.email;


import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;


@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    //Método para mandar un correo en formato texto - funciona
    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }


    //Método mpara mandar correo (HTML) usando mimemessage - funciona
    public void enviarCorreoHTML(String destinatario, String asunto, String contenidoHTML) throws MessagingException, jakarta.mail.MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(destinatario);
        helper.setSubject(asunto);
        helper.setText(contenidoHTML, true); // El segundo parámetro `true` indica que el contenido es HTML

        mailSender.send(message);
    }




}
