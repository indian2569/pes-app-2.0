package sk.kaspian.pes.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ErrorController {
	
	@NonNull
	private ObjectMapper objectMapper;

	@PostMapping("/error")
	@ResponseBody
	public Map<String, Object> handle(HttpServletRequest request) {

		Map<String, Object> map = new HashMap<>();
		map.put("timestamp", LocalDateTime.now());
		map.put("status", request.getAttribute("javax.servlet.error.status_code"));
		map.put("message", request.getAttribute("javax.servlet.error.message"));
		map.put("path", request.getPathInfo());
		return map;
	}

}