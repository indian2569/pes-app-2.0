package sk.kaspian.pes.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import sk.kaspian.pes.model.enums.ContactEnum;

@Data
@Entity
@Table(name = "entry")
@EqualsAndHashCode(callSuper = false, of = "id")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@RequiredArgsConstructor
public class Entry extends SaveableObject {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	@NonNull
	private Long id;

	@OneToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "pes_entry_clients",
    joinColumns = { @JoinColumn(name = "entry_id", nullable = false, referencedColumnName = "id") },
    inverseJoinColumns = {@JoinColumn(name = "card_id", nullable = false, referencedColumnName = "id") })
	private List<Card> client;

	@OneToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "pes_entry_card",
    joinColumns = { @JoinColumn(name = "entry_id", nullable = false, referencedColumnName = "id") },
    inverseJoinColumns = {@JoinColumn(name = "card_id", nullable = false, referencedColumnName = "id") })
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
    @ManyToOne
    @NotFound(action = NotFoundAction.IGNORE)
	private Campaigne campaign;

	@JoinColumn(name = "program_type_id", nullable = false)
    @ManyToOne
    @NotFound(action = NotFoundAction.IGNORE)
	private Program programType;

	@OneToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "pes_entry_method",
			joinColumns = { @JoinColumn(name = "entry_id", nullable = false, referencedColumnName = "id") },
			inverseJoinColumns = {@JoinColumn(name = "method_id", nullable = false, referencedColumnName = "id") })
	private List<Method> workMethods;

	@OneToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "pes_entry_coworker",
			joinColumns = { @JoinColumn(name = "entry_id", nullable = false, referencedColumnName = "id") },
			inverseJoinColumns = {@JoinColumn(name = "coworker_id", nullable = false, referencedColumnName = "id") })
	private List<Coworker> otherWorkers;
	
	@Column(name = "event_description")
	private String eventDescription;
	
	@Column(name = "fast_message")
	private String fastMessage;

	public Entry() {
		super();
	}
}
