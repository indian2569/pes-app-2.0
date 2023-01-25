package sk.kaspian.pes.service;

import java.util.List;

import sk.kaspian.pes.openapi.model.v1.Program;

public interface ProgramService {

	/**
	 * Function return all Programs created
	 * @return {@link List} {@link Program} list of Programs
	 */
	List<sk.kaspian.pes.openapi.model.v1.Program> getAllPrograms();

	/**
	 * Remove object base of id
	 * @param id {@link Long} id of Program
	 */

	void removeProgram(Long id);

	/**
	 * Crate object Program
	 * @param program {@link Program} object to create
	 * @return Program created object
	 */
	sk.kaspian.pes.openapi.model.v1.Program createProgram(Program program);

	/**
	 * Update Program
	 * @param program {@link Program} object with update value
	 * @return {@link Program} update object
	 */
	sk.kaspian.pes.openapi.model.v1.Program updateProgram(Program program);

	/**
	 * Get object base of id
	 * @param id {@link Long} id of Program
	 * @return {@link Program} object base of id
	 */
	sk.kaspian.pes.openapi.model.v1.Program getProgramById(Long id);

	/**
	 * Function deactivate object Program
	 * 
	 * @param id {@link Long} id of Program
	 * @return {@link Program} changed object
	 */
	sk.kaspian.pes.openapi.model.v1.Program deactivateProgram(Long id);

}
