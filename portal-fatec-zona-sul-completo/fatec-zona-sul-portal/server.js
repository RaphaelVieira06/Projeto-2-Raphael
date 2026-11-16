const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 2000;
const ROOT = path.join(__dirname, "public");
const DATA = path.join(__dirname, "data");
const mime = {".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".json":"application/json; charset=utf-8",".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg"};
if (!fs.existsSync(DATA)) fs.mkdirSync(DATA);
const events = [
 {id:1,date:"A confirmar",title:"Semana de Tecnologia e Inovação",type:"Acadêmico",description:"Palestras, oficinas e troca de experiências sobre desenvolvimento, inovação e mercado de trabalho."},
 {id:2,date:"A confirmar",title:"Encontro de Carreiras",type:"Carreira",description:"Conversa com profissionais e ex-alunos sobre oportunidades e caminhos profissionais."},
 {id:3,date:"A confirmar",title:"Mostra de Projetos Integradores",type:"Acadêmico",description:"Apresentação de projetos desenvolvidos pelos estudantes dos cursos da unidade."}
];
function send(res,status,data,type="application/json; charset=utf-8"){res.writeHead(status,{"Content-Type":type,"Access-Control-Allow-Origin":"*"});res.end(type.startsWith("application/json")?JSON.stringify(data):data);}
const server = http.createServer((req,res)=>{
  if(req.method==="OPTIONS"){res.writeHead(204,{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET,POST,OPTIONS","Access-Control-Allow-Headers":"Content-Type"});return res.end();}
  const url = new URL(req.url,`http://${req.headers.host}`);
  if(url.pathname==="/api/status" && req.method==="GET") return send(res,200,{status:"online",porta:PORT,mensagem:"Backend da FATEC Zona Sul funcionando."});
  if(url.pathname==="/api/eventos" && req.method==="GET") return send(res,200,events);
  if(url.pathname==="/api/contato" && req.method==="POST"){
    let body=""; req.on("data",chunk=>body+=chunk);
    req.on("end",()=>{
      try{
        const item=JSON.parse(body);
        if(!item.nome || !item.email || !item.mensagem) return send(res,400,{erro:"Preencha nome, e-mail e mensagem."});
        const file=path.join(DATA,"mensagens.json");
        const all=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,"utf8")):[];
        all.push({nome:String(item.nome).slice(0,100),email:String(item.email).slice(0,150),mensagem:String(item.mensagem).slice(0,1000),data:new Date().toISOString()});
        fs.writeFileSync(file,JSON.stringify(all,null,2));
        return send(res,201,{sucesso:true,mensagem:"Mensagem registrada no servidor."});
      }catch(e){return send(res,400,{erro:"Não foi possível processar os dados enviados."});}
    }); return;
  }
  let requested=decodeURIComponent(url.pathname);
  if(requested==="/") requested="/index.html";
  const target=path.normalize(path.join(ROOT,requested));
  if(!target.startsWith(ROOT)) return send(res,403,{erro:"Acesso negado."});
  fs.readFile(target,(err,content)=>{
    if(err) return send(res,404,"Página não encontrada.", "text/plain; charset=utf-8");
    send(res,200,content,mime[path.extname(target)]||"application/octet-stream");
  });
});
server.listen(PORT,()=>console.log(`Portal FATEC Zona Sul disponível em http://localhost:${PORT}`));
