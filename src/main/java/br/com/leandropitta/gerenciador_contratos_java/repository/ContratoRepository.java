package br.com.leandropitta.gerenciador_contratos_java.repository;

import br.com.leandropitta.gerenciador_contratos_java.entity.Contrato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface ContratoRepository extends JpaRepository<Contrato, String> {

    @Query("SELECT MAX(c.contrato) FROM Contrato c WHERE c.contrato LIKE '1111%'")
    String findMaxContrato();

    @Query("SELECT COUNT(c) FROM Contrato c")
    long countContratos();

    @Query("SELECT AVG(c.valor) FROM Contrato c")
    BigDecimal averageValorContratos();

    @Query("SELECT SUM(c.valor) FROM Contrato c")
    BigDecimal totalValorContratos();
}
