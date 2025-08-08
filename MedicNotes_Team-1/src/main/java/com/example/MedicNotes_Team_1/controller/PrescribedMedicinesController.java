package com.example.MedicNotes_Team_1.controller;

import com.example.MedicNotes_Team_1.entity.PrescribedMedicines;
import com.example.MedicNotes_Team_1.repository.PrescribedMedicinesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/prescribed-medicines")
public class PrescribedMedicinesController {

    @Autowired
    private PrescribedMedicinesRepository prescribedMedicinesRepository;

    @PostMapping("/add")
    public Object addPrescribedMedicine(
            @RequestParam Long prescription_id,
            @RequestParam String medicine_name,
            @RequestParam(required = false) String dosage,
            @RequestParam(required = false) String frequency,
            @RequestParam(required = false) String duration,
            @RequestParam(required = false) String notes) {
        try {
            PrescribedMedicines pm = new PrescribedMedicines();
            pm.setPrescription_id(prescription_id);
            pm.setMedicine_name(medicine_name);
            pm.setDosage(dosage);
            pm.setFrequency(frequency);
            pm.setDuration(duration);
            pm.setNotes(notes);
            pm.setCreated_at(new Timestamp(System.currentTimeMillis()));

            PrescribedMedicines savedMedicine = prescribedMedicinesRepository.save(pm);

            return "Prescribed medicine added successfully with ID: " + savedMedicine.getId();

        } catch (Exception e) {
            e.printStackTrace();
            return "Something went wrong while adding prescribed medicine: " + e;
        }
    }

}
