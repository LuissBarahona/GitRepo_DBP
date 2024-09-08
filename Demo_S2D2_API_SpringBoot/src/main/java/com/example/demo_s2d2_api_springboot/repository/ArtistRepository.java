package com.example.demo_s2d2_api_springboot.repository;

import com.example.demo_s2d2_api_springboot.domain.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, Long> { //Parece que nos hemos conectado con el atributo Artist que yace en domain

}
