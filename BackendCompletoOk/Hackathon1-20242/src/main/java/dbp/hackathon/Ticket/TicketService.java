package dbp.hackathon.Ticket;

import dbp.hackathon.Estudiante.Estudiante;
import dbp.hackathon.Estudiante.EstudianteRepository;
import dbp.hackathon.Funcion.Funcion;
import dbp.hackathon.Funcion.FuncionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private FuncionRepository funcionRepository;

    public Ticket createTicket(Long estudianteId, Long funcionId, Integer cantidad) {
        Estudiante estudiante = estudianteRepository.findById(estudianteId).orElse(null);
        Funcion funcion = funcionRepository.findById(funcionId).orElse(null);
        if (estudiante == null || funcion == null) {
            throw new IllegalStateException("Estudiante or Funcion not found!");
        }

        Ticket ticket = new Ticket();
        ticket.setEstudiante(estudiante);
        ticket.setFuncion(funcion);
        ticket.setCantidad(cantidad);
        ticket.setEstado(Estado.VENDIDO);
        ticket.setFechaCompra(LocalDateTime.now());
        ticket.setQr("GENERATED-QR-CODE");

        return ticketRepository.save(ticket);
    }

    public Ticket findById(Long id) {
        return ticketRepository.findById(id).orElse(null);
    }

    public void deleteById(Long id) {
        ticketRepository.deleteById(id);
    }

    public Iterable<Ticket> findAll() {
        return ticketRepository.findAll();
    }

    public Iterable<Ticket> findByEstudianteId(Long estudianteId) {
        return ticketRepository.findByEstudianteId(estudianteId);
    }

    public void changeState(Long id) {
        Ticket ticket = ticketRepository.findById(id).orElse(null);
        if (ticket == null) {
            throw new IllegalStateException("Ticket not found!");
        }
        ticket.setEstado(Estado.CANJEADO);
        ticketRepository.save(ticket);
    }
    //Mandar datos de Ticket a un DTO
    public TicketDTO getTicketDTOById(Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Ticket no encontrado"));

        // Crear y devolver el DTO
        return new TicketDTO(
                ticket.getId(),
                ticket.getNombreEstudiante(),
                ticket.getFuncion().getNombrePelicula(),
                ticket.getFuncion().getFechaPelicula(),
                ticket.getCantidad(),
                ticket.getFuncion().getPrecioPelicula()
        );
    }

    //FUNCIÓN PARA CREAR UN QR (INPUT: tickedId, OUTPUT: ruta de la imagen o QR)
    public String createQR(Long ticketId) {
        String baseUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";
        String data = "TicketID-" + ticketId;  // Generar los datos del QR usando el ticketId
        String fullUrl = baseUrl + data;
        String rutaQr = "src/main/resources/static/" + "qr_" + ticketId + ".png";  // Ruta donde se guardará la imagen QR

        try {
            // Crear la conexión a la URL
            URL url = new URL(fullUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            // Leer la respuesta (imagen) de la conexión
            InputStream inputStream = connection.getInputStream();
            FileOutputStream outputStream = new FileOutputStream(rutaQr);

            // Guardar la imagen descargada
            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }

            outputStream.close();
            inputStream.close();

            return rutaQr;  // Devolver la ruta donde se guardó la imagen

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

}
