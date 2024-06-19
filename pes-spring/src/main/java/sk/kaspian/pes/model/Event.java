package sk.kaspian.pes.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.*;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

@Data
@Entity
@Table(name = "event")
@EqualsAndHashCode(callSuper = false, of = "name")
@NoArgsConstructor
@RequiredArgsConstructor
public class Event extends SaveableObject{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	@NonNull
	Long id;

	@Column(name = "name")
	String name;

	@Column(name = "description")
	String description;

	@Column(name = "active")	
	boolean active;
}
