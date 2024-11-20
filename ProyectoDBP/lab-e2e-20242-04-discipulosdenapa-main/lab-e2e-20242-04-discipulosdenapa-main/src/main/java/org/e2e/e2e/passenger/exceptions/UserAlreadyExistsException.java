package org.e2e.e2e.passenger.exceptions;

public class UserAlreadyExistsException extends RuntimeException {
    UserAlreadyExistsException(String message) {
        super(message);
    }
}