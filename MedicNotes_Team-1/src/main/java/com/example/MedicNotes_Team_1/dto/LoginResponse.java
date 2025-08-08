//package com.example.MedicNotes_Team_1.dto;
//
//import lombok.*;
//
//@Data
//@AllArgsConstructor
//public class LoginResponse {
//    private String token;
//}


package com.example.MedicNotes_Team_1.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private String token;
    private Long id;
}
