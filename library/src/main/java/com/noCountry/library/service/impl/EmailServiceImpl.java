package com.noCountry.library.service.impl;

import com.noCountry.library.service.EmailService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.ByteArrayOutputStream;
import java.util.Map;
import java.util.Properties;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender emailSender;

    private final SpringTemplateEngine templateEngine;

    @Autowired
    public EmailServiceImpl(JavaMailSender emailSender, SpringTemplateEngine templateEngine) {
        this.emailSender = emailSender;
        this.templateEngine = templateEngine;
    }


    @Override
    public void sendSimpleEmail(String to, String subject, String text) {
        // Manejamos excepciones aca o en el controller???
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);

            if (emailSender instanceof JavaMailSenderImpl) {
                JavaMailSenderImpl mailSenderImpl = (JavaMailSenderImpl) emailSender;
                Properties javaMailProperties = mailSenderImpl.getJavaMailProperties();
                javaMailProperties.put("mail.smtp.starttls.enable", "true");
                javaMailProperties.put("mail.smtp.ssl.trust", "smtp.gmail.com");
            }

            emailSender.send(message);

        }  catch (MailAuthenticationException e) {

        // Manejar excepciones de autenticación (credenciales incorrectas, etc.)
            e.printStackTrace();
        } catch (MailSendException e) {

        // Manejar excepciones generales de envío de correo
            e.printStackTrace();
        } catch (MailException e) {

        // Captura de excepciones generales de JavaMailSender
            e.printStackTrace();
        }

    }

    @Override
    public void sendWelcomeEmail(String to, String subject, String templateName,
                                 Map<String, Object> templateModel) {
        try {

            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
            messageHelper.setTo(to);
            messageHelper.setSubject(subject);

            String emailBody = processTemplate(templateName, templateModel);
            messageHelper.setText(emailBody, true);

            emailSender.send(mimeMessage);

        } catch (Exception e) {
            // Manejar excepciones aca o en controller???
            e.printStackTrace();
        }
    }

    private String processTemplate(String templateName, Map<String, Object> templateModel) {
        // Crear un contexto Thymeleaf
        Context thymeleafContext = new Context();
        thymeleafContext.setVariables(templateModel);

        // Procesar la plantilla Thymeleaf
        return templateEngine.process(templateName, thymeleafContext);
    }

    public void sendSaleEmailWithPDFBill(String to, String subject, Map<String, Object> templateModel) {

        try {
            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
            messageHelper.setTo(to);
            messageHelper.setSubject(subject);

            // Procesar la plantilla Thymeleaf
            String emailBody = processTemplate("billOfSale.html", templateModel);
            messageHelper.setText(emailBody, true);

            // Generar el PDF a partir de la plantilla HTML
            byte[] pdfBytes = generatePDF(emailBody);

            // Adjuntar el PDF al correo electrónico
            messageHelper.addAttachment("factura.pdf", new ByteArrayResource(pdfBytes) {
                @Override
                public String getFilename() {
                    return "factura.pdf";
                }
            });

            emailSender.send(mimeMessage);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private byte[] generatePDF(String htmlContent) throws Exception {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            ITextRenderer renderer = new ITextRenderer();
            renderer.setDocumentFromString(htmlContent);
            renderer.layout();
            renderer.createPDF(outputStream);
            return outputStream.toByteArray();
        }
    }



}
