package sk.kaspian.pes.controller;

import java.io.IOException;
import java.time.Instant;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;

import io.micrometer.core.annotation.Timed;

@Controller
@Timed
public class OpenAPIController {

	@Value("classpath:openapi/pes.yaml")
	private Resource yamlFile;
	
	@Value("#{buildProperties.get('version')}") 
	private String version;

	@Value("#{buildProperties.get('time')}") 
	private Long buildDate;
	
	@GetMapping(path = "/v3/api-docs", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<String> getApiDocs(HttpServletRequest request) throws IOException {

		var yamlReader = new ObjectMapper(new YAMLFactory());
	    var obj = yamlReader.readValue(yamlFile.getInputStream(), Object.class);

	    return ResponseEntity.ok(new ObjectMapper().writeValueAsString(obj)
    		.replace("{\"url\":\"https://pes.kaspian.sk/v1\"}", 
				"{\"url\":\""+ ServletUriComponentsBuilder.fromCurrentContextPath().build() + "\"}"));
	}
	
	@GetMapping("/")
	public String getRapiDocs(Model model) {
		model.addAttribute("buildDate", buildDate == null ? Instant.now() : Instant.ofEpochMilli(buildDate));
		model.addAttribute("version", version);
		return "rapidocs";
	}	
}
