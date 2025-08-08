//package com.example.MedicNotes_Team_1.dto;
//
//import lombok.*;
//
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//public class LoginRequest {
//    private Long doctorId;
//    private String email;
//    private String phone;
//    private String password;
//    private Long adminId;
//    private Long patientId;
//
//}

package com.example.MedicNotes_Team_1.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    private Long doctorId;
    private String email;
    private String phone;
    private String password;
    private Long adminId;
    private Long patientId;
}

