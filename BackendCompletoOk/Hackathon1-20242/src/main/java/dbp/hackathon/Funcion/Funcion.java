package dbp.hackathon.Funcion;

import com.fasterxml.jackson.annotation.JsonBackReference;
import dbp.hackathon.Ticket.Ticket;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Funcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private String descripcion;

    private LocalDateTime fecha;

    private Integer duracion;

    private Double precio;

    private Integer stock;

    @JsonBackReference
    @OneToMany(mappedBy = "funcion")
    private List<Ticket> tickets;

    public String getNombrePelicula() {
        return nombre;
    }
    public String getFechaPelicula() {

        // Suponiendo que ticket.getFuncion().getFecha() devuelve un LocalDateTime
        // Definir el formato deseado
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        // Convertir LocalDateTime a String
        String fechaComoString = fecha.format(formatter);

        return fechaComoString;
    }

    public double getPrecioPelicula() {
        return precio;
    }
}
