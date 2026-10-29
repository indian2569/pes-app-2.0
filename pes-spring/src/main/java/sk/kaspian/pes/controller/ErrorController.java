package sk.kaspian.pes.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;

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
		map.put("status", request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE));
		map.put("message", request.getAttribute(RequestDispatcher.ERROR_MESSAGE));
		map.put("path", request.getAttribute(RequestDispatcher.ERROR_REQUEST_URI));
		return map;
	}

}