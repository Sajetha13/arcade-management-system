package com.example.arcade_system.Exception;

public class MachineNotFoundException extends RuntimeException{
    public MachineNotFoundException(String message) {
        super(message);
    }
}
