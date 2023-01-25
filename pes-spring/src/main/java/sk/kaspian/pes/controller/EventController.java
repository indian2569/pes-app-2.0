package sk.kaspian.pes.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import io.micrometer.core.annotation.Timed;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import sk.kaspian.pes.openapi.model.v1.Event;
import sk.kaspian.pes.openapi.server.controller.v1.EventApi;
import sk.kaspian.pes.service.EventService;

@RestController
@RequiredArgsConstructor
@Timed
@CrossOrigin(origins = "http://localhost:4200")
public class EventController implements EventApi {

	@NonNull
	private EventService eventService;

	@Override
	public ResponseEntity<Void> deleteEvent(String code) {
		eventService.removeEvent(Long.valueOf(code));
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@Override
	public ResponseEntity<List<Event>> getAllEvent() {
		return ResponseEntity.ok(eventService.getAllEvents());
	}

	@Override
	public ResponseEntity<Event> getEvent(String code) {
		return ResponseEntity.ok(eventService.getEventById(Long.valueOf(code)));
	}

	@Override
	public ResponseEntity<Event> saveEvent(@Valid Event event) {
		return ResponseEntity.ok(eventService.updateEvent(event));
	}

}
