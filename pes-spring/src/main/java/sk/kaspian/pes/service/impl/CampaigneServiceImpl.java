package sk.kaspian.pes.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import sk.kaspian.pes.mapper.CampaigneMapper;
import sk.kaspian.pes.model.Campaigne;
import sk.kaspian.pes.openapi.model.v1.Campaign;
import sk.kaspian.pes.repository.CampaigneRepository;
import sk.kaspian.pes.service.CampaigneService;

@Service
@AllArgsConstructor
public class CampaigneServiceImpl implements CampaigneService{

	@NonNull
	private CampaigneRepository campaigneRepository;

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
		return campaigneMapper.map(campaigneRepository.save(campaigneMapper.map(campaigne)));
	}

	@Override
	@Transactional
	public Campaign updateCampaigne(Campaign campaigne) {
		return campaigneMapper.map(campaigneRepository.save(campaigneMapper.map(campaigne)));
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

}
