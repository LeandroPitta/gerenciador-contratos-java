package br.com.leandropitta.gerenciador_contratos_java.config;

import br.com.leandropitta.gerenciador_contratos_java.dto.error.ErrorResponseDto;
import br.com.leandropitta.gerenciador_contratos_java.exceptions.ValidacaoException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
public class RestControllerExceptionAdvice {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<ErrorResponseDto>> handlerMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        List<ErrorResponseDto> erros = ex.getBindingResult()
                .getAllErrors()
                .stream()
                .map(objectError -> {
                    String fieldError = ((FieldError) objectError).getField();
                    String erro = objectError.getDefaultMessage();
                    return new ErrorResponseDto(fieldError, erro);
                })
                .collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erros);
    }

    @ExceptionHandler( { ValidacaoException.class,  } )
    public ResponseEntity<ErrorResponseDto> handlerValidacaoException(ValidacaoException validacaoException) {
        log.info(validacaoException.getMessage());
        ErrorResponseDto errorResponse = new ErrorResponseDto("validacao", validacaoException.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler( Exception.class )
    public ResponseEntity<ErrorResponseDto> handlerException(Exception ex) {
        log.error(ex.getMessage(), ex);
        String rootCauseMessage = getRootCauseMessage(ex);
        ErrorResponseDto errorResponse = new ErrorResponseDto("exception", rootCauseMessage);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }

    private String getRootCauseMessage(Throwable throwable) {
        Throwable rootCause = throwable;
        while (rootCause.getCause() != null && rootCause != rootCause.getCause()) {
            rootCause = rootCause.getCause();
        }
        return rootCause.getMessage();
    }
}
