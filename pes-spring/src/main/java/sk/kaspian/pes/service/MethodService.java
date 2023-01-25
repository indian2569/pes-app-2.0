package sk.kaspian.pes.service;

import java.util.List;

import sk.kaspian.pes.openapi.model.v1.Method;

public interface MethodService {

	/**
	 * Function return all Methods created
	 * @return {@link List} {@link Method} list of Methods
	 */
	List<Method> getAllMethods();
	
	/**
	 * Rmove object base of id
	 * @param id {@link Long} id of Method
	 */
	
	void removeMethod(Long id);
	
	/**
	 * Crate object Method
	 * @param method {@link Method} object to create
	 * @return Method created object
	 */
	Method createMethod(Method method);
	
	/**
	 * Update Method
	 * @param method {@link Method} object with update value
	 * @return {@link Method} update object
	 */
	Method updateMethod(Method method);
	
	/**
	 * Get object base of id
	 * @param id {@link Long} id of Method
	 * @return {@link Method} object base of id
	 */
	Method getMethodById(Long id);
	
	/**
	 * Function deactivate object Method
	 * 
	 * @param id {@link Long} id of Method
	 * @return {@link Method} changed object
	 */
	Method deactivateMethod(Long id);
}
