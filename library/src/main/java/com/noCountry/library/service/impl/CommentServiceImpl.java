package com.noCountry.library.service.impl;

import com.noCountry.library.dto.Book.PaginatedResponseDTO;
import com.noCountry.library.dto.Comment.CommentDto;
import com.noCountry.library.entities.Comment;
import com.noCountry.library.exception.BadRequestException;
import com.noCountry.library.exception.NotFoundException;
import com.noCountry.library.repository.BookRepository;
import com.noCountry.library.repository.CommentRepository;
import com.noCountry.library.repository.UserRepository;
import com.noCountry.library.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    private final BookRepository bookRepository;

    private final UserRepository userRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, BookRepository bookRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }


    @Override
    public CommentDto createComment(CommentDto commentDto) {
        Optional<Comment> commentAux = commentRepository.findById(commentDto.getIdComment());
        if (commentAux.isPresent()) {
            throw new BadRequestException("El id del comentario ingresado ya existe.");
        }


        return null;
    }

    @Override
    public CommentDto updateComment(CommentDto commentDto) {
        Optional<Comment> commentAux = commentRepository.findById(commentDto.getComment());
        isEmptyObject(commentAux);



        return null;
    }

    @Override
    public void deleteComment(String idComment) {
        Optional<Comment> commentAux = commentRepository.findById(idComment);
        isEmptyObject(commentAux);

        Comment comment = commentAux.get();
        comment.setStatus(false);
        comment.setModificationDate(LocalDate.now());
        commentRepository.save(comment);
    }

    @Override
    public CommentDto getCommentById(String idComment) {
        Optional<Comment> commentAux = commentRepository.findById(idComment);
        isEmptyObject(commentAux);

        return null;
    }

    @Override
    public PaginatedResponseDTO<CommentDto> getCommentsByBook(Integer pageNumber, Integer sizeElement, String idBook) {
        return null;
    }



    private void isEmptyObject(Optional<?> object) throws NotFoundException {
        if (object.isEmpty()) {
            throw new NotFoundException("No se encontró el objeto buscado.");
        }
    }

}
