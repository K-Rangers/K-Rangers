package org.kmr.backend.attraction.exception;

public class AttractionNotFoundException extends RuntimeException {
    public AttractionNotFoundException(String message) {
        super(message);
    }
}
