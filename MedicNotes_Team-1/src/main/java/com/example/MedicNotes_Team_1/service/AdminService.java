package com.example.MedicNotes_Team_1.service;

import com.example.MedicNotes_Team_1.entity.Admin;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AdminService {
    ResponseEntity<String> registerAdmin(Admin admin);
    Admin findByEmail(String email);
    List<Admin> getAllAdmins();
    ResponseEntity<String> updateAdmin(Long id, Admin updatedAdmin);
    ResponseEntity<String> updateAdminPassword(Long id, String newPassword);
    ResponseEntity<String> updateAdminStatus(Long id, String newStatus);
    ResponseEntity<String> deleteAdmin(Long id);
    Admin getAdminById(Long id);
    Admin getAdminByPhone(String phone);
    Admin getAdminByEmail(String email);
    List<Long> getAdminIdsByStatus(String status);
    List<Long> getAdminIdsByAdminType(String adminType);
    long getAdminCount();




}
