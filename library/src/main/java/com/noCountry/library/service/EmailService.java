package com.noCountry.library.service;



import java.util.Map;

public interface EmailService {


    public void sendSimpleEmail(String to, String subject, String text);

    public void sendWelcomeEmail(String to, String subject, String templateName, Map<String, Object> templateModel);

    public void sendSaleEmailWithPDFBill(String to, String subject, Map<String, Object> templateModel);


}
