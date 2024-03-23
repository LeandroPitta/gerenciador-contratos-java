<%
Response.AddHeader "Access-Control-Allow-Origin", "*"
Response.AddHeader "Access-Control-Allow-Methods", "POST, OPTIONS"
Response.AddHeader "Access-Control-Allow-Headers", "Content-Type"
Response.AddHeader "Access-Control-Max-Age", "86400"

' Função para adicionar um novo contrato ao arquivo txt
Sub AdicionarContrato(contrato, nome, valor, dataContrato)
    Dim objFSO, objArquivo
    Set objFSO = Server.CreateObject("Scripting.FileSystemObject")

    If objFSO.FileExists(Server.MapPath("contratos.txt")) Then
        Set objArquivo = objFSO.OpenTextFile(Server.MapPath("contratos.txt"), 1)
        Dim conteudo
        conteudo = objArquivo.ReadAll()
        objArquivo.Close()
        
        ' Remove a formatação incorreta do último contrato adicionado
        If Right(conteudo, 3) = "  ]" Then
            conteudo = Left(conteudo, Len(conteudo) - 3)
        End If

        ' Cria uma nova entrada no formato JSON
        Dim novoContrato
        novoContrato = "    {" & vbCrLf & _
                      "      ""CONTRATO"": " & contrato & "," & vbCrLf & _
                      "      ""NOME"": """ & Replace(nome, """", "\""") & """," & vbCrLf & _
                      "      ""VALOR"": " & valor & "," & vbCrLf & _
                      "      ""DATA_DO_CONTRATO"": """ & dataContrato & """" & vbCrLf & _
                      "    }"

        ' Verifica se o arquivo já tinha contratos
        If InStr(conteudo, "{") > 0 Then
            ' Adiciona uma vírgula para separar a nova entrada
            novoContrato = "," & vbCrLf & novoContrato
        End If

        ' Adiciona a nova entrada ao final do arquivo
        Set objArquivo = objFSO.OpenTextFile(Server.MapPath("contratos.txt"), 2)
        objArquivo.Write conteudo & novoContrato & vbCrLf & "  ]"
        objArquivo.Close()

      ' Retorna uma resposta de sucesso para o front-end
        Response.ContentType = "application/json"
        Response.Write "{""success"": true}"
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

' Chama a função para adicionar o novo contrato ao arquivo
AdicionarContrato contrato, nome, valor, dataContrato
%>
