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
import sk.kaspian.pes.openapi.model.v1.Program;
import sk.kaspian.pes.openapi.server.controller.v1.ProgramApi;
import sk.kaspian.pes.service.ProgramService;

@RestController
@RequiredArgsConstructor
@Timed
@CrossOrigin(origins = {"http://localhost:4200", "http://64.226.108.218:4200"})
public class ProgramController implements ProgramApi {

	@NonNull
	private ProgramService programService;
	
	@Override
	public ResponseEntity<Void> deletePrograms(String code) {
		programService.removeProgram(Long.valueOf(code));
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@Override
	public ResponseEntity<List<Program>> getAllPrograms() {
		return ResponseEntity.ok(programService.getAllPrograms());
	}

	@Override
	public ResponseEntity<Program> getPrograms(String code) {
		return ResponseEntity.ok(programService.getProgramById(Long.valueOf(code)));
	}

	@Override
	public ResponseEntity<Program> savePrograms(@Valid Program program) {
		return ResponseEntity.ok(programService.updateProgram(program));
	}

}
