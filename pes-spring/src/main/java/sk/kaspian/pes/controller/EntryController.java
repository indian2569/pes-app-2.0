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
import sk.kaspian.pes.model.User;
import sk.kaspian.pes.openapi.model.v1.Card;
import sk.kaspian.pes.openapi.model.v1.Entry;
import sk.kaspian.pes.openapi.server.controller.v1.EntryApi;
import sk.kaspian.pes.service.EntryService;

@CrossOrigin(origins = {"http://localhost:4200", "http://64.226.108.218:4200"})
@RestController
@RequiredArgsConstructor
@Timed
public class EntryController implements EntryApi {

	@NonNull
	private EntryService entryService;

	@Override
	public ResponseEntity<Void> deleteEntry(String code) {
		entryService.removeEntry(Long.valueOf(code));
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@Override
	public ResponseEntity<List<Entry>> getAllEntry() {
		return ResponseEntity.ok(entryService.getAllEntrys());
	}

	@Override
	public ResponseEntity<Entry> getEntry(String code) {
		return ResponseEntity.ok(entryService.getEntryById(Long.valueOf(code)));
	}

	@Override
	public ResponseEntity<Entry> saveEntry(@Valid Entry entry) {
		return ResponseEntity.ok(entryService.updateEntry(entry));
	}

	@Override
	public ResponseEntity<List<Entry>> getAllCardEntrys(@Valid Card card) {
		return ResponseEntity.ok(entryService.getAllForCard(card));
	}

	@Override
	public ResponseEntity<List<Entry>> getNewUserEntrys() {
		User user = new User();
		return ResponseEntity.ok(entryService.getLastFiveEntrysForUser(user));
	}

}
