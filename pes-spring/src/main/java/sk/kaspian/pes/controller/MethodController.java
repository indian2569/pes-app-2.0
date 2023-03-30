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
import sk.kaspian.pes.openapi.model.v1.Method;
import sk.kaspian.pes.openapi.server.controller.v1.MethodApi;
import sk.kaspian.pes.service.MethodService;

@RestController
@RequiredArgsConstructor
@Timed
@CrossOrigin(origins = {"http://localhost:4200", "http://64.226.108.218:4200"})
public class MethodController implements MethodApi {

	@NonNull
	private MethodService methodService;
	
	@Override
	public ResponseEntity<Void> deleteMethods(String code) {
		methodService.removeMethod(Long.valueOf(code));
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@Override
	public ResponseEntity<List<Method>> getAllMethods() {
		return ResponseEntity.ok(methodService.getAllMethods());
	}

	@Override
	public ResponseEntity<Method> getMethods(String code) {
		return ResponseEntity.ok(methodService.getMethodById(Long.valueOf(code)));
	}

	@Override
	public ResponseEntity<Method> saveMethods(@Valid Method method) {
		return ResponseEntity.ok(methodService.updateMethod(method));
	}

}
