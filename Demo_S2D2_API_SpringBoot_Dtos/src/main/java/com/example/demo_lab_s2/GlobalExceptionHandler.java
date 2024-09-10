package com.example.demo_lab_s2;
// Define el paquete al que pertenece la clase. En este caso, pertenece a la aplicación demo_lab_s2.

import com.example.demo_lab_s2.exceptions.ErrorMessage;
// Importa la clase ErrorMessage que probablemente representa el cuerpo del mensaje de error que será devuelto como respuesta.

import com.example.demo_lab_s2.exceptions.ResourceNotFoundException;
// Importa la excepción personalizada ResourceNotFoundException que será lanzada cuando un recurso no se encuentre.

import org.springframework.http.HttpStatus;
// Importa la enumeración HttpStatus que define los códigos de estado HTTP, como 404 (NOT_FOUND).

import org.springframework.http.ResponseEntity;
// Importa la clase ResponseEntity, que es utilizada para representar la respuesta HTTP completa, incluidas cabeceras, cuerpo y estado.

import org.springframework.web.bind.annotation.ExceptionHandler;
// Importa la anotación ExceptionHandler, que se utiliza para definir un método que manejará una excepción específica.

import org.springframework.web.bind.annotation.RestControllerAdvice;
// Importa RestControllerAdvice, que indica que esta clase proporciona manejo global de excepciones para los controladores REST de toda la aplicación.

@RestControllerAdvice
// La anotación @RestControllerAdvice indica que esta clase manejará excepciones en todos los controladores REST.
// Esto proporciona un manejo de excepciones global y unificado para toda la aplicación.

public class GlobalExceptionHandler {
    // Define la clase GlobalExceptionHandler, que es el manejador global de excepciones.

    @ExceptionHandler(ResourceNotFoundException.class)
    // El método anotado con @ExceptionHandler será invocado cuando se lance una excepción del tipo ResourceNotFoundException.
    // Esto vincula esta excepción a un método específico que se encargará de manejarla.

    public ResponseEntity<ErrorMessage> handleResourceNotFoundException(ResourceNotFoundException e){
        // El método que maneja la excepción. Recibe como parámetro la excepción lanzada (en este caso, ResourceNotFoundException).
        // Retorna una respuesta HTTP del tipo ResponseEntity que contiene un objeto de tipo ErrorMessage.

        ErrorMessage error = new ErrorMessage(e.getMessage(), HttpStatus.NOT_FOUND.toString());
        // Se crea un nuevo objeto ErrorMessage que encapsula el mensaje de error.
        // El mensaje es obtenido a partir de la excepción (e.getMessage()), y se le asigna el código de estado HTTP 404 (NOT_FOUND).

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        // Devuelve una respuesta HTTP con un estado 404 (NOT_FOUND) y el cuerpo del mensaje de error (error).
        // El método status(HttpStatus.NOT_FOUND) establece el código de estado HTTP de la respuesta.
        // El método body(error) define el cuerpo de la respuesta que será el objeto ErrorMessage.
    }
}
