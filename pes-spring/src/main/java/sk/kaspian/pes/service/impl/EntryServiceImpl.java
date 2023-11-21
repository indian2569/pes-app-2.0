package sk.kaspian.pes.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import sk.kaspian.pes.mapper.EntryMapper;
import sk.kaspian.pes.model.User;
import sk.kaspian.pes.openapi.model.v1.Card;
import sk.kaspian.pes.openapi.model.v1.Entry;
import sk.kaspian.pes.repository.EntryRepository;
import sk.kaspian.pes.service.EntryService;

@Service
@AllArgsConstructor
public class EntryServiceImpl implements EntryService {

	@NonNull
	private EntryRepository entryRepository;

	private EntryMapper entryMapper;

	@Override
	@Transactional(readOnly = true)
	public List<Entry> getAllEntrys() {
		return entryMapper.map(entryRepository.findAll());
	}

	@Override
	@Transactional
	public void removeEntry(Long id) {
		entryRepository.deleteById(id);
	}

	@Override
	@Transactional
	public Entry createEntry(Entry entryInput) {
		sk.kaspian.pes.model.Entry mapp = entryMapper.map(entryInput);
		Entry create =  entryMapper.map(entryRepository.save(mapp));
		return create;
	}

	@Override
	@Transactional
	public Entry updateEntry(Entry entryInput) {
		sk.kaspian.pes.model.Entry map = entryMapper.map(entryInput);
		sk.kaspian.pes.model.Entry save = entryRepository.save(map);
		return entryMapper.map(save);
	}

	@Override
	@Transactional(readOnly = true)
	public Entry getEntryById(Long id) {
		sk.kaspian.pes.model.Entry one = entryRepository.getReferenceById(id);
		return entryMapper.map(one);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Entry> getAllForCard(Card card) {
		List<Long> entryIds = new ArrayList<>();
		//entryIds.addAll(entryRepository.getAllEntrysIdByCardForClients(card.getId().longValue()));
		//entryIds.addAll(entryRepository.getAllEntrysIdByCardForClientsOnSite(card.getId().longValue()));
		//return entryMapper.map(entryRepository.getAllEntrysMatchingListOfIds(entryIds));
		return entryIds;
	}

	@Override
	public List<Entry> getLastFiveEntrysForUser(User user) {
		return entryMapper.map(entryRepository.getFiveNewestEntryForUser(user.getId()));
	}

}
