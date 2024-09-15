package br.com.leandropitta.gerenciador_contratos_java.controller;

import br.com.leandropitta.gerenciador_contratos_java.dto.request.ContratoRequestDto;
import br.com.leandropitta.gerenciador_contratos_java.dto.response.ContratoResponseDto;
import br.com.leandropitta.gerenciador_contratos_java.dto.response.ContratoResponsePageDto;
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
    public ContratoResponsePageDto consultarContratos() {
        return ContratoResponsePageDto.builder()
                .total(1)
                .totalPages(1)
                .page(0)
                .size(10)
                .content(Collections.singletonList(
                        ContratoResponseDto.builder()
                                .contrato("111100003")
                                .nome("Leandro Pitta")
                                .valor(BigDecimal.valueOf(1000.00))
                                .dataContrato(LocalDate.parse("2021-10-01"))
                                .build()))
                .build();
    }

    @GetMapping("/{id}")
    public ContratoResponseDto consultarContrato(@PathVariable String id) {
        return contratosService.consultarContrato(id);
    }

    @GetMapping("/gerarNumeroContrato")
    public String gerarNumeroContrato() {
        return "111100003";
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
