package dbp.hackathon.Ticket;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import dbp.hackathon.Estudiante.Estudiante;
import dbp.hackathon.Funcion.Funcion;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String qr;
    private Estado estado;

    @ManyToOne
    @JoinColumn(name = "funcion_id")
    private Funcion funcion;

    @ManyToOne
    @JoinColumn(name = "estudiante_id")
    private Estudiante estudiante;

    private LocalDateTime fechaCompra;
    private Integer cantidad;


    public String getNombreEstudiante() {
        return estudiante.getName();
    }

    public String getNombrePelicula() {
        return funcion.getNombrePelicula();
    }

    public String getFechaCompra() {
        // Crear un objeto LocalDate
        // Definir el formato deseado
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        // Convertir LocalDate a String
        String formattedDate = fechaCompra.format(formatter);
        return formattedDate;
    }

    public double getPrecioTotal() { //esto debería calcular el precio total, pero estamos retornano el precio de 1 sola  pelicula registrada
        return funcion.getPrecioPelicula();
    }
}

