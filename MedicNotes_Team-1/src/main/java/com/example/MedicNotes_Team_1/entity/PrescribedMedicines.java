package com.example.MedicNotes_Team_1.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
public class PrescribedMedicines {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long prescription_id;
    private String medicine_name;
    private String dosage;
    private String frequency;
    private String duration;

    @Column(columnDefinition = "TEXT")
    private String notes;

    private Timestamp created_at;
}
