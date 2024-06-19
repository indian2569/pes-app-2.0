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
import sk.kaspian.pes.mapper.InstitutionMapper;
import sk.kaspian.pes.model.Campaigne;
import sk.kaspian.pes.model.User;
import sk.kaspian.pes.openapi.model.v1.Institution;
import sk.kaspian.pes.repository.InstitutionRepository;
import sk.kaspian.pes.repository.UserRepository;
import sk.kaspian.pes.service.InstitutionService;

@Service
@AllArgsConstructor
public class InstitutionServiceImpl implements InstitutionService{

	@NonNull
	private InstitutionRepository institutionRepository;

	@Autowired
	private UserRepository userRepository;

	private InstitutionMapper institutionMapper;

	@Override
	@Transactional(readOnly = true)
	public List<Institution> getAllInstitutions() {
		return institutionMapper.map(institutionRepository.findAll());
	}

	@Override
	@Transactional
	public void removeInstitution(Long id) {
		institutionRepository.deleteById(id);
	}

	@Override
	@Transactional
	public Institution createInstitution(Institution institution) {
		sk.kaspian.pes.model.Institution map = institutionMapper.map(institution);
		map.setActive(Boolean.TRUE);
		fillSavableFields(map);
		return institutionMapper.map(institutionRepository.save(map));
	}

	@Override
	@Transactional
	public Institution updateInstitution(Institution institution) {
		sk.kaspian.pes.model.Institution map = institutionMapper.map(institution);
		fillSavableFields(map);
		return institutionMapper.map(institutionRepository.save(map));
	}

	@Override
	@Transactional(readOnly = true)
	public Institution getInstitutionById(Long id) {
		return institutionMapper.map(institutionRepository.getOne(id));
	}

	@Override
	@Transactional
	public Institution deactivateInstitution(Long id) {
		sk.kaspian.pes.model.Institution institution = institutionRepository.getOne(id);
		institution.setActive(Boolean.FALSE);
		return institutionMapper.map(institutionRepository.save(institution));
	}

	private void fillSavableFields(sk.kaspian.pes.model.Institution updatable) {
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
