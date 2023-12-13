package com.noCountry.library.service;

import com.noCountry.library.dto.Book.PaginatedResponseDTO;
import com.noCountry.library.dto.Comment.CommentDto;

public interface CommentService {

    CommentDto createComment(CommentDto commentDto);

    CommentDto updateComment(CommentDto commentDto);

    void deleteComment(String idComment);

    CommentDto getCommentById(String idComment);

    PaginatedResponseDTO<CommentDto> getCommentsByBook(Integer pageNumber, Integer sizeElement, String idBook);

}
