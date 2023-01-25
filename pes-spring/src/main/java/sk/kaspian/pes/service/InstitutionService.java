package sk.kaspian.pes.service;

import java.util.List;

import sk.kaspian.pes.openapi.model.v1.Institution;


public interface InstitutionService {

	/**
	 * Function return all Institutions created
	 * @return {@link List} {@link Institution} list of Institutions
	 */
	List<Institution> getAllInstitutions();
	
	/**
	 * Remove object Institution base on Id
	 * @param id {@link Long} id of Institution
	 */
	
	void removeInstitution(Long id);
	
	/**
	 * Create Institution
	 * @param institution object that we want to create
	 * @return {@link Institution}
	 */
	Institution createInstitution(Institution institution);
	
	/**
	 * update Institution
	 * @param institution object with update values
	 * @return {@link Institution} updated object
	 */
	Institution updateInstitution(Institution institution);
	
	/**
	 * Return object base on id
	 * @param id {@link Long} id of object
	 * @return {@link Institution} object base on id
	 */
	Institution getInstitutionById(Long id);
	
	/**
	 * Function deactivate Institution
	 * 
	 * @param id {@link Long} id of Institution
	 * @return {@link Institution} update object
	 */
	Institution deactivateInstitution(Long id);
}
