package br.com.leandropitta.gerenciador_contratos_java.controller;

import br.com.leandropitta.gerenciador_contratos_java.dto.request.AtualizaContratoRequestDto;
import br.com.leandropitta.gerenciador_contratos_java.dto.request.CadastraContratoRequestDto;
import br.com.leandropitta.gerenciador_contratos_java.dto.response.ContratoEstatisticasResponseDto;
import br.com.leandropitta.gerenciador_contratos_java.dto.response.ContratoResponseDto;
import br.com.leandropitta.gerenciador_contratos_java.dto.response.ContratoResponsePageDto;
import br.com.leandropitta.gerenciador_contratos_java.dto.response.NumeroContratoResponseDto;
import br.com.leandropitta.gerenciador_contratos_java.service.ContratosService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<ContratoResponseDto> cadastrarContrato(@RequestBody CadastraContratoRequestDto cadastraContratoRequestDto) {
        ContratoResponseDto responseDto = contratosService.cadastrarContrato(cadastraContratoRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @PutMapping("/{numeroContrato}")
    public ResponseEntity<ContratoResponseDto> atualizarContrato(
            @PathVariable String numeroContrato,
            @RequestBody AtualizaContratoRequestDto atualizaContratoRequestDto) {
        ContratoResponseDto responseDto = contratosService.atualizarContrato(numeroContrato, atualizaContratoRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @GetMapping("/estatisticas")
    public ContratoEstatisticasResponseDto obterEstatisticasContratos() {
        return contratosService.obterEstatisticasContratos();
    }
}
