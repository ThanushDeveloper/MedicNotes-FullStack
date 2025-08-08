package com.example.MedicNotes_Team_1.repository;

import com.example.MedicNotes_Team_1.entity.PrescriptionFiles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrescriptionFilesRepository extends JpaRepository<PrescriptionFiles, Long> {

}
