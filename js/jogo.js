// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Captura os botões pelos IDs e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  // Mostra o botão jogar novamente alterando a classe CSS (className)
  btnJogarNovamente.className = 'visivel';
  // Oculta o botão reiniciar alterando a classe CSS (className)
  btnReiniciar.className = 'invisivel';
}

// Função jogar novamente
function jogarNovamente() {
  jogar = true; // Variável jogar volta a ser verdadeira
  // Armazenamos todas as divs na variável divis (getElementsByTagName)
  let divis = document.getElementsByTagName("div");
  // Percorremos todas as divs armazenadas
  for (let i = 0; i < divis.length; i++) {
    // Verificamos se são as divs com ids de 0 a 5
    if (divis[i].id >= 0 && divis[i].id <= 5) {
      // Alteramos a classe CSS das divs de 0 a 5 (className)
      divis[i].className = "inicial";
      // Remove qualquer imagem que possa estar sobre a div
      const img = divis[i].querySelector('img');
      if (img) {
        img.remove();
      }
    }
  }
}

// Função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  // Calcula o desempenho em porcentagem
  desempenho = (acertos / tentativas) * 100;
  // Escreve o placar com os valores atualizados (innerHTML)
  document.getElementById("resposta").innerHTML = "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";
}

// Função executada quando o jogador acertou
function acertou(obj) {
  // Altera a classe CSS da <div> escolhida pelo jogador (className)
  obj.className = "acertou";
  // Criar uma constante img que armazena um novo objeto imagem com largura de 100px
  const img = new Image(100);
  img.id = "imagem";
  // Altera o atributo src (source) da imagem criada
  img.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/88acf454-f55b-4bcf-819e-28bd26a9f9a5/dh0di0x-8b52b9db-93fe-4e45-9b75-6c1261f6c7f2.png/v1/fill/w_1280,h_962/nemo_png_by_darkmeowser_dh0di0x-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTYyIiwicGF0aCI6IlwvZlwvODhhY2Y0NTQtZjU1Yi00YmNmLTgxOWUtMjhiZDI2YTlmOWE1XC9kaDBkaTB4LThiNTJiOWRiLTkzZmUtNGU0NS05Yjc1LTZjMTI2MWY2YzdmMi5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.-k0ltvT4lcGDkzTuB-DAImE3GqQ9YjEy1zAm022dGeQ";
  // Adiciona a imagem criada na div (obj) escolhida pelo jogador (appendChild)
  obj.appendChild(img);
}

// Função que exibe a imagem de erro na carta clicada
function adicionarImagemErro(obj) {
  const img = new Image(100);
  img.src = "images/lunemo.jpg"; // Caminho para a imagem lunemo.jpg
  img.className = "imagem-cobre";
  obj.style.position = "relative"; // Para que a imagem se posicione corretamente
  obj.appendChild(img);
}

// Função que sorteia um número aleatório entre 0 e 5 e verifica se o jogador acertou
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;
    
    if (tentativas == 6) { // Atualizado para 6 tentativas
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }

    let sorteado = Math.floor(Math.random() * 6);

    if (obj.id == sorteado) {
      acertou(obj);
      acertos++;
    } else {
      obj.className = "errou";
      adicionarImagemErro(obj); // Adiciona a imagem de erro sobre a carta clicada
      const objSorteado = document.getElementById(sorteado);
      acertou(objSorteado);
    }

    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

// Adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
