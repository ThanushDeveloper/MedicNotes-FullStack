package com.example.MedicNotes_Team_1.service;

import com.example.MedicNotes_Team_1.entity.Prescription;
import com.example.MedicNotes_Team_1.entity.PrescriptionFiles;
import com.example.MedicNotes_Team_1.repository.DoctorRepository;
import com.example.MedicNotes_Team_1.repository.PatientRepository;
import com.example.MedicNotes_Team_1.repository.PrescriptionFilesRepository;
import com.example.MedicNotes_Team_1.repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private PrescriptionFilesRepository prescriptionFilesRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public Object addPrescriptionWithFiles(
            Long doctor_id,
            Long patient_id,
            String diagnosis,
            String notes,
            String prescription_date,
            String next_visit_date,
            MultipartFile[] files) {
        try {
            if (!doctorRepository.existsById(doctor_id)) {
                return "Error: Doctor ID " + doctor_id + " does not exist in doctor table.";
            }

            if (!patientRepository.existsById(patient_id)) {
                return "Error: Patient ID " + patient_id + " does not exist in patient table.";
            }

            Prescription prescription = new Prescription();
            prescription.setDoctor_id(doctor_id);
            prescription.setPatient_id(patient_id);
            prescription.setDiagnosis(diagnosis);
            prescription.setNotes(notes);

            try {
                if (prescription_date == null || prescription_date.trim().isEmpty()) {
                    prescription.setPrescription_date(new java.sql.Date(System.currentTimeMillis()));
                } else {
                    prescription.setPrescription_date(java.sql.Date.valueOf(prescription_date.trim()));
                }
            } catch (IllegalArgumentException e) {
                return "Error: prescription_date must be in yyyy-MM-dd format.";
            }

            try {
                if (next_visit_date == null || next_visit_date.trim().isEmpty()) {
                    prescription.setNext_visit_date(new java.sql.Date(System.currentTimeMillis()));
                } else {
                    prescription.setNext_visit_date(java.sql.Date.valueOf(next_visit_date.trim()));
                }
            } catch (IllegalArgumentException e) {
                return "Error: next_visit_date must be in yyyy-MM-dd format.";
            }

            prescription.setCreated_at(new Timestamp(System.currentTimeMillis()));
            prescription.setUpdated_at(new Timestamp(System.currentTimeMillis()));
            Prescription savedPrescription = prescriptionRepository.save(prescription);

            if (files != null) {
                for (MultipartFile file : files) {
                    PrescriptionFiles pf = new PrescriptionFiles();
                    pf.setPrescription_id(savedPrescription.getPrescription_id());
                    pf.setFile_data(file.getBytes());
                    pf.setUploaded_at(new Timestamp(System.currentTimeMillis()));
                    prescriptionFilesRepository.save(pf);
                }
            }

            return "Prescription and files uploaded successfully with prescription ID: " + savedPrescription.getPrescription_id();

        } catch (Exception e) {
            e.printStackTrace();
            return "Something went wrong while adding prescription with files: " + e;
        }
    }

    @Override
    public List<Prescription> getAllPrescriptions() {
        return prescriptionRepository.findAll();
    }

    @Override
    public Object getPrescriptionById(Long prescriptionId) {
        try {
            Optional<Prescription> prescription = prescriptionRepository.findById(prescriptionId);
            if (prescription.isPresent()) {
                return prescription.get();
            } else {
                return "Prescription with ID " + prescriptionId + " not found.";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Something went wrong while fetching prescription by ID: " + e;
        }
    }

    @Override
    public long getPrescriptionCount() {
        return prescriptionRepository.count();
    }


}
