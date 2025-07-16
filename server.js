const express = require("express");
const path = require("path");
const { DBFFile } = require("dbffile");

const app = express();
const PORT = process.env.PORT || 3000;

let produtos = [];

/**
 * Carrega o arquivo DBF com os dados de produtos.
 */
async function carregarDBF() {
  const caminho = path.join(__dirname, "uploads", "PRECOS.DBF");

  try {
    const dbf = await DBFFile.open(caminho);
    console.log("Campos disponíveis no DBF:", dbf.fields.map(f => f.name));

    let todos = [];
    let lote;

    do {
      lote = await dbf.readRecords(1000);
      todos = todos.concat(lote);
    } while (lote.length > 0);

    produtos = todos;
    console.log(`${produtos.length} registros carregados do DBF.`);
  } catch (error) {
    console.error("Erro ao carregar o arquivo DBF:", error.message);
  }
}

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

/**
 * Endpoint para buscar produto por código.
 */
app.post("/buscar", (req, res) => {
  const { codigo } = req.body;

  if (!codigo) {
    return res.status(400).json({ erro: "Código não fornecido." });
  }

  const termo = codigo.toString().trim();

  const produto = produtos.find(p =>
    [p.CODIGO, p.CODBAR, p.CODBARRAS, p.COD, p.EAN]
      .map(v => v?.toString().trim())
      .includes(termo)
  );

  if (produto) {
    return res.json({
      produto: produto.DESCR || produto.NOME || "Sem descrição",
      preco: produto.PRECO || produto.VALOR || "0.00",
      dados: produto,
    });
  }

  return res.status(404).json({ erro: "Produto não encontrado." });
});

// Inicializa o servidor após carregar os dados
carregarDBF().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});
