package demo;

import java.io.InputStream;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	CommandLineRunner seedPeople(PersonRepository personRepository) {
		return args -> {
			if (personRepository.count() > 0) {
				return;
			}

			System.out.print(personRepository.count());

			ObjectMapper mapper = new ObjectMapper();
			TypeReference<List<Person>> typeReference = new TypeReference<List<Person>>() {
			};
			InputStream inputStream = TypeReference.class.getResourceAsStream("/people.json");

			List<Person> brands = mapper.readValue(inputStream, typeReference);
			personRepository.saveAll(brands);
		};
	}
}
