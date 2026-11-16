# Portal FATEC Zona Sul

Projeto acadêmico de desenvolvimento web com Frontend e Backend em Node.js, executado obrigatoriamente na porta **2000**.

## Requisitos
- Node.js 18 ou superior
- Visual Studio Code (opcional)

## Como executar
1. Extraia o ZIP.
2. Abra a pasta `fatec-zona-sul-portal` no VS Code.
3. Abra o terminal integrado: **Terminal > Novo Terminal**.
4. Execute `npm start`.
5. Acesse `http://localhost:2000`.


## Funcionalidades
- Página inicial e navegação responsiva.
- Vestibular com links oficiais.
- Listagem de cursos e quatro páginas individuais.
- Página de infraestrutura.
- Eventos carregados pela API `GET /api/eventos`.
- Formulário integrado à API `POST /api/contato`.
- Status do servidor em `GET /api/status`.
- Mensagens salvas em `data/mensagens.json`.

## Estrutura
```text
fatec-zona-sul-portal/
├── data/
├── public/
│   ├── cursos/
│   ├── app.js
│   ├── style.css
│   └── páginas HTML
├── package.json
├── server.js
└── README.md
```

**Observação:** projeto acadêmico independente, sem vínculo oficial com o Centro Paula Souza. Conteúdos de agenda são exemplos demonstrativos; prazos de vestibular devem ser confirmados no edital vigente.
