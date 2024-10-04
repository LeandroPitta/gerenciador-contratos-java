package br.com.leandropitta.gerenciador_contratos_java.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class ContratoEstatisticasResponseDto {
    private long quantidadeTotal;
    private BigDecimal mediaValor;
    private BigDecimal valorTotal;
}
