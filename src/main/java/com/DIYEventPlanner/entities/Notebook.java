package com.DIYEventPlanner.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@Entity(name = "Notebook")
@Table(name = "notebook")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Notebook {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    @Column(name = "id", nullable = false)
    private int id;

    @Size(max = 150)
    @NotNull
    @Column(name = "title", nullable = false, length = 150)
    private String title;

    @ManyToOne
    @JsonIgnore
    @JsonProperty("user")
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "user_id"), nullable = false)
    private User user;

    @OneToMany(mappedBy = "notebook", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<Event> events = new HashSet<Event>();

    public Notebook() {
    }

    public Notebook(String title, User user) {
        this.title = title;
        this.user = user;

    }

    public void addEvent(Event event) {
        events.add(event);
        event.setNotebook(this);
    }

    /**
     * Instantiates a new Remove notebook.
     *
     * @param event the notebook
     */
    public void removeEvent(Event event) {
        events.remove(event);
        event.setNotebook(null);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Notebook notebook = (Notebook) o;
        return id == notebook.id && Objects.equals(title, notebook.title);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title);
    }

    @Override
    public String toString() {
        return "Notebook{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", events=" + events +
                '}';
    }
}