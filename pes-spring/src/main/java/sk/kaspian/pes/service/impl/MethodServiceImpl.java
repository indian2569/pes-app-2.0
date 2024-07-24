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
import sk.kaspian.pes.mapper.MethodMapper;
import sk.kaspian.pes.model.User;
import sk.kaspian.pes.openapi.model.v1.Method;
import sk.kaspian.pes.repository.MethodRepository;
import sk.kaspian.pes.repository.UserRepository;
import sk.kaspian.pes.service.MethodService;

@Service
@AllArgsConstructor
public class MethodServiceImpl implements MethodService {

	@NonNull
	private MethodRepository methodRepository;

	@Autowired
	private UserRepository userRepository;

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
		sk.kaspian.pes.model.Method map = methodMapper.map(method);
		map.setActive(Boolean.TRUE);
		fillSavableFields(map);
		return methodMapper.map(methodRepository.save(map));
	}

	@Override
	@Transactional
	public Method updateMethod(Method method) {
		sk.kaspian.pes.model.Method map = methodMapper.map(method);
		fillSavableFields(map);
		return methodMapper.map(methodRepository.save(map));
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

	@Override
	public List<Method> getAllActiveMethods() {
		return methodMapper.map(methodRepository.findByActiveTrue());
	}

	private void fillSavableFields(sk.kaspian.pes.model.Method updatable) {
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
