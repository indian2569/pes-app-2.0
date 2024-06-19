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
import sk.kaspian.pes.mapper.CampaigneMapper;
import sk.kaspian.pes.model.Campaigne;
import sk.kaspian.pes.model.Card;
import sk.kaspian.pes.model.User;
import sk.kaspian.pes.openapi.model.v1.Campaign;
import sk.kaspian.pes.repository.CampaigneRepository;
import sk.kaspian.pes.repository.UserRepository;
import sk.kaspian.pes.service.CampaigneService;

@Service
@AllArgsConstructor
public class CampaigneServiceImpl implements CampaigneService{

	@NonNull
	private CampaigneRepository campaigneRepository;

	@Autowired
	private UserRepository userRepository;


	private CampaigneMapper campaigneMapper;

	@Override
	@Transactional(readOnly = true)
	public List<Campaign> getAllCompaignes() {
		return campaigneMapper.map(campaigneRepository.findAll());
	}

	@Override
	@Transactional
	public void removeCampaigne(Long id) {
		campaigneRepository.deleteById(id);
	}

	@Override
	@Transactional
	public Campaign createCampaigne(Campaign campaigne) {
		Campaigne map = campaigneMapper.map(campaigne);
		map.setActive(Boolean.TRUE);
		fillSavableFields(map);
		return campaigneMapper.map(campaigneRepository.save(map));
	}

	@Override
	@Transactional
	public Campaign updateCampaigne(Campaign campaigne) {
		Campaigne map = campaigneMapper.map(campaigne);
		fillSavableFields(map);
		return campaigneMapper.map(campaigneRepository.save(map));
	}

	@Override
	@Transactional(readOnly = true)
	public Campaign getCampaigneById(Long id) {
		return campaigneMapper.map(campaigneRepository.getOne(id));
	}

	@Override
	@Transactional
	public void deactivateCampaigne(Long id) {
		Campaigne campaine = campaigneRepository.getOne(id);
		campaine.setActive(Boolean.FALSE);
		campaigneRepository.save(campaine);
	}

	private void fillSavableFields(Campaigne updatable) {
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
