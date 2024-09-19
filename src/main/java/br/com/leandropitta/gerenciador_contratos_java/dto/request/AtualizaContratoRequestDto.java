package br.com.leandropitta.gerenciador_contratos_java.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class AtualizaContratoRequestDto {

    @Size(min = 3, max = 50, message = "O nome deve ter entre 3 e 50 caracteres")
    private String nome;

    @DecimalMin(value = "0.0", inclusive = false, message = "O valor deve ser positivo")
    private BigDecimal valor;

    @PastOrPresent(message = "A data do contrato não pode ser no futuro")
    private LocalDate dataContrato;
}
