package com.noCountry.library.exception.util;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
@Data
public class ApiErrorDto implements Serializable {
    private String backendMessage;
    private String message;
    private LocalDateTime times;
    private String url;
    private String method;
}
