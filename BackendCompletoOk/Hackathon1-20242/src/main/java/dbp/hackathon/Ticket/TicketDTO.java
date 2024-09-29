package dbp.hackathon.Ticket;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
public class TicketDTO {
    private Long id;
    private String nombreEstudiante;
    private String nombrePelicula;
    private String fechaFuncion;
    private int cantidad;
    private double precioTotal;

    // Constructor, getters y setters
    public TicketDTO(Long id, String nombreEstudiante, String nombrePelicula, String fechaFuncion, int cantidad, double precioTotal) {
        this.id = id;
        this.nombreEstudiante = nombreEstudiante;
        this.nombrePelicula = nombrePelicula;
        this.fechaFuncion = fechaFuncion;
        this.cantidad = cantidad;
        this.precioTotal = precioTotal;
    }

    public String getNombreEstudiante() {
        return nombreEstudiante;
    }

    public String getNombrePelicula() {
        return nombrePelicula;
    }

    public String getFechaFuncion() {
        return fechaFuncion;
    }

    public String getCantidad() {
        return String.valueOf(cantidad);
    }

    public String getPrecioTotal() {
        return String.valueOf(precioTotal);
    }

    // Getters y Setters
}
