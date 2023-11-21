package sk.kaspian.pes.mapper;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.mapstruct.Mapper;

import sk.kaspian.pes.model.*;
import sk.kaspian.pes.model.enums.ContactEnum;
import sk.kaspian.pes.openapi.model.v1.Campaign;
import sk.kaspian.pes.openapi.model.v1.Entry;

@Mapper(componentModel = "spring")
public interface EntryMapper {

	List<Entry> map(List<sk.kaspian.pes.model.Entry> findAll);

    default Entry map(sk.kaspian.pes.model.Entry one) {
        if ( one == null ) {
            return null;
        }

        Entry entry = new Entry();

        if ( one.getId() != null ) {
            entry.setId( BigDecimal.valueOf( one.getId() ) );
        }
        if (one.getClient() != null) {
            entry.setClient(cardListToCardList1(one.getClient()));
        }
        if (one.getClientsOnSite() != null) {
            entry.setClientsOnSite( cardListToCardList1( one.getClientsOnSite() ) );
        }
        if ( one.getEntryDateFrom() != null ) {
            entry.setEntryDateFrom( DateTimeFormatter.ISO_LOCAL_DATE_TIME.format( one.getEntryDateFrom() ) );
        }
        if ( one.getEntryDateTo() != null ) {
            entry.setEntryDateTo( DateTimeFormatter.ISO_LOCAL_DATE_TIME.format( one.getEntryDateTo() ) );
        }
        entry.setPlace( one.getPlace() );
        if ( one.getContactType() != null ) {
            entry.setContactType( one.getContactType().name() );
        }
        if (one.getCampaign() != null ){
            entry.setCampaign( campaigneToCampaign( one.getCampaign() ) );
        }
        if ( one.getProgramType() != null ){
            entry.setProgramType( programToProgram1( one.getProgramType() ) );
        }
        if ( one.getWorkMethods() != null ){
            entry.setWorkMethods( methodListToMethodList1( one.getWorkMethods() ) );
        }
        if ( one.getOtherWorkers() != null ){
            entry.setOtherWorkers( coworkerListToCoworkerList1( one.getOtherWorkers() ) );
        }
        entry.setEventDescription( one.getEventDescription() );
        entry.setFastMessage( one.getFastMessage() );

        return entry;
    }
	default sk.kaspian.pes.model.Entry  map(Entry entryInput) {
		if ( entryInput == null ) {
            return null;
        }

        sk.kaspian.pes.model.Entry entry = new sk.kaspian.pes.model.Entry();

        if ( entryInput.getId() != null ) {
            entry.setId( entryInput.getId().longValue() );
        }
        entry.setClient( cardListToCardList( entryInput.getClient() ) );
        entry.setClientsOnSite( cardListToCardList( entryInput.getClientsOnSite() ) );
        if ( entryInput.getEntryDateFrom() != null ) {
            entry.setEntryDateFrom( LocalDateTime.parse( entryInput.getEntryDateFrom() ) );
        }
        if ( entryInput.getEntryDateTo() != null ) {
            entry.setEntryDateTo( LocalDateTime.parse( entryInput.getEntryDateTo() ) );
        }
        entry.setPlace( entryInput.getPlace() );
        if ( entryInput.getContactType() != null ) {
            entry.setContactType( Enum.valueOf( ContactEnum.class, entryInput.getContactType() ) );
        }
        entry.setCampaign( campaignToCampaigne( entryInput.getCampaign() ) );
        entry.setProgramType( programToProgram( entryInput.getProgramType() ) );
        entry.setWorkMethods( methodListToMethodList( entryInput.getWorkMethods() ) );
        entry.setOtherWorkers( coworkerListToCoworkerList( entryInput.getOtherWorkers() ) );
        entry.setEventDescription( entryInput.getEventDescription() );
        entry.setFastMessage( entryInput.getFastMessage() );

        return entry;
	};

	List<Coworker> coworkerListToCoworkerList(@Valid List<sk.kaspian.pes.openapi.model.v1.Coworker> otherWorkers);

	List<Method> methodListToMethodList(@Valid List<sk.kaspian.pes.openapi.model.v1.Method> workMethods);

	List<Card> cardListToCardList(@Valid List<sk.kaspian.pes.openapi.model.v1.Card> client);

	Campaigne campaignToCampaigne(@Valid Campaign campaign);

	Program programToProgram(sk.kaspian.pes.openapi.model.v1.@Valid Program programType);

    private List<sk.kaspian.pes.openapi.model.v1.Coworker> coworkerListToCoworkerList1(List<Coworker> list) {
        if ( list == null ) {
            return null;
        }

        List<sk.kaspian.pes.openapi.model.v1.Coworker> list1 = new ArrayList<sk.kaspian.pes.openapi.model.v1.Coworker>( list.size() );
        for ( sk.kaspian.pes.model.Coworker coworker : list ) {
            list1.add( coworkerToCoworker( coworker ) );
        }

        return list1;
    }

    private sk.kaspian.pes.openapi.model.v1.Coworker coworkerToCoworker(sk.kaspian.pes.model.Coworker coworker) {
        if ( coworker == null ) {
            return null;
        }

        sk.kaspian.pes.openapi.model.v1.Coworker coworker1 = new sk.kaspian.pes.openapi.model.v1.Coworker();

        if ( coworker.getId() != null ) {
            coworker1.setId( String.valueOf( coworker.getId() ) );
        }
        coworker1.setName( coworker.getName() );
        coworker1.setDescription( coworker.getDescription() );
        coworker1.setPosition( coworker.getPosition() );
        coworker1.setActive( coworker.isActive() );

        return coworker1;
    }

    private sk.kaspian.pes.openapi.model.v1.Method methodToMethod1(Method method) {
        if ( method == null ) {
            return null;
        }

        sk.kaspian.pes.openapi.model.v1.Method method1 = new sk.kaspian.pes.openapi.model.v1.Method();

        if ( method.getId() != null ) {
            method1.setId( String.valueOf( method.getId() ) );
        }
        method1.setName( method.getName() );
        method1.setDescription( method.getDescription() );
        method1.setActive( method.isActive() );

        return method1;
    }

    private List<sk.kaspian.pes.openapi.model.v1.Method> methodListToMethodList1(List<Method> list) {
        if ( list == null ) {
            return null;
        }

        List<sk.kaspian.pes.openapi.model.v1.Method> list1 = new ArrayList<sk.kaspian.pes.openapi.model.v1.Method>( list.size() );
        for ( Method method : list ) {
            list1.add( methodToMethod1( method ) );
        }

        return list1;
    }

    private Campaign campaigneToCampaign(Campaigne campaigne) {
        if ( campaigne == null ) {
            return null;
        }

        Campaign campaign = new Campaign();

        if ( campaigne.getId() != null ) {
            campaign.setId( String.valueOf( campaigne.getId() ) );
        }
        campaign.setName( campaigne.getName() );
        campaign.setDescription( campaigne.getDescription() );
        campaign.setActive( campaigne.isActive() );

        return campaign;
    }

    private sk.kaspian.pes.openapi.model.v1.Program programToProgram1(Program program) {
        if ( program == null ) {
            return null;
        }

        sk.kaspian.pes.openapi.model.v1.Program program1 = new sk.kaspian.pes.openapi.model.v1.Program();

        if ( program.getId() != null ) {
            program1.setId( String.valueOf( program.getId() ) );
        }
        program1.setName( program.getName() );
        program1.setDescription( program.getDescription() );
        program1.setActive( program.isActive() );

        return program1;
    }

    private sk.kaspian.pes.openapi.model.v1.Card cardToCard1(sk.kaspian.pes.model.Card card) {
        if ( card == null ) {
            return null;
        }

        sk.kaspian.pes.openapi.model.v1.Card card1 = new sk.kaspian.pes.openapi.model.v1.Card();

        if ( card.getId() != null ) {
            card1.setId( BigDecimal.valueOf( card.getId() ) );
        }
        card1.setClientNick( card.getClientNick() );
        card1.setClientGender( card.getClientGender() );
        card1.setClientAnamnesis( card.getClientAnamnesis() );
        card1.setClientDevPlan( card.getClientDevPlan() );
        card1.setClientBirthYear( card.getClientBirthYear() );
        card1.setClientName( card.getClientName() );
        card1.setClientSurname( card.getClientSurname() );
        card1.setClientBirthDate( card.getClientBirthDate() );
        card1.setClientFamilyStatus( card.getClientFamilyStatus() );
        card1.setClientCitizenship( card.getClientCitizenship() );
        card1.setClientAddress( card.getClientAddress() );
        card1.setClientPhone( card.getClientPhone() );
        card1.setClientEmail( card.getClientEmail() );
        card1.setClientSocnet( card.getClientSocnet() );
        card1.setClientHealth( card.getClientHealth() );
        card1.setClientIncome( card.getClientIncome() );
        card1.setClientBelongings( card.getClientBelongings() );
        if (card1.getClientOtherInstitutes() != null) {
          card1.setClientOtherInstitutes(
          institutionListToInstitutionList1(card.getClientOtherInstitutes()));
        }
        card1.setCreatedBy( card.getCreatedBy() );
        if ( card.getStatus() != null ) {
            card1.setStatus( String.valueOf( card.getStatus() ) );
        }
        if ( card.getCreateDate() != null ) {
            card1.setCreateDate( DateTimeFormatter.ISO_LOCAL_DATE_TIME.format( card.getCreateDate() ) );
        }

        return card1;
    }

    private List<sk.kaspian.pes.openapi.model.v1.Card> cardListToCardList1(List<sk.kaspian.pes.model.Card> list) {
        if ( list == null ) {
            return null;
        }

        List<sk.kaspian.pes.openapi.model.v1.Card> list1 = new ArrayList<sk.kaspian.pes.openapi.model.v1.Card>( list.size() );
        for ( sk.kaspian.pes.model.Card card : list ) {
            list1.add( cardToCard1( card ) );
        }

        return list1;
    }
    private sk.kaspian.pes.openapi.model.v1.Institution institutionToInstitution1(Institution institution) {
        if ( institution == null ) {
            return null;
        }

        sk.kaspian.pes.openapi.model.v1.Institution institution1 = new sk.kaspian.pes.openapi.model.v1.Institution();

        if ( institution.getId() != null ) {
            institution1.setId( String.valueOf( institution.getId() ) );
        }
        institution1.setName( institution.getName() );
        institution1.setDescription( institution.getDescription() );
        institution1.setActive( institution.isActive() );

        return institution1;
    }

    private List<sk.kaspian.pes.openapi.model.v1.Institution> institutionListToInstitutionList1(List<Institution> list) {
        if ( list == null ) {
            return null;
        }

        List<sk.kaspian.pes.openapi.model.v1.Institution> list1 = new ArrayList<sk.kaspian.pes.openapi.model.v1.Institution>( list.size() );
        for ( Institution institution : list ) {
            list1.add( institutionToInstitution1( institution ) );
        }

        return list1;
    }
}
