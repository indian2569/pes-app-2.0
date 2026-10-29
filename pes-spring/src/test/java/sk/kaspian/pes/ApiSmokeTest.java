package sk.kaspian.pes;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

class ApiSmokeTest extends AbstractIntegrationTest {

	@Test
	void contextLoadsAndFlywayMigrates() throws Exception {
		mockMvc.perform(get("/actuator/health")).andExpect(status().isUnauthorized());
	}

	@Test
	void publicEndpointIsOpen() throws Exception {
		mockMvc.perform(get("/api/test/all")).andExpect(status().isOk());
	}

	@Test
	void openApiDocumentIsServed() throws Exception {
		mockMvc.perform(get("/v3/api-docs")).andExpect(status().isOk());
	}

	@Test
	void protectedEndpointRequiresToken() throws Exception {
		mockMvc.perform(get("/api/card/allCards")).andExpect(status().isUnauthorized());
	}

	@Test
	void registerLoginAndCallProtectedEndpoint() throws Exception {
		String user = """
				{"username":"smoke","email":"smoke@test.com","password":"Passw0rd!"}""";
		mockMvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON).content(user))
				.andExpect(status().isOk());

		String login = """
				{"username":"smoke","password":"Passw0rd!"}""";
		String body = mockMvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON).content(login))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").isNotEmpty())
				.andReturn().getResponse().getContentAsString();
		String token = com.fasterxml.jackson.databind.json.JsonMapper.builder().build().readTree(body).get("token").asText();

		mockMvc.perform(get("/api/card/allCards").header("Authorization", "Bearer " + token))
				.andExpect(status().isOk());
	}
}
