package com.example.demo_lab_s2.controller;

// Importaciones de clases necesarias para trabajar con artistas, manejo de DTOs (Data Transfer Objects),
// excepciones, repositorios, validaciones, y otras herramientas de Spring como ResponseEntity y ModelMapper.
import com.example.demo_lab_s2.domain.Artist;
import com.example.demo_lab_s2.dto.GetArtistResponseDto;
import com.example.demo_lab_s2.dto.NewArtistRequestDto;
import com.example.demo_lab_s2.exceptions.ResourceNotFoundException;
import com.example.demo_lab_s2.repository.ArtistRepository;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

// Anotación que marca esta clase como un controlador REST que manejará solicitudes HTTP.
@RestController
// Define la ruta base a la que las solicitudes HTTP se dirigirán dentro de este controlador.
@RequestMapping("/artist")
public class ArtistController {

    // Inyección automática del repositorio de artistas, que se encargará de interactuar con la base de datos.
    @Autowired
    ArtistRepository artistRepository;

    // Inyección automática de un ModelMapper, utilizado para mapear objetos de un tipo a otro.
    @Autowired
    private ModelMapper modelMapper;

    // Método que maneja las solicitudes POST para crear un nuevo artista en "/artist".
    // @PostMapping indica que este método responderá a solicitudes HTTP POST.
    @PostMapping
    // La solicitud incluirá un cuerpo que será convertido en un objeto NewArtistRequestDto, validado con @Valid.
    public ResponseEntity<Artist> createArtist(@Valid @RequestBody NewArtistRequestDto artist){

        // Se crea una nueva instancia de Artist (el modelo de dominio que representa al artista).
        Artist newArtist = new Artist();

        // ModelMapper mapea los campos del DTO (NewArtistRequestDto) a la nueva instancia de Artist.
        modelMapper.map(artist, newArtist);

        // Se guarda el nuevo artista en la base de datos a través del repositorio.
        Artist savedArtist = artistRepository.save(newArtist);

        // Se crea una URI con la ubicación del nuevo recurso, utilizando el ID del artista guardado.
        URI location = URI.create("/artist/" + savedArtist.getId());

        // Se retorna una respuesta HTTP 201 Created con la ubicación del nuevo recurso y el artista creado en el cuerpo.
        return ResponseEntity.created(location).body(savedArtist);
    }

    // Método que maneja las solicitudes GET para obtener todos los artistas en "/artist".
    @GetMapping
    public ResponseEntity<List<Artist>> getAllArtists(){
        // Se obtienen todos los artistas de la base de datos.
        List<Artist> allArtists = artistRepository.findAll();

        // Se retorna una respuesta HTTP 200 OK con la lista de todos los artistas.
        return ResponseEntity.ok(allArtists);
    }

    // Método que maneja las solicitudes GET para obtener un artista por su ID en "/artist/{id}".
    @GetMapping("{id}")
    public ResponseEntity<GetArtistResponseDto> getArtistById(@PathVariable Long id){
        // Se busca al artista en la base de datos por su ID.
        // Si no se encuentra, se lanza una excepción ResourceNotFoundException.
        Artist artist = artistRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Artist with id " + id + " not found"));

        // Se crea una instancia de GetArtistResponseDto para la respuesta.
        GetArtistResponseDto artistResponse = new GetArtistResponseDto();

        // Se mapea el objeto Artist a GetArtistResponseDto usando ModelMapper.
        modelMapper.map(artist, artistResponse);

        // Se itera sobre las canciones del artista y se añaden sus IDs a la lista en artistResponse.
        artist.getSongs().forEach(song -> artistResponse.getSongIdList().add(song.getId()));

        // Se retorna una respuesta HTTP 200 OK con el artista encontrado.
        return ResponseEntity.ok(artistResponse);
    }

    // Método de prueba que maneja solicitudes GET en "/artist/test".
    // Retorna una cadena de texto "Hola" como respuesta.
    @GetMapping("/test")
    public ResponseEntity<String> getApi(){
        String respuesta = "Hola";

        // Retorna una respuesta HTTP 200 OK con el texto "Hola".
        return ResponseEntity.ok(respuesta);
    }
}
