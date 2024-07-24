package sk.kaspian.pes.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import sk.kaspian.pes.mapper.ProgramMapper;
import sk.kaspian.pes.model.User;
import sk.kaspian.pes.openapi.model.v1.Program;
import sk.kaspian.pes.repository.ProgramRepository;
import sk.kaspian.pes.repository.UserRepository;
import sk.kaspian.pes.service.ProgramService;

@Service
@AllArgsConstructor
public class ProgramServiceImpl implements ProgramService {

	@NonNull
	private ProgramRepository programRepository;

	@Autowired
	private UserRepository userRepository;

	private ProgramMapper programMapper;

	@Override
	@Transactional(readOnly = true)
	@Cacheable(value = "allProgramCache", key = "'allData'")
	public List<sk.kaspian.pes.openapi.model.v1.Program> getAllPrograms() {
		return programMapper.map(programRepository.findAll());
	}

	@Override
	@Transactional
	public void removeProgram(Long id) {
		programRepository.deleteById(id);
	}

	@Override
	@Transactional
	public sk.kaspian.pes.openapi.model.v1.Program createProgram(Program program) {
		sk.kaspian.pes.model.Program map = programMapper.map(program);
		map.setActive(Boolean.TRUE);
		fillSavableFields(map);
		return programMapper.map(programRepository.save(map));
	}

	@Override
	@Transactional
	public sk.kaspian.pes.openapi.model.v1.Program updateProgram(Program program) {
		sk.kaspian.pes.model.Program map = programMapper.map(program);
		fillSavableFields(map);
		return programMapper.map(programRepository.save(map));
	}

	@Override
	@Transactional(readOnly = true)
	public sk.kaspian.pes.openapi.model.v1.Program getProgramById(Long id) {
		return programMapper.map(programRepository.getOne(id));
	}

	@Override
	@Transactional
	public sk.kaspian.pes.openapi.model.v1.Program deactivateProgram(Long id) {
		sk.kaspian.pes.model.Program program = programRepository.getOne(id);
		program.setActive(Boolean.FALSE);
		return programMapper.map(programRepository.save(program));
	}

	@Override
	public List<Program> getAllActivePrograms() {
		return programMapper.map(programRepository.findByActiveTrue());
	}

	private void fillSavableFields(sk.kaspian.pes.model.Program updatable) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		Long id = userDetails.getId();
		User changedPerson = userRepository.getReferenceById(id);
		if (updatable.getCreated() == null) {
			updatable.setCreated(LocalDateTime.now());
			updatable.setCreatedBy(changedPerson);
		}
		updatable.setUpdated(LocalDateTime.now());
		updatable.setLastChange(changedPerson);
	}
}
