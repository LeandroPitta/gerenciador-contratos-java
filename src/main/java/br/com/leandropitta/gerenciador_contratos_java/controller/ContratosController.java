package br.com.leandropitta.gerenciador_contratos_java.controller;

import br.com.leandropitta.gerenciador_contratos_java.dto.request.ContratoRequestDto;
import br.com.leandropitta.gerenciador_contratos_java.dto.response.ContratoResponseDto;
import br.com.leandropitta.gerenciador_contratos_java.dto.response.ContratoResponsePageDto;
import br.com.leandropitta.gerenciador_contratos_java.dto.response.NumeroContratoResponseDto;
import br.com.leandropitta.gerenciador_contratos_java.service.ContratosService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collections;

@RestController
@RequestMapping("/contratos")
@AllArgsConstructor
public class ContratosController {

    private final ContratosService contratosService;

    @GetMapping
    public ContratoResponsePageDto consultarContratos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return contratosService.consultarContratos(page, size);
    }

    @GetMapping("/{id}")
    public ContratoResponseDto consultarContrato(@PathVariable String id) {
        return contratosService.consultarContrato(id);
    }

    @GetMapping("/gerarNumeroContrato")
    public NumeroContratoResponseDto gerarNumeroContrato() {
        return contratosService.gerarNumeroContrato();
    }

    @PostMapping
    public ResponseEntity<?> cadastrarContrato(@RequestBody ContratoRequestDto contratoRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<?> atualizarContrato(@RequestBody ContratoRequestDto contratoRequestDto) {
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
