package org.e2e.e2e.passenger.application;

import org.e2e.e2e.passenger.domain.PassengerService;
import org.e2e.e2e.passenger.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/passenger")
public class PassengerController {

    private final PassengerService passengerService;

    @Autowired
    public PassengerController(PassengerService passengerService) {
        this.passengerService = passengerService;
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('ROLE_PASSENGER')")
    public ResponseEntity<PassengerSelfResponseDTO> getPassenger() {
        return ResponseEntity.ok(passengerService.getPassengerOwnInfo());
    }

    @PreAuthorize("hasRole('ROLE_PASSENGER') or hasRole('ROLE_DRIVER')")
    @GetMapping("/{id}")
    public ResponseEntity<PassengerResponseDTO> getPassenger(@PathVariable Long id) {
        return ResponseEntity.ok(passengerService.getPassengerInfo(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_PASSENGER')")
    public ResponseEntity<Void> deletePassenger(@PathVariable Long id) {
        passengerService.deletePassenger(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/me")
    @PreAuthorize("hasRole('ROLE_PASSENGER')")
    public ResponseEntity<Void> updatePassenger(@RequestBody PatchPassengerInfoDto passengerSelfResponseDTO) {
        passengerService.updatePassenger(passengerSelfResponseDTO);
        return ResponseEntity.ok().build();
    }


    @PostMapping("/places")
    @PreAuthorize("hasRole('ROLE_PASSENGER')")
    public ResponseEntity<Void> addPassengerPlace(@RequestBody NewPassengerLocationDTO passengerLocationResponseDTO) {
        String location = passengerService.addPassengerPlace(passengerLocationResponseDTO);
        URI locationHeader = URI.create(location);
        return ResponseEntity.created(locationHeader).build();
    }

    @GetMapping("/places")
    @PreAuthorize("hasRole('ROLE_PASSENGER')")
    public ResponseEntity<List<PassengerLocationResponseDTO>> getPassengerPlaces() {
        return ResponseEntity.ok(passengerService.getPassengerPlaces());
    }

    @DeleteMapping("/places/{coordinateId}")
    @PreAuthorize("hasRole('ROLE_PASSENGER')")
    public ResponseEntity<Void> deletePassengerPlace(@PathVariable Long coordinateId) {
        passengerService.deletePassengerPlace(coordinateId);
        return ResponseEntity.noContent().build();
    }
}
