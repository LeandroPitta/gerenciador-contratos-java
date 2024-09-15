package br.com.leandropitta.gerenciador_contratos_java.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "contratos")
@Data
public class Contrato {
    @Id
    @Column(nullable = false, unique = true)
    private String contrato;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private BigDecimal valor;

    @Column(name = "data_contrato", nullable = false)
    private LocalDate dataContrato;
}
