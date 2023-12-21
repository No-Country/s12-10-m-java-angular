package com.noCountry.library.dto.Book;

import com.noCountry.library.entities.UrlImage;
import lombok.Data;

import java.util.List;

@Data
public class BookResponseWithImage extends BookResponse {

    private List<UrlImage> imageWithId;

}
