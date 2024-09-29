package dbp.hackathon.Ticket;

import dbp.hackathon.emailEventos.HelloEmailEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;


    //pata mandar correos usando eventos
    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody TicketRequest request) {
        Ticket newTicket = ticketService.createTicket(request.getEstudianteId(), request.getFuncionId(), request.getCantidad());

        // Publicar el evento para mandar el correo

        return ResponseEntity.ok(newTicket);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable Long id) {
        Ticket ticket = ticketService.findById(id);
        if (ticket == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ticket);
    }

    @GetMapping("/estudiante/{estudianteId}")
    public ResponseEntity<Iterable<Ticket>> getTicketsByEstudianteId(@PathVariable Long estudianteId) {
        Iterable<Ticket> tickets = ticketService.findByEstudianteId(estudianteId);
        return ResponseEntity.ok(tickets);
    }

    @PatchMapping("/{id}/changeState")
    public ResponseEntity<?> changeTicketState(@PathVariable Long id) {
        try {
            ticketService.changeState(id);
            return ResponseEntity.ok().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable Long id) {
        ticketService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<Iterable<Ticket>> getAllTickets() {
        return ResponseEntity.ok(ticketService.findAll());
    }



    /*
    @PostMapping("/sendEmailTxt") //crea un ticket y manda un email en formato txt
    public ResponseEntity<String> sendEmailTxt(@RequestBody TicketRequest request) { //@RequestParam String email
        Ticket newTicket = ticketService.createTicket(request.getEstudianteId(), request.getFuncionId(), request.getCantidad());
        applicationEventPublisher.publishEvent(new HelloEmailEvent(newTicket.getId())); //email
        return ResponseEntity.ok("¡Hola mundo 4 - id!");
    }
    */

    /*


    @PostMapping("/sendEmailHtml") //crea un ticket y manda un email en formato html
    public ResponseEntity<String> sendEmailHtml(@RequestBody TicketRequest request) { //@RequestParam String email
        Ticket newTicket = ticketService.createTicket(request.getEstudianteId(), request.getFuncionId(), request.getCantidad());
        applicationEventPublisher.publishEvent(new HelloEmailEvent(newTicket.getId())); //email
        return ResponseEntity.ok("¡Hola mundo 4 - id!");
    }
     */

    @PostMapping("/sendEmailHtmlDatos") //crea un ticket y manda un email en formato html y datos en placeholders
    public ResponseEntity<String> sendEmailHtml(@RequestBody TicketRequest request) { //@RequestParam String email
        Ticket newTicket = ticketService.createTicket(request.getEstudianteId(), request.getFuncionId(), request.getCantidad());
        //crear QR
            //llamar a una función en ticketService que covierta el id del ticket en un QR y retorne la ruta de la imagen QR
        String rutaQr=ticketService.createQR(newTicket.getId()); //ejemplo
        newTicket.setQr(rutaQr);
        applicationEventPublisher.publishEvent(new HelloEmailEvent(newTicket.getId(),  newTicket.getNombreEstudiante(), newTicket.getNombrePelicula(), newTicket.getFechaCompra(), newTicket.getCantidad(), newTicket.getPrecioTotal(),  newTicket.getQr())); //email
        return ResponseEntity.ok("¡Hola mundo 5 - id!");
    }
}
