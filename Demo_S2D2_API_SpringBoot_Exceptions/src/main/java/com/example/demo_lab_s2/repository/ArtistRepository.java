package com.example.demo_lab_s2.repository;

import com.example.demo_lab_s2.domain.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, Long> {
    Artist findByName(String name); //útil para ResourceConflictException
    //Artist findById(String id); //útil para ArtistNotFoundException
    //No es necesario usar findById, xq JPA ya lo tiene incluido, lollamará automaticamente
}
