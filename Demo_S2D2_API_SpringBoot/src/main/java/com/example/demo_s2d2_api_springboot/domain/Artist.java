package com.example.demo_s2d2_api_springboot.domain;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity//le dice al progeama que esto va a una base de datos
public class Artist {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE) //Cada vez que se cree un nuevo artista se le asignará automaticamente un id
    private Long id;
    @Column     //ES necesario resaltar que los artibutos de la clase tienen que ser reconocido como clumnas
    private String name;
    @Column
    private String bio;
    @Column
    private String birthDate;
}
