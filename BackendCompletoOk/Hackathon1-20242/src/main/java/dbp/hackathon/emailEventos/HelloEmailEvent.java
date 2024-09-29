package dbp.hackathon.emailEventos;

import org.springframework.context.ApplicationEvent;


public class HelloEmailEvent extends ApplicationEvent {
    private final Long tickedId;
    private final String nombre;
    private final String nombrePelicula;
    private final String fechaFuncion;
    private final int cantidadEntradas;
    private final double precioTotal;
    private final String qr;

    public HelloEmailEvent(Long tickedId, String nombre, String nombrePelicula, String fechaFuncion, int cantidadEntradas, double precioTotal, String qr) { //String email
        super(tickedId);
        this.tickedId = tickedId;
        this.nombre = nombre;
        this.nombrePelicula = nombrePelicula;
        this.fechaFuncion = fechaFuncion;
        this.cantidadEntradas = cantidadEntradas;
        this.precioTotal = precioTotal;
        this.qr = qr;
    }

    public Long getTickedId() {
        return tickedId;
    }

    public String getNombre() {
        return nombre;
    }

    public String getNombrePelicula() {
        return nombrePelicula;
    }

    public String getFechaFuncion() {
        return fechaFuncion;
    }

    public int getCantidadEntradas() {
        return cantidadEntradas;
    }

    public double getPrecioTotal() {
        return precioTotal;
    }

    public String getQr() {
        return qr;
    }
}
