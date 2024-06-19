package sk.kaspian.pes.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import sk.kaspian.pes.mapper.CoworkerMapper;
import sk.kaspian.pes.model.Campaigne;
import sk.kaspian.pes.model.User;
import sk.kaspian.pes.openapi.model.v1.Coworker;
import sk.kaspian.pes.repository.CoworkerRepository;
import sk.kaspian.pes.repository.UserRepository;
import sk.kaspian.pes.service.CoworkerService;

@Service
@AllArgsConstructor
public class CoworkerServiceImpl implements CoworkerService {

	@NonNull
	private CoworkerRepository coworkerRepository;

	@Autowired
	private UserRepository userRepository;

	private CoworkerMapper coworkerMapper;

	@Override
	@Transactional(readOnly = true)
	public List<Coworker> getAllCompaignes() {
		return coworkerMapper.map(coworkerRepository.findAll());
	}

	@Override
	@Transactional
	public void removeCoworker(Long id) {
		coworkerRepository.deleteById(id);
	}

	@Override
	@Transactional
	public Coworker createCoworker(Coworker coworker) {
		sk.kaspian.pes.model.Coworker map = coworkerMapper.map(coworker);
		map.setActive(Boolean.TRUE);
		fillSavableFields(map);
		return coworkerMapper.map(coworkerRepository.save(map));
	}

	@Override
	@Transactional
	public Coworker updateCoworker(Coworker coworker) {
		sk.kaspian.pes.model.Coworker map = coworkerMapper.map(coworker);
		fillSavableFields(map);
		return coworkerMapper.map(coworkerRepository.save(map));
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

	private void fillSavableFields(sk.kaspian.pes.model.Coworker updatable) {
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
