# 📦 Leitor DBF - Consulta de Produtos

Este projeto é um servidor Node.js que lê arquivos `.DBF` (neste caso, `PRECOS.DBF`) e disponibiliza uma API para consultar produtos pelo código de barras ou código interno.  
Foi desenvolvido para uso interno em redes locais, facilitando a busca de preços e informações de produtos.

---

## 🚀 Tecnologias Utilizadas
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [dbffile](https://www.npmjs.com/package/dbffile) — para leitura de arquivos `.DBF`

---

## 📂 Estrutura do Projeto

```
.
├── uploads/
│   └── PRECOS.DBF         # Arquivo DBF com os produtos
├── public/                # Arquivos estáticos (HTML/CSS/JS, se houver)
├── server.js              # Código principal do servidor
├── package.json           # Dependências e scripts
└── package-lock.json
```

---

## ⚙️ Instalação

1. **Clone este repositório**
```bash
git clone https://github.com/seuusuario/leitor-dbf.git
cd leitor-dbf
```

2. **Instale as dependências**
```bash
npm install
```

3. **Coloque seu arquivo `PRECOS.DBF`**
   - Crie a pasta `uploads` na raiz do projeto (se não existir).
   - Copie o arquivo `PRECOS.DBF` para dentro dela.

4. **Inicie o servidor**
```bash
npm start
```

O servidor rodará por padrão na porta `80` ou na porta definida na variável `PORT`.

---

## 🔍 Endpoints Disponíveis

### `POST /buscar`
Busca um produto pelo código.

#### Exemplo de Requisição
```json
{
  "codigo": "7891234567890"
}
```

#### Resposta de Sucesso
```json
{
  "produto": "Tinta Acrílica 18L",
  "preco": "249.90",
  "dados": {
    "CODIGO": "123",
    "DESCR": "Tinta Acrílica 18L",
    "PRECO": "249.90"
  }
}
```

#### Resposta de Erro
```json
{
  "erro": "Produto não encontrado."
}
```

---

## 🌐 Acesso em Rede Local

- O servidor estará acessível no endereço configurado no `hosts`, como `precostintas.com`, ou via IP local.
- Caso não funcione:
  1. Abra o **Prompt de Comando** e digite:
     ```bash
     ipconfig
     ```
  2. Copie o IPv4 exibido.
  3. Edite o arquivo:
     ```
     C:/Windows/System32/drivers/etc/hosts
     ```
  4. Substitua o IP `172.16.0.139` pelo IPv4 obtido.

---

## 📜 Licença
Este projeto é de uso interno e não possui licença pública definida.

---

✏️ Desenvolvido para facilitar a consulta rápida de preços a partir de arquivos `.DBF`.
