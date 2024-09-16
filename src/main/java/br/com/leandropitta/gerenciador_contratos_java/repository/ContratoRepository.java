package br.com.leandropitta.gerenciador_contratos_java.repository;

import br.com.leandropitta.gerenciador_contratos_java.entity.Contrato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ContratoRepository extends JpaRepository<Contrato, String> {

    @Query("SELECT MAX(c.contrato) FROM Contrato c WHERE c.contrato LIKE '1111%'")
    String findMaxContrato();
}
