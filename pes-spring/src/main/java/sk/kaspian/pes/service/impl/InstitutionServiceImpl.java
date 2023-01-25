package sk.kaspian.pes.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import sk.kaspian.pes.mapper.InstitutionMapper;
import sk.kaspian.pes.openapi.model.v1.Institution;
import sk.kaspian.pes.repository.InstitutionRepository;
import sk.kaspian.pes.service.InstitutionService;

@Service
@AllArgsConstructor
public class InstitutionServiceImpl implements InstitutionService{

	@NonNull
	private InstitutionRepository institutionRepository;

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
		return institutionMapper.map(institutionRepository.save(institutionMapper.map(institution)));
	}

	@Override
	@Transactional
	public Institution updateInstitution(Institution institution) {
		return institutionMapper.map(institutionRepository.save(institutionMapper.map(institution)));
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

}
