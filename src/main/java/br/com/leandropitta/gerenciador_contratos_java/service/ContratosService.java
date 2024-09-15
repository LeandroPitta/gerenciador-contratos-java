package br.com.leandropitta.gerenciador_contratos_java.service;

import br.com.leandropitta.gerenciador_contratos_java.dto.response.ContratoResponseDto;
import br.com.leandropitta.gerenciador_contratos_java.exceptions.ValidacaoException;
import br.com.leandropitta.gerenciador_contratos_java.repository.ContratoRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ContratosService {

    private final ContratoRepository contratoRepository;
    private final ModelMapper modelMapper;

    public ContratoResponseDto consultarContrato(String id) {
        return contratoRepository.findById(id)
                .map(contrato -> modelMapper.map(contrato, ContratoResponseDto.class))
                .orElseThrow(() -> new ValidacaoException("Contrato não encontrado"));
    }
}
