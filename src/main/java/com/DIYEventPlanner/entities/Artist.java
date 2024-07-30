package com.DIYEventPlanner.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Objects;

@Getter
@Setter
@Entity(name = "Artist")
@Table(name = "artist")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Artist {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name="native", strategy="native")
    @Column(name = "id", nullable = false)
    private Integer id;

    @Setter
    @Size(max = 100)
    @NotNull
    @Column(name = "moniker", nullable = false, length = 100)
    private String moniker;

    @Setter
    @Size(max = 100)
    @Column(name = "first_name", length = 100)
    private String firstName;

    @Setter
    @Size(max = 100)
    @Column(name = "last_name", length = 100)
    private String lastName;

    @Setter
    @Size(max = 100)
    @Column(name = "email", length = 100)
    private String email;

    @Setter
    @Column(name = "booking_fee", precision = 10)
    private BigDecimal bookingFee;

    @Setter
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "event_id",
            foreignKey = @ForeignKey(name = "artist_fk") )
    private Event event;

    public Artist() {
    }

    public Artist(String moniker, String firstName, String lastName, String email, BigDecimal bookingFee, Event event) {
        this.moniker = moniker;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.bookingFee = bookingFee;
        this.event = event;
    }

    public Artist updateArtist(Artist artist, Event event) {
         artist.setMoniker(artist.getMoniker());
         artist.setFirstName(artist.getFirstName());
         artist.setLastName(artist.getLastName());
         artist.setEmail(artist.getEmail());
         artist.setBookingFee(artist.getBookingFee());
         artist.setEvent(event);
         return artist;
    }

    public String getBookingFeeFormatted() {
        if (bookingFee != null) {
            return String.format("%.2f", bookingFee);
        } else {
            return null;
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Artist artist = (Artist) o;
        return Objects.equals(id, artist.id) && Objects.equals(moniker, artist.moniker) && Objects.equals(firstName, artist.firstName) && Objects.equals(lastName, artist.lastName) && Objects.equals(email, artist.email) && Objects.equals(bookingFee, artist.bookingFee);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, moniker, firstName, lastName, email, bookingFee);
    }

    @Override
    public String toString() {
        return "Artist{" +
                "id=" + id +
                ", moniker='" + moniker + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", bookingFee=" + getBookingFeeFormatted() +
                '}';
    }
}