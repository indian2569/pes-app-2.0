package sk.kaspian.pes.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.ToString;

@Entity
@Table(name = "pes_entry_method")
@Data
@EqualsAndHashCode(of = "id")
@ToString(of = "entry")
@NoArgsConstructor
public class EntryMethod  implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "EntryMethodSG")
    @SequenceGenerator(name = "EntryMethodSG", sequenceName = "pes_entry_method_seq", allocationSize = 1)
    private Long id;

    @NonNull
    @JoinColumn(name = "ENTRY_ID", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Entry entry;

    @Column(name = "method_id", nullable = false)
    private Method method;

    public EntryMethod(Entry entry, Method method) {
        this.entry = entry;
        this.method = method;
    }
}
