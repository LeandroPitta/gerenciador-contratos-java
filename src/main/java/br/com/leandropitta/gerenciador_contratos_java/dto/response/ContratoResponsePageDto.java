package br.com.leandropitta.gerenciador_contratos_java.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class ContratoResponsePageDto {

    private long total;
    private long totalPages;
    private int page;
    private int size;

    private List<ContratoResponseDto> content;
}
