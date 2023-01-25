package sk.kaspian.pes.service;

import java.util.List;

import sk.kaspian.pes.openapi.model.v1.Campaign;

public interface CampaigneService {
	
	/**
	 * Function return all compaignes created
	 * @return {@link List} {@link CampaigneService} list of campaignes
	 */
	List<Campaign> getAllCompaignes();
	
	/**
	 * Remove campaigne base on ID
	 * @param id {@link Long} id of campaigne
	 */
	
	void removeCampaigne(Long id);
	
	/**
	 * Create Campaign
	 * @param campaigne {@link Campaign} object to crate
	 * @return {@link Campaign} return created object
	 */
	Campaign createCampaigne(Campaign campaigne);
	
	/**
	 * update Campaigne
	 * @param campaigne {@link Campaign} campainge with update values
	 * @return {@link Campaign} updated Campaigne
	 */
	Campaign updateCampaigne(Campaign campaigne);
	
	/**
	 * Return object base on id 
	 * @param id {@link Long} id of Campaign
	 * @return {@link Campaign} base on id
	 */
	Campaign getCampaigneById(Long id);
	
	/**
	 * Function that deactivate Campaigne
	 * 
	 * @param id {@link Long} id of Campaigne
	 */
	void deactivateCampaigne(Long id);

}
