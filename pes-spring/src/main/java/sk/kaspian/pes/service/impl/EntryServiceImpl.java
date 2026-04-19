package sk.kaspian.pes.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import sk.kaspian.pes.mapper.EntryMapper;
import sk.kaspian.pes.model.CardSpecifications;
import sk.kaspian.pes.model.EntryFilter;
import sk.kaspian.pes.model.EntrySpecifications;
import sk.kaspian.pes.model.User;
import sk.kaspian.pes.openapi.model.v1.Card;
import sk.kaspian.pes.openapi.model.v1.Entry;
import sk.kaspian.pes.repository.EntryRepository;
import sk.kaspian.pes.repository.UserRepository;
import sk.kaspian.pes.service.EntryService;

import javax.persistence.EntityNotFoundException;

@Service
@AllArgsConstructor
public class EntryServiceImpl implements EntryService {

	@NonNull
	private EntryRepository entryRepository;

	private EntryMapper entryMapper;

	@Autowired
	private UserRepository userRepository;

	@Override
	@Transactional(readOnly = true)
	public List<Entry> getAllEntrys(EntryFilter filter) {
		Specification<sk.kaspian.pes.model.Entry> spec = Specification.where(EntrySpecifications.withPlace(filter.getPlace()))
				.and(EntrySpecifications.withCampaign(filter.getCampaign()))
				.and(EntrySpecifications.withYearFrom(filter.getYearfrom()))
				.and(EntrySpecifications.withYearTo(filter.getYearto()))
				.and(EntrySpecifications.withProgram(filter.getProgram()))
				.and(EntrySpecifications.withAuthor(filter.getAuthor()));

		// Handle sorting
		Sort sort = Sort.by("id"); // Default sorting by id
		if (filter.getSort() != null && !filter.getSort().isEmpty()) {
			sort = Sort.by(Sort.Order.asc(filter.getSort()));
		}

		// Handle pagination
		Pageable pageable = PageRequest.of(filter.getPageNumber(), filter.getPageSize(), sort);

		return entryMapper.map(entryRepository.findAll(spec, pageable).getContent());
	}

	@Override
	@Transactional
	public void removeEntry(Long id) {
		entryRepository.deleteById(id);
	}

	@Override
	@Transactional
	public Entry createEntry(Entry entryInput) {
		sk.kaspian.pes.model.Entry map = entryMapper.map(entryInput);
		fillSavableFields(map);
		return entryMapper.map(entryRepository.save(map));
	}

	@Override
	@Transactional
	public Entry updateEntry(Entry entryInput) {
		sk.kaspian.pes.model.Entry map = entryMapper.map(entryInput);
		fillSavableFields(map);
		return entryMapper.map(entryRepository.save(map));
	}

	@Override
	@Transactional(readOnly = true)
	public Entry getEntryById(Long id) {
		sk.kaspian.pes.model.Entry one = entryRepository.getReferenceById(id);
		return entryMapper.map(one);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Entry> getAllEntrysForCardMain(Card card) {
		List<Entry> entryIds = new ArrayList<>();
		List<Long> allEntrysIdByCardForClients = entryRepository.getAllEntrysIdByCardForClients(card.getId().longValue());
		entryIds.addAll(entryMapper.map(entryRepository.getAllEntrysMatchingListOfIds(allEntrysIdByCardForClients)));
		return entryIds;
	}

	@Override
	@Transactional(readOnly = true)
	public List<Entry> getAllEntrysForCardOnSite(Card card) {
		List<Entry> entryIds = new ArrayList<>();
		List<Long> allEntrysIdByCardForClientsOnSite = entryRepository.getAllEntrysIdByCardForClientsOnSite(card.getId().longValue());
		entryIds.addAll(entryMapper.map(entryRepository.getAllEntrysMatchingListOfIds(allEntrysIdByCardForClientsOnSite)));
		return entryIds;
	}

	@Override
	@Transactional(readOnly = true)
	public List<Entry> getLastFiveEntrysForUser(User user) {
		return entryMapper.map(entryRepository.getFiveNewestEntryForUser(user.getId()));
	}

	@Override
	@Transactional(readOnly = true)
	public List<Entry> getListOfNewEntrys(Optional<Integer> pageSize) {
		PageRequest pageable = PageRequest.of(0, pageSize.orElse(5));
		return entryMapper.map(entryRepository.findAll(pageable).getContent());
	}

	private void fillSavableFields(sk.kaspian.pes.model.Entry updatable) {
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
