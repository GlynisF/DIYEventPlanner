package com.DIYEventPlanner.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

@Getter
@Setter
@Entity(name = "EventDetails")
@Table(name = "event_details")
@JsonIgnoreProperties(ignoreUnknown = true)
public class EventDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name="native", strategy="native")
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "date")
    private LocalDate date;

    @JsonFormat(pattern = "HH:mm:ss")
    @Column(name = "start_time")
    private LocalTime startTime;

    @JsonFormat(pattern = "HH:mm:ss")
    @Column(name = "end_time")
    private LocalTime endTime;

    @ManyToOne
    @JoinColumn(name = "event_id")
    @JsonIgnore
    private Event event;

    public EventDetails() {
    }

    public EventDetails(LocalDate date, LocalTime startTime, LocalTime endTime, Event event) {
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.event = event;
    }

    public String getFormattedStartTime() {
        return startTime != null ? startTime.format(DateTimeFormatter.ofPattern("HH:mm:ss")) : null;
    }

    public String getFormattedEndTime() {
        return endTime != null ? endTime.format(DateTimeFormatter.ofPattern("HH:mm:ss")) : null;
    }

    public String getFormattedDate() {
        return date != null ? date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) : null;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EventDetails that = (EventDetails) o;
        return Objects.equals(id, that.id) && Objects.equals(date, that.date) && Objects.equals(startTime, that.startTime) && Objects.equals(endTime, that.endTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, date, startTime, endTime);
    }

    @Override
    public String toString() {
        return "EventDetails{" +
                "id=" + id +
                ", date=" + getFormattedDate() +
                ", startTime=" + getFormattedStartTime() +
                ", endTime=" + getFormattedEndTime() +
                '}';
    }
}