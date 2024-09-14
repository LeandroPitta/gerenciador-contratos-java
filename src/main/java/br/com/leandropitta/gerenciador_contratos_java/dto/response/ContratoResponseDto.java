package br.com.leandropitta.gerenciador_contratos_java.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Builder
@Data
public class ContratoResponseDto {
    private String contrato;
    private String nome;
    private BigDecimal valor;
    private LocalDate dataContrato;
}
