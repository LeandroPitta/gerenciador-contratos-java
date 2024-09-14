package br.com.leandropitta.gerenciador_contratos_java.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ContratoRequestDto {

    @NotNull
    @NotBlank
    @Pattern(regexp = "\\d{9}", message = "Contrato deve ter exatamente 9 dígitos numéricos")
    private String contrato;

    @NotNull
    @NotBlank
    @Size(min = 3, max = 50, message = "O nome deve ter entre 3 e 50 caracteres")
    private String nome;

    @NotNull
    @NotBlank
    @DecimalMin(value = "0.0", inclusive = false, message = "O valor deve ser positivo")
    private BigDecimal valor;

    @NotNull
    @NotBlank
    @PastOrPresent(message = "A data do contrato não pode ser no futuro")
    private LocalDate dataContrato;
}
