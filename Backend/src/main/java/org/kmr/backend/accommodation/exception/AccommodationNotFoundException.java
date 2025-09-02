package org.kmr.backend.accommodation.exception;

public class AccommodationNotFoundException extends RuntimeException {
    public AccommodationNotFoundException(String message) {
        super(message);
    }
}
