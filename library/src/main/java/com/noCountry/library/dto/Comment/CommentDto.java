package com.noCountry.library.dto.Comment;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CommentDto {

    private String idComment;
    private String idBook;
    private String idUser;
    private String comment;
    private LocalDate date;

}
