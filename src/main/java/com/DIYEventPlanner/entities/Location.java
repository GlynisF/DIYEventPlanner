package com.DIYEventPlanner.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Objects;

@Getter
@Setter
@Entity(name = "Location")
@Table(name = "location")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name="native", strategy="native")
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 100)
    @NotNull
    @Column(name = "location_name", nullable = false, length = 100)
    private String locationName;

    @Size(max = 20)
    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Size(max = 100)
    @Column(name = "address", length = 100)
    private String address;

    @Size(max = 100)
    @Column(name = "address_2", length = 100)
    private String address2;

    @Size(max = 100)
    @Column(name = "city", length = 100)
    private String city;

    @Size(max = 2)
    @Column(name = "state", length = 2)
    private String state;

    @Size(max = 10)
    @Column(name = "zip", length = 10)
    private String zip;

    @Size(max = 100)
    @Column(name = "website", length = 100)
    private String website;

    @Column(name = "accessibility")
    private Boolean accessibility;

    @NotNull
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "event_id", foreignKey = @ForeignKey(name = "eventId"), nullable = false)
    private Event event;

    public Location() {
    }

    public Location(String locationName, String phoneNumber, String address, String address2, String city, String state, String zip, String website, Boolean accessibility, Event event) {
        this.locationName = locationName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.website = website;
        this.accessibility = accessibility;
        this.event = event;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Location location = (Location) o;
        return Objects.equals(id, location.id) && Objects.equals(locationName, location.locationName) && Objects.equals(phoneNumber, location.phoneNumber) && Objects.equals(address, location.address) && Objects.equals(address2, location.address2) && Objects.equals(city, location.city) && Objects.equals(state, location.state) && Objects.equals(zip, location.zip) && Objects.equals(website, location.website) && Objects.equals(accessibility, location.accessibility);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, locationName, phoneNumber, address, address2, city, state, zip, website, accessibility);
    }

    @Override
    public String toString() {
        return "Location{" +
                "id=" + id +
                ", locationName='" + locationName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", address='" + address + '\'' +
                ", address2='" + address2 + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", zip='" + zip + '\'' +
                ", website='" + website + '\'' +
                ", accessibility=" + accessibility +
                '}';
    }
}