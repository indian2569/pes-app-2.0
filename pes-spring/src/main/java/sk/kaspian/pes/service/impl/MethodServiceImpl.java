package sk.kaspian.pes.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import sk.kaspian.pes.mapper.MethodMapper;
import sk.kaspian.pes.openapi.model.v1.Method;
import sk.kaspian.pes.repository.MethodRepository;
import sk.kaspian.pes.service.MethodService;

@Service
@AllArgsConstructor
public class MethodServiceImpl implements MethodService {

	@NonNull
	private MethodRepository methodRepository;

	private MethodMapper methodMapper;

	@Override
	@Transactional(readOnly = true)
	public List<Method> getAllMethods() {
		return methodMapper.map(methodRepository.findAll());
	}

	@Override
	@Transactional
	public void removeMethod(Long id) {
		methodRepository.deleteById(id);
	}

	@Override
	@Transactional
	public Method createMethod(Method method) {
		return methodMapper.map(methodRepository.save(methodMapper.map(method)));
	}

	@Override
	@Transactional
	public Method updateMethod(Method method) {
		return methodMapper.map(methodRepository.save(methodMapper.map(method)));
	}

	@Override
	@Transactional(readOnly = true)
	public Method getMethodById(Long id) {
		return methodMapper.map(methodRepository.getOne(id));
	}

	@Override
	@Transactional
	public Method deactivateMethod(Long id) {
		sk.kaspian.pes.model.Method method = methodRepository.getOne(id);
		method.setActive(Boolean.FALSE);
		return methodMapper.map(methodRepository.save(method));
	}

}
