package sk.kaspian.pes.api.rest.impl;

import org.springframework.web.bind.annotation.RestController;

import sk.kaspian.pes.api.rest.VariableResources;

import sk.kaspian.pes.service.CampaigneService;
import sk.kaspian.pes.service.CardService;
import sk.kaspian.pes.service.CoworkerService;
import sk.kaspian.pes.service.EntryService;
import sk.kaspian.pes.service.EventService;
import sk.kaspian.pes.service.InstitutionService;
import sk.kaspian.pes.service.MethodService;
import sk.kaspian.pes.service.ProgramService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
public class VariableResourcesImpl implements VariableResources{

	
    @NonNull
    private CampaigneService campaigneService;
    
    @NonNull
    private CardService cardService;
    
    @NonNull
    private CoworkerService coworkerService;
    
    @NonNull
    private EntryService entryService;
    
    @NonNull
    private EventService eventService;
    
    @NonNull
    private InstitutionService institutionService;
    
    @NonNull
    private MethodService methodService;

    
    @NonNull
    private ProgramService programService;


}
