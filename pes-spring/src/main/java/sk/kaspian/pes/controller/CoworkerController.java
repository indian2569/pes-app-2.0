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
import sk.kaspian.pes.openapi.model.v1.Coworker;
import sk.kaspian.pes.openapi.server.controller.v1.CoworkerApi;
import sk.kaspian.pes.service.CoworkerService;

@RestController
@RequiredArgsConstructor
@Timed
@CrossOrigin(origins = {"http://localhost:4200", "http://64.226.108.218:4200"})
public class CoworkerController implements CoworkerApi {

	@NonNull
	private CoworkerService coworkerService;
	
	@Override
	public ResponseEntity<Void> deleteCoworker(String code) {
		coworkerService.removeCoworker(Long.valueOf(code));
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@Override
	public ResponseEntity<List<Coworker>> getAllCoworker() {
		return ResponseEntity.ok(coworkerService.getAllCompaignes());
	}

	@Override
	public ResponseEntity<Coworker> getCoworker(String code) {
		return ResponseEntity.ok(coworkerService.getCoworkerById(Long.valueOf(code)));
	}

	@Override
	public ResponseEntity<Coworker> saveCoworker(@Valid Coworker coworker) {
		return ResponseEntity.ok(coworkerService.updateCoworker(coworker));
	}

}
