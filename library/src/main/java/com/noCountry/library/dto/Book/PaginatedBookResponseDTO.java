package com.noCountry.library.dto.Book;

import lombok.Data;

import java.util.List;

@Data
public class PaginatedBookResponseDTO<T> {

    private List<T> content;
    private Integer totalPages;
    private Long totalElements;
    private Boolean isLast;

}
