package com.example.demo_lab_s2.controller;

import com.example.demo_lab_s2.domain.Artist;
import com.example.demo_lab_s2.exceptions.ArtistNotFoundException;
import com.example.demo_lab_s2.exceptions.ResourceConflictException;
import com.example.demo_lab_s2.repository.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/artist")
public class ArtistController {
    @Autowired
    ArtistRepository artistRepository;

    @PostMapping
    public ResponseEntity<Artist> createArtist(@RequestBody Artist artist){
        /*
        Artist savedArtist = artistRepository.save(artist);
        return ResponseEntity.ok(savedArtist);
         */
        Artist result = artistRepository.findByName(artist.getName());
        if (result != null){
            throw new ResourceConflictException("Artist already exist");
        }
        Artist savedArtist = artistRepository.save(artist);
        return ResponseEntity.ok(savedArtist);
    }

    @GetMapping
    public ResponseEntity<List<Artist>> getAllArtists(){
        List<Artist> allArtists = artistRepository.findAll();
        return ResponseEntity.ok(allArtists);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Artist> getArtistById(@PathVariable Long id) {
        Optional<Artist> artist = artistRepository.findById(id);

        if (artist.isPresent()) {
            return ResponseEntity.ok(artist.get());
        } else {
            throw new ArtistNotFoundException("Artista con id " + id + " no encontrado.");
        }
    }


    @GetMapping("/test")
    public ResponseEntity<String> getApi(){
        String respuesta = "Hola";
        return ResponseEntity.ok(respuesta);
    }
}
