<%
Response.AddHeader "Access-Control-Allow-Origin", "*"
Response.AddHeader "Access-Control-Allow-Methods", "POST, OPTIONS"
Response.AddHeader "Access-Control-Allow-Headers", "Content-Type"
Response.AddHeader "Access-Control-Max-Age", "86400"

Sub AtualizarContrato(contrato, nome, valor, dataContrato)
    Dim objFSO, objArquivo
    Set objFSO = Server.CreateObject("Scripting.FileSystemObject")

    If objFSO.FileExists(Server.MapPath("contratos.txt")) Then
        Set objArquivo = objFSO.OpenTextFile(Server.MapPath("contratos.txt"), 1)
        Dim conteudo
        conteudo = objArquivo.ReadAll()
        objArquivo.Close()

        ' Verifica se o contrato já existe no arquivo
        If InStr(conteudo, """CONTRATO"": " & contrato) > 0 Then
            ' Encontra a posição do contrato no conteúdo
            Dim posicaoInicial, posicaoFinal
            posicaoInicial = InStr(conteudo, """CONTRATO"": " & contrato)
            posicaoFinal = InStr(posicaoInicial, conteudo, "}")

            ' Constrói o novo bloco de contrato com os valores atualizados
            Dim novoContrato
            novoContrato = "  ""CONTRATO"": " & contrato & "," & vbCrLf & _
                          "  ""NOME"": """ & Replace(nome, """", "\""") & """," & vbCrLf & _
                          "  ""VALOR"": " & valor & "," & vbCrLf & _
                          "  ""DATA_DO_CONTRATO"": """ & dataContrato & """" & vbCrLf & _
                          "}"

            ' Substitui o bloco do contrato existente pelo novo bloco
            conteudo = Replace(conteudo, Mid(conteudo, posicaoInicial, posicaoFinal - posicaoInicial + 1), novoContrato)

            ' Escreve o conteúdo atualizado no arquivo
            Set objArquivo = objFSO.OpenTextFile(Server.MapPath("contratos.txt"), 2)
            objArquivo.Write conteudo
            objArquivo.Close()

            ' Retorna uma resposta de sucesso para o front-end
            Response.ContentType = "application/json"
            Response.Write "{""success"": true}"
        Else
            ' Retorna uma resposta informando que o contrato não existe
            Response.ContentType = "application/json"
            Response.Write "{""success"": false, ""message"": ""O contrato não existe no arquivo.""}"
        End If
    Else
        Response.ContentType = "application/json"
        Response.Write "{""success"": false, ""message"": ""O arquivo contratos.txt não existe.""}"
    End If

    Set objFSO = Nothing
End Sub

' Lê os valores enviados pelo front-end
Dim contrato, nome, valor, dataContrato
contrato = Request.Form("CONTRATO")
nome = Request.Form("NOME")
valor = Request.Form("VALOR")
dataContrato = Request.Form("DATA_DO_CONTRATO")

' Chama a função para adicionar ou atualizar o contrato no arquivo
AtualizarContrato contrato, nome, valor, dataContrato

%>
