package sk.kaspian.pes.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import sk.kaspian.pes.mapper.ProgramMapper;
import sk.kaspian.pes.openapi.model.v1.Program;
import sk.kaspian.pes.repository.ProgramRepository;
import sk.kaspian.pes.service.ProgramService;

@Service
@AllArgsConstructor
public class ProgramServiceImpl implements ProgramService {

	@NonNull
	private ProgramRepository programRepository;

	private ProgramMapper programMapper;

	@Override
	@Transactional(readOnly = true)
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
		return programMapper.map(programRepository.save(programMapper.map(program)));
	}

	@Override
	@Transactional
	public sk.kaspian.pes.openapi.model.v1.Program updateProgram(Program program) {
		return programMapper.map(programRepository.save(programMapper.map(program)));
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

}
