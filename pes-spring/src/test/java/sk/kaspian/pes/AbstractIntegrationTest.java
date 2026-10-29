package sk.kaspian.pes;

import org.junit.jupiter.api.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.PostgreSQLContainer;

@Tag("it")
@SpringBootTest
@AutoConfigureMockMvc
public abstract class AbstractIntegrationTest {

	static final PostgreSQLContainer<?> POSTGRES = new PostgreSQLContainer<>("postgres:13.4-alpine");

	static {
		POSTGRES.start();
	}

	@DynamicPropertySource
	static void datasource(DynamicPropertyRegistry registry) {
		registry.add("spring.datasource.url", () -> POSTGRES.getJdbcUrl() + "&currentSchema=pes");
		registry.add("spring.datasource.username", POSTGRES::getUsername);
		registry.add("spring.datasource.password", POSTGRES::getPassword);
		registry.add("spring.flyway.schemas", () -> "pes");
		registry.add("spring.flyway.create-schemas", () -> "true");
	}

	@Autowired
	protected MockMvc mockMvc;
}
