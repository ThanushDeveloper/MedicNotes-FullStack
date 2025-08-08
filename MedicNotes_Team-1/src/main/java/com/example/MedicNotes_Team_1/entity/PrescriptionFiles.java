package com.example.MedicNotes_Team_1.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
public class PrescriptionFiles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long prescription_id;

    @Lob
    private byte[] file_data;

    private Timestamp uploaded_at;
}
