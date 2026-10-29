package sk.kaspian.pes;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.hasItem;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import sk.kaspian.pes.model.PersonFilterRequest;
import sk.kaspian.pes.service.CardService;

class ApiSmokeTest extends AbstractIntegrationTest {

	@Autowired
	private CardService cardService;

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
				.andExpect(jsonPath("$.roles", contains("ROLE_USER")))
				.andReturn().getResponse().getContentAsString();
		String token = com.fasterxml.jackson.databind.json.JsonMapper.builder().build().readTree(body).get("token").asText();

		mockMvc.perform(get("/api/card/allCards").header("Authorization", "Bearer " + token))
				.andExpect(status().isOk());
	}

	@Test
	void registrationAlwaysGrantsOnlyUserRole() throws Exception {
		String user = """
				{"username":"wannabe","email":"wannabe@test.com","password":"Passw0rd!","roles":["admin","mod"]}""";
		mockMvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON).content(user))
				.andExpect(status().isOk());

		String login = """
				{"username":"wannabe","password":"Passw0rd!"}""";
		mockMvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON).content(login))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.roles", contains("ROLE_USER")));
	}

	@Test
	void filterEntrysWithoutCriteriaReturnsList() throws Exception {
		mockMvc.perform(post("/api/entry/filter").header("Authorization", "Bearer " + token("entries")))
				.andExpect(status().isOk());
	}

	@Test
	void savedProgramIsVisibleInCachedList() throws Exception {
		String auth = "Bearer " + token("programs");
		mockMvc.perform(get("/api/program/allPrograms").header("Authorization", auth))
				.andExpect(status().isOk());

		mockMvc.perform(post("/api/program/save").header("Authorization", auth)
				.contentType(MediaType.APPLICATION_JSON).content("""
						{"name":"cache-check","description":"evict me"}"""))
				.andExpect(status().isOk());

		mockMvc.perform(get("/api/program/allPrograms").header("Authorization", auth))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[*].name", hasItem("cache-check")));
	}

	@Test
	void cardFilterUsesEntityAttributes() {
		PersonFilterRequest filter = new PersonFilterRequest();
		filter.setName("nobody");
		filter.setSex("M");
		filter.setActive(true);
		filter.setTimeFrom(LocalDate.of(1950, 1, 1));
		filter.setTimeTo(LocalDate.of(2020, 1, 1));
		filter.setCreatedBy("admin");

		assertThat(cardService.filterCard(filter)).isEmpty();
	}

	private String token(String username) throws Exception {
		mockMvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON).content("""
				{"username":"%s","email":"%s@test.com","password":"Passw0rd!"}""".formatted(username, username)));
		String body = mockMvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON).content("""
				{"username":"%s","password":"Passw0rd!"}""".formatted(username)))
				.andExpect(status().isOk())
				.andReturn().getResponse().getContentAsString();
		return com.fasterxml.jackson.databind.json.JsonMapper.builder().build().readTree(body).get("token").asText();
	}
}
