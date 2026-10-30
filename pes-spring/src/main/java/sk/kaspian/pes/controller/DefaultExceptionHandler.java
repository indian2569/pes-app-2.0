package sk.kaspian.pes.controller;

import java.io.IOException;
import java.util.NoSuchElementException;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.ConstraintViolationException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import lombok.extern.slf4j.Slf4j;
import sk.kaspian.pes.openapi.model.v1.MessageResponse;

@Slf4j
@RestControllerAdvice
public class DefaultExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(EmptyResultDataAccessException.class)
	public ResponseEntity<Object> handleEntityNotFound(Exception ex, WebRequest request) {
		return new ResponseEntity<>("Entity not found", new HttpHeaders(), HttpStatus.GONE);
	}

	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<Object> handleJpaEntityNotFound(EntityNotFoundException ex, WebRequest request) {
		log.info("Handling EntityNotFoundException: {}", ex.getMessage());
		return new ResponseEntity<>("Entity not found", new HttpHeaders(), HttpStatus.NOT_FOUND);
	}

	// e.g. deleting a client card, method or coworker that an entry still uses (foreign keys from V04)
	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<MessageResponse> handleDataIntegrityViolation(DataIntegrityViolationException ex, WebRequest request) {
		log.info("Handling DataIntegrityViolationException: {}", ex.getMostSpecificCause().getMessage());
		return new ResponseEntity<>(new MessageResponse().message(
				"Záznam sa nedá uložiť ani vymazať, pretože súvisí s inými záznamami."), HttpStatus.CONFLICT);
	}

	@ExceptionHandler(ConstraintViolationException.class)
	public void handleConstraintViolationException(ConstraintViolationException exception, HttpServletResponse response)
			throws IOException {
		response.sendError(HttpStatus.BAD_REQUEST.value(), exception.getMessage());
	}

	@ExceptionHandler(NoSuchElementException.class)
	public ResponseEntity<Object> handleMissingElement(NoSuchElementException ex, WebRequest request) {
		log.info("Handling NoSuchElementException: {}", ex.getMessage());
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(RestClientResponseException.class)
	public void handleRestClientResponseException(RestClientResponseException ex,  HttpServletResponse response) throws IOException {
		log.info("Handling RestClientResponseException: {}", ex.getMessage());
		response.sendError(ex.getRawStatusCode(), ex.getResponseBodyAsString());
	}

	@ExceptionHandler(ResourceAccessException.class)
	public void handleRestClientGlobalException(ResourceAccessException ex,  HttpServletResponse response) throws IOException {
		log.info("Handling ResourceAccessException: {}", ex.getMessage());		
		response.sendError(HttpStatus.BAD_GATEWAY.value(), ex.getMessage());
	}

	@ExceptionHandler(RestClientException.class)
	public void handleRectClientException(RestClientException ex,  HttpServletResponse response) throws IOException {
		log.info("Handling RestClientException: {}", ex.getMessage());		
		response.sendError(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
	}

}
