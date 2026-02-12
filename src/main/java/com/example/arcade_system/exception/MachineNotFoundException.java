package com.example.arcade_system.exception;

public class MachineNotFoundException extends RuntimeException{
    public MachineNotFoundException(String message) {
        super(message);
    }
}
