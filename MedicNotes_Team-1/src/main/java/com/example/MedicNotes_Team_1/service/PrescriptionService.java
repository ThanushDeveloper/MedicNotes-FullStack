package com.example.MedicNotes_Team_1.service;

import com.example.MedicNotes_Team_1.entity.Prescription;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PrescriptionService {

    Object addPrescriptionWithFiles(
            Long doctor_id,
            Long patient_id,
            String diagnosis,
            String notes,
            String prescription_date,
            String next_visit_date,
            MultipartFile[] files
    );

    List<Prescription> getAllPrescriptions();

    Object getPrescriptionById(Long prescriptionId);

    long getPrescriptionCount();

}
