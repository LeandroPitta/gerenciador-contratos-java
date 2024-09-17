package br.com.leandropitta.gerenciador_contratos_java.service;

import br.com.leandropitta.gerenciador_contratos_java.dto.request.ContratoRequestDto;
import br.com.leandropitta.gerenciador_contratos_java.dto.response.ContratoResponseDto;
import br.com.leandropitta.gerenciador_contratos_java.dto.response.ContratoResponsePageDto;
import br.com.leandropitta.gerenciador_contratos_java.dto.response.NumeroContratoResponseDto;
import br.com.leandropitta.gerenciador_contratos_java.entity.Contrato;
import br.com.leandropitta.gerenciador_contratos_java.exceptions.ValidacaoException;
import br.com.leandropitta.gerenciador_contratos_java.repository.ContratoRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ContratosService {

    private final ContratoRepository contratoRepository;
    private final ModelMapper modelMapper;

    public ContratoResponsePageDto consultarContratos(int page, int size) {
        Page<Contrato> contratosPage = contratoRepository.findAll(PageRequest.of(page, size));
        return ContratoResponsePageDto.builder()
                .total(contratosPage.getTotalElements())
                .totalPages(contratosPage.getTotalPages())
                .page(contratosPage.getNumber())
                .size(contratosPage.getSize())
                .content(contratosPage.getContent().stream()
                        .map(contrato -> modelMapper.map(contrato, ContratoResponseDto.class))
                        .collect(Collectors.toList()))
                .build();
    }

    public ContratoResponseDto consultarContrato(String id) {
        return contratoRepository.findById(id)
                .map(contrato -> modelMapper.map(contrato, ContratoResponseDto.class))
                .orElseThrow(() -> new ValidacaoException("Contrato não encontrado"));
    }

    public NumeroContratoResponseDto gerarNumeroContrato() {
        String maxContrato = contratoRepository.findMaxContrato();
        if (maxContrato == null) {
            return new NumeroContratoResponseDto("111100001");
        }
        int nextNumber = Integer.parseInt(maxContrato.substring(4)) + 1;
        return new NumeroContratoResponseDto("1111" + String.format("%05d", nextNumber));
    }

    public ContratoResponseDto cadastrarContrato(ContratoRequestDto contratoRequestDto) {
        Contrato contrato = modelMapper.map(contratoRequestDto, Contrato.class);
        contrato = contratoRepository.save(contrato);
        return modelMapper.map(contrato, ContratoResponseDto.class);
    }
}
