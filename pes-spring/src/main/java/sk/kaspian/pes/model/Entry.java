package sk.kaspian.pes.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import sk.kaspian.pes.model.enums.ContactEnum;


@Data
@Entity
@Table(name = "entry")
@EqualsAndHashCode(callSuper = false, of = "id")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@NoArgsConstructor
@RequiredArgsConstructor
public class Entry implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	@NonNull
	private Long id;
	
	@OneToMany
	@JoinTable(name = "pes_entry_clients",
    joinColumns = { @JoinColumn(name = "entry_id", nullable = false, referencedColumnName = "id") },
    inverseJoinColumns = {@JoinColumn(name = "card_id", nullable = false, referencedColumnName = "id") })
    @NotFound(action = NotFoundAction.IGNORE)
	private List<Card> client;

	@OneToMany
	@JoinTable(name = "pes_entry_card",
    joinColumns = { @JoinColumn(name = "entry_id", nullable = false, referencedColumnName = "id") },
    inverseJoinColumns = {@JoinColumn(name = "card_id", nullable = false, referencedColumnName = "id") })
    @NotFound(action = NotFoundAction.IGNORE)
	private List<Card> clientsOnSite;

	@Column(name = "entry_date_from")
	private LocalDateTime entryDateFrom;

	@Column(name = "entry_date_to")
	private LocalDateTime entryDateTo;

	@Column(name = "place")
	private String place;

    @Enumerated(EnumType.STRING)
    @Column(name = "contact_type")
	private ContactEnum contactType;

	@JoinColumn(name = "campaign_id", nullable = false)
    @ManyToOne(cascade = CascadeType.MERGE)
    @NotFound(action = NotFoundAction.IGNORE)
	private Campaigne campaign;

	@JoinColumn(name = "program_type_id", nullable = false)
    @ManyToOne(cascade = CascadeType.MERGE)
    @NotFound(action = NotFoundAction.IGNORE)
	private Program programType;
	
	@OneToMany(mappedBy = "id", cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
	private List<Method> workMethods;
	
	@OneToMany(mappedBy = "id", cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
	private List<Coworker> otherWorkers;
	
	@Column(name = "event_description")
	private String eventDescription;
	
	@Column(name = "fast_message")
	private String fastMessage;
}
