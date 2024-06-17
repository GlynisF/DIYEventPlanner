package com.DIYEventPlanner.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Entity(name = "Event")
@Table(name = "event")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name="native", strategy="native")
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 150)
    @NotNull
    @Column(name = "event_name", nullable = false, length = 150)
    private String eventName;


    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "notebook_id", foreignKey = @ForeignKey(name = "notebook_id"))
    private Notebook notebook;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Location> locations = new HashSet<Location>();

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<EventDetails> eventDetails;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Artist> artists;

    public Event() {
    }

    public Event(String eventName, Notebook notebook) {
        this.eventName = eventName;
        this.notebook = notebook;
    }


    public void addArtist(Artist artist) {
        artists.add(artist);
        artist.setEvent(this);
    }

    public void removeArtist(Artist artist) {
        artists.remove(artist);
        artist.setEvent(null);
    }

    public void addEventDetails(EventDetails details) {
        eventDetails.add(details);
        details.setEvent(this);
    }

    public void removeEventDetails(EventDetails details) {
        eventDetails.remove(details);
        details.setEvent(null);
    }

    public void addLocation(Location location) {
        locations.add(location);
        location.setEvent(this);
    }

    /**
     * Instantiates a new Remove notebook.
     *
     * @param location the notebook
     */
    public void removeLocation(Location location) {
        locations.remove(location);
        location.setEvent(null);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Event event = (Event) o;
        return Objects.equals(id, event.id) && Objects.equals(eventName, event.eventName) && Objects.equals(notebook, event.notebook);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, eventName, notebook);
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", eventName='" + eventName + '\'' +
                ", locations=" + locations +
                ", eventDetails=" + eventDetails +
                ", artists=" + artists +
                '}';
    }
}