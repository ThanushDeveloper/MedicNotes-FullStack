package com.example.MedicNotes_Team_1.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Data
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long prescription_id;

    private Long doctor_id;
    private Long patient_id;

    @Column(columnDefinition = "TEXT")
    private String diagnosis;

    @Column(columnDefinition = "TEXT")
    private String notes;

    private Date prescription_date;
    private Date next_visit_date;

    private Timestamp created_at;
    private Timestamp updated_at;
}
