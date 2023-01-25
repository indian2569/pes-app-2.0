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
import sk.kaspian.pes.openapi.model.v1.Institution;
import sk.kaspian.pes.openapi.server.controller.v1.InstitutionApi;
import sk.kaspian.pes.service.InstitutionService;

@RestController
@RequiredArgsConstructor
@Timed
@CrossOrigin(origins = "http://localhost:4200")
public class InstitutionController implements InstitutionApi {

	@NonNull
	private InstitutionService institutionService;
	
	@Override
	public ResponseEntity<Void> deleteInstitutions(String code) {
		institutionService.removeInstitution(Long.valueOf(code));
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@Override
	public ResponseEntity<List<Institution>> getAllInstitutions() {
		return ResponseEntity.ok(institutionService.getAllInstitutions());
	}

	@Override
	public ResponseEntity<Institution> getInstitutions(String code) {
		return ResponseEntity.ok(institutionService.getInstitutionById(Long.valueOf(code)));
	}

	@Override
	public ResponseEntity<Institution> saveInstitutions(@Valid Institution institution) {
		return ResponseEntity.ok(institutionService.updateInstitution(institution));
	}

}
