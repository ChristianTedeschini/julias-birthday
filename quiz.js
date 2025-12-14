const quizData = [
  {
    question: "A sua cor favorita?",
    options: ["Roxo", "Tons Terrosos", "Rosa", "Vermelho"],
  },
  {
    question: "Qual a sua música favorita?",
    options: ["Cor de Marte", "Confident", "The Fate of Ophelia", "Meninos e Meninas"],
  },
  {
    question: "Qual dos arcanos maiores do tarot te representa?",
    options: ["A Sacerdotisa", "A Roda da Fortuna", "Os Enamorados", "A Estrela"],
  },
  {
    question: "Qual o melhor programa para se fazer no fim de semana?",
    options: ["Descobrir coisas sobre a vida alheia no tarot", "Procurar emprego no LinkedIn", "Ir a um date em um barzinho", "Assistir filmes indicados ao Oscar"],
  },
  {
    question: "Qual desses apelidos você escolheria?",
    options: ["Saficrente", "Centavos", "Passivinha", "Voldemort"],
  },
];

let currentQuestion = 0;
let votes = [0, 0, 0, 0];
let userAnswers = [];

// Variáveis DOM globais
let questionElement, optionsDiv, submitButton;

document.addEventListener('DOMContentLoaded', function() {
  // Inicializa as variáveis DOM
  questionElement = document.getElementById('question');
  optionsDiv = document.getElementById('options');
  submitButton = document.getElementById('submit');

  // Configura evento do botão
  submitButton.addEventListener('click', nextQuestion);

  // Inicializa mostrando a primeira questão
  showQuestion();
});

function showQuestion() {
  const item = quizData[currentQuestion];
  questionElement.innerText = item.question;
  optionsDiv.innerHTML = '';
  
  // Cria opções
  for (let i = 0; i < item.options.length; i++) {
    const option = document.createElement('div');
    option.className = 'option';
    option.innerHTML = `
      <input type="radio" name="question" id="option${i}" value="${i}" 
        ${userAnswers[currentQuestion] === i ? 'checked' : ''}>
      <label for="option${i}">${item.options[i]}</label>
    `;
    optionsDiv.appendChild(option);
  }
  
  // Altera texto do botão de submissão
  submitButton.innerText = currentQuestion === quizData.length - 1 ? 'Ver Resultados' : 'Próxima Pergunta';
}

function nextQuestion() {
  const selectedOption = document.querySelector('input[name="question"]:checked');
  
  if (selectedOption) {
    const selectedValue = parseInt(selectedOption.value);
    userAnswers[currentQuestion] = selectedValue;
    
    if (currentQuestion < quizData.length - 1) {
      currentQuestion++;
      showQuestion();
    } else {
      // Todas as questões respondidas - calcular resultados
      calculateResults();
      showResults();
    }
  } else {
    alert("Por favor, selecione uma opção antes de continuar.");
  }
}

function calculateResults() {
  // Resetar votos
  votes = [0, 0, 0, 0];
  
  // Contar votos baseados nas respostas do usuário
  userAnswers.forEach(answer => {
    if (answer >= 0 && answer < votes.length) {
      votes[answer]++;
    }
  });
}

function showResults() {
  const quizContainer = document.getElementById('quiz-container');

  const maxNumber = Math.max(...votes);
  const maxIndex = votes.indexOf(maxNumber);

  switch (maxIndex) {
    case 0:
      quizContainer.innerHTML = `
        <div class="result">
        <h2 class="result-title">✨ Você é… JU MÍSTICA! ✨</h2>
        <img class="result-image" src="./assets/images/quiz/ju-mistica.png" alt="Ju Mística">
        <p class="result-text">
          Parabéns! Você é cheia de intuição, tem vibe esotérica e muita vontade de descobrir o que se passa na vida alheia usando o tarot, que é um método MUUUUITO confiável e ético. Você acredita em sinais do universo, ama um bom cristal e provavelmente já tirou um tarot só pra “confirmar o que já sabia”. <br>
          Seu rolê perfeito? Um banho de ervas, uma passadinha no terreiro e fofocas sobre seus interesses românticos às 2h da manhã. <br>
          Seu lema: “Vi no tarot que…”
        </p>
        <button id="restart" class="btn">Fazer Quiz Novamente</button>
        </div>
      `;
      break;

    case 1:
      quizContainer.innerHTML = `
        <div class="result">
        <h2 class="result-title">💼 Você é… JU CLT!! 💼</h2>
        <img class="result-image" src="./assets/images/quiz/ju-clt.png" alt="Ju CLT">
        <p class="result-text">
          Organizada, responsável e sempre com um café do lado (porque sem ele, você não tem energia para aguentar um dia cheio de reuniões e demandas). Você é a personificação do burnout. Seus amigos te veem como a cansada do rolê — e às vezes você até concorda. <br>
          Você domina gravações, ama um benefício e vive no equilíbrio perfeito entre “mereço um aumento” e “vou ser demitida.” <br>
          Seu lema: “Trabalhar? Sim. Me estressar? Também.”
        </p>
        <button id="restart" class="btn">Fazer Quiz Novamente</button>
        </div>
      `;
      break;

    case 2:
      quizContainer.innerHTML = `
        <div class="result">
        <h2 class="result-title">❤️ Você é… JU APAIXONADA!!! ❤️</h2>
        <img class="result-image" src="./assets/images/quiz/ju-apaixonada.png" alt="Ju Apaixonada">
        <p class="result-text">
          Você vive com o coração fora do peito — e tudo bem, é exatamente isso que gera entretenimento aos seus fãs, mesmo que você fique meio delulu de vez em quando. Intensa, romântica e torcendo para as pessoas erradas (ou a certa) voltarem pra sua vida. Você é fiel a ficante e transforma qualquer playlist fofa na trilha sonora da sua série de comédia romântica. <br>
          Quando ama, ama de verdade. Quando não ama, aguarda a próxima obsessão do mês. <br>
          Seu lema: “Melhor se arrepender do que passar vontade.”
        </p>
        <button id="restart" class="btn">Fazer Quiz Novamente</button>
        </div>
      `;
      break;

    case 3:
      quizContainer.innerHTML = `
        <div class="result">
        <h2 class="result-title">🎬 Você é… JU CINÉFILA! 🎬</h2>
        <img class="result-image" src="./assets/images/quiz/ju-cinefila.png" alt="Ju Cinéfila">
        <p class="result-text">
          Seus amigos sabem: você nunca apenas fala sobre filmes… você FAZ UMA ANÁLISE. Ama boas histórias, maratonar clássicos e sempre tem uma indicação perfeita na ponta da língua. Mas o mais importante: a direção de arte deve ser bem feita. <br>
          Seu momento de paz? Pipoca, meia confortável e aquele filme que mexe com a alma (ou um trash perfeito pra rir). <br>
          Seu lema: “Não sei de gosto do ângulo dessa cena.”
        </p>
        <button id="restart" class="btn">Fazer Quiz Novamente</button>
        </div>
      `;
      break;
  }
  
  // Adiciona funcionalidade ao botão de reiniciar
  document.getElementById('restart').addEventListener('click', restartQuiz);
}

function restartQuiz() {
  // Reinicia as variáveis do quiz
  currentQuestion = 0;
  votes = [0, 0, 0, 0];
  userAnswers = [];
  
  // Restaura a estrutura original do quiz
  const quizContainer = document.getElementById('quiz-container');

  quizContainer.innerHTML = `
    <h2 id="question"></h2>
    <div id="options" class="options"></div>
    <button id="submit" class="btn">Próxima Pergunta</button>
  `;
  
  // Reatribui as variáveis DOM (IMPORTANTE!)
  questionElement = document.getElementById('question');
  optionsDiv = document.getElementById('options');
  submitButton = document.getElementById('submit');
  
  // Reconfigura o evento do botão
  submitButton.addEventListener('click', nextQuestion);
  
  // Mostra a primeira questão
  showQuestion();
}