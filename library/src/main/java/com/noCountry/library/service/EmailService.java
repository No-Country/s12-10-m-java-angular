package com.noCountry.library.service;



import java.util.Map;

public interface EmailService {


    void sendSimpleEmail(String to, String subject, String text);

    void sendWelcomeEmail(String to, String subject, String templateName, Map<String, Object> templateModel);

    void sendSaleEmailWithPDFBill(String to, String subject, Map<String, Object> templateModel);


}
