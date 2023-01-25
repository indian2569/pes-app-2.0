package sk.kaspian.pes.service;

import java.util.List;

import sk.kaspian.pes.openapi.model.v1.Coworker;

public interface CoworkerService {
	
	/**
	 * Function return all compaignes created
	 * @return {@link List} {@link Coworker} list of Coworkers
	 */
	List<Coworker> getAllCompaignes();
	
	/**
	 * Rmove object base of id
	 * @param id {@link Long} id of Coworker
	 */
	
	void removeCoworker(Long id);
	
	/**
	 * Crate object Coworker
	 * @param coworker {@link Coworker} object to create
	 * @return Coworker created object
	 */
	Coworker createCoworker(Coworker coworker);
	
	/**
	 * Uuppdadte Coworker
	 * @param coworker {@link Coworker} object with update value
	 * @return {@link Coworker} update object
	 */
	Coworker updateCoworker(Coworker coworker);
	
	/**
	 * Get object base of id
	 * @param id {@link Long} id of Coworker
	 * @return {@link Coworker} object base of id
	 */
	Coworker getCoworkerById(Long id);
	
	/**
	 * Function deactivate object Coworker
	 * 
	 * @param id {@link Long} id of Coworker
	 * @return {@link Coworker} changed object
	 */
	Coworker deactivateCoworker(Long id);

}
