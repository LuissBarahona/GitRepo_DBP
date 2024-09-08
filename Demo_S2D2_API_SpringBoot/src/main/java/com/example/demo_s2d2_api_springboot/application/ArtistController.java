package com.example.demo_s2d2_api_springboot.application;

import com.example.demo_s2d2_api_springboot.domain.Artist;
import com.example.demo_s2d2_api_springboot.repository.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/artist") //Definición del endpoint
public class ArtistController {

    //EJEMPLO DE INYECCIÓN DE DEPENDENCIAS
    @Autowired
    private ArtistRepository artistRepository; //trae los métodos de la clase ArtistRepository
    //FIN DE INYECCIÓN DE DEPENDENCIAS

    @PostMapping //SI el cliente hace un post, podrá crear un artista en la base de datos
    public ResponseEntity<Artist> createArtist(@RequestBody Artist artist) {
        Artist savedArtist = artistRepository.save(artist);
        return ResponseEntity.ok(savedArtist);
    }

    @GetMapping //SI el cliente hace un get en /artist podrá obtener un json de todos los artistas en la abse de datos cuy entidad en Artist
    public ResponseEntity<List<Artist>> getArtists() {
        List<Artist> artistas = artistRepository.findAll();
        return ResponseEntity.ok(artistas);
    }

    @GetMapping("/test") //localhost:8080/artist/test
    public ResponseEntity<String> getApi(){
        String respuesta = "Hola Lucho";
        return ResponseEntity.ok(respuesta);
    }
}
