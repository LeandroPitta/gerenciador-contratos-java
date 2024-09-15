package br.com.leandropitta.gerenciador_contratos_java.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContratoResponseDto {
    private String contrato;
    private String nome;
    private BigDecimal valor;
    private LocalDate dataContrato;
}
