package sk.kaspian.pes.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import sk.kaspian.pes.mapper.CoworkerMapper;
import sk.kaspian.pes.openapi.model.v1.Coworker;
import sk.kaspian.pes.repository.CoworkerRepository;
import sk.kaspian.pes.service.CoworkerService;

@Service
@AllArgsConstructor
public class CoworkerServiceImpl implements CoworkerService {

	@NonNull
	private CoworkerRepository coworkerRepository;

	private CoworkerMapper coworkerMapper;

	@Override
	@Transactional(readOnly = true)
	public List<Coworker> getAllCompaignes() {
		return coworkerMapper.map(coworkerRepository.findAll());
	}

	@Override
	public void removeCoworker(Long id) {
		coworkerRepository.deleteById(id);
	}

	@Override
	public Coworker createCoworker(Coworker coworker) {
		return coworkerMapper.map(coworkerRepository.save(coworkerMapper.map(coworker)));
	}

	@Override
	public Coworker updateCoworker(Coworker coworker) {
		return coworkerMapper.map(coworkerRepository.save(coworkerMapper.map(coworker)));
	}

	@Override
	@Transactional(readOnly = true)
	public Coworker getCoworkerById(Long id) {
		return coworkerMapper.map(coworkerRepository.getOne(id));
	}

	@Override
	public Coworker deactivateCoworker(Long id) {
		sk.kaspian.pes.model.Coworker coworker = coworkerRepository.getOne(id);
		coworker.setActive(Boolean.FALSE);
		return coworkerMapper.map(coworkerRepository.save(coworker));
	}

}
