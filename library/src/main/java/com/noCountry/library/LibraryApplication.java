package com.noCountry.library;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.UUID;

@SpringBootApplication
public class LibraryApplication {

	public static void main(String[] args) {
		SpringApplication.run(LibraryApplication.class, args);


			String uuidString = generateRandomUUID();
			System.out.println("UUID generado: " + uuidString);


	}
	public static String generateRandomUUID() {
		UUID uuid = UUID.randomUUID();
		return uuid.toString();
	}

}
