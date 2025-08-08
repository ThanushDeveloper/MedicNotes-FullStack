package com.example.MedicNotes_Team_1.repository;

import com.example.MedicNotes_Team_1.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByEmail(String email);
    Admin findByPhone(String phone);
}
