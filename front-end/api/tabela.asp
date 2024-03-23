<%
Response.AddHeader "Access-Control-Allow-Origin", "*"

' Função para ler o conteúdo do arquivo txt
Function LerArquivoTexto(nomeArquivo)
    Dim objFSO, objArquivo
    Set objFSO = Server.CreateObject("Scripting.FileSystemObject")
    Set objArquivo = objFSO.OpenTextFile(Server.MapPath(nomeArquivo), 1)
    
    Dim conteudo
    conteudo = objArquivo.ReadAll()
    
    objArquivo.Close()
    Set objArquivo = Nothing
    Set objFSO = Nothing
    
    LerArquivoTexto = conteudo
End Function

Dim conteudoTexto
conteudoTexto = LerArquivoTexto("contratos.txt")  ' Caminho relativo ao arquivo de texto
    
' Define o tipo de conteúdo como JSON
Response.ContentType = "application/json"
    
' Retorna o conteúdo do arquivo de texto diretamente ao front-end
Response.Write(conteudoTexto)
%>
