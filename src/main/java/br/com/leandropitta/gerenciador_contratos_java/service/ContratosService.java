package br.com.leandropitta.gerenciador_contratos_java.service;

import br.com.leandropitta.gerenciador_contratos_java.dto.request.AtualizaContratoRequestDto;
import br.com.leandropitta.gerenciador_contratos_java.dto.request.CadastraContratoRequestDto;
import br.com.leandropitta.gerenciador_contratos_java.dto.response.ContratoEstatisticasResponseDto;
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
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ContratosService {

    private final ContratoRepository contratoRepository;
    private final ModelMapper modelMapper;

    public ContratoResponsePageDto consultarContratos(int page, int size) {
        Page<Contrato> contratosPage = contratoRepository.findAll(PageRequest.of(page, size, Sort.by("contrato").ascending()));
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

    public ContratoResponseDto cadastrarContrato(CadastraContratoRequestDto cadastraContratoRequestDto) {
        Contrato contrato = modelMapper.map(cadastraContratoRequestDto, Contrato.class);
        NumeroContratoResponseDto numeroContratoResponseDto = gerarNumeroContrato();
        contrato.setContrato(numeroContratoResponseDto.getNumeroContrato());
        contrato = contratoRepository.save(contrato);
        return modelMapper.map(contrato, ContratoResponseDto.class);
    }

    public ContratoResponseDto atualizarContrato(String numeroContrato, AtualizaContratoRequestDto atualizaContratoRequestDto) {
        Contrato contratoExistente = contratoRepository.findById(numeroContrato)
                .orElseThrow(() -> new ValidacaoException("Contrato não encontrado"));

        if (atualizaContratoRequestDto.getNome() != null) {
            contratoExistente.setNome(atualizaContratoRequestDto.getNome());
        }
        if (atualizaContratoRequestDto.getValor() != null) {
            contratoExistente.setValor(atualizaContratoRequestDto.getValor());
        }
        if (atualizaContratoRequestDto.getDataContrato() != null) {
            contratoExistente.setDataContrato(atualizaContratoRequestDto.getDataContrato());
        }

        contratoExistente = contratoRepository.save(contratoExistente);
        return modelMapper.map(contratoExistente, ContratoResponseDto.class);
    }

    public ContratoEstatisticasResponseDto obterEstatisticasContratos() {
        long quantidadeTotal = contratoRepository.countContratos();
        BigDecimal mediaValor = contratoRepository.averageValorContratos();
        BigDecimal valorTotal = contratoRepository.totalValorContratos();
        return new ContratoEstatisticasResponseDto(quantidadeTotal, mediaValor, valorTotal);
    }
}
