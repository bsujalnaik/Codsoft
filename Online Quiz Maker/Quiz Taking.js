document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('create.html')) {
      document.getElementById('quizForm').addEventListener('submit', saveQuiz);
    } else if (window.location.pathname.endsWith('quiz-list.html')) {
      loadQuizList();
    } else if (window.location.pathname.endsWith('take-quiz.html')) {
      loadQuiz();
    }
  });
  
  let currentQuestionIndex = 0;
  const questions = [];
  
  function addQuestion() {
    const questionContainer = document.getElementById('questionsContainer');
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `
      <label>Question:</label>
      <input type="text" name="question" required>
      <label>Option A:</label>
      <input type="text" name="optionA" required>
      <label>Option B:</label>
      <input type="text" name="optionB" required>
      <label>Option C:</label>
      <input type="text" name="optionC" required>
      <label>Option D:</label>
      <input type="text" name="optionD" required>
      <label>Correct Answer:</label>
      <select name="correctAnswer" required>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      </select>
    `;
    questionContainer.appendChild(questionDiv);
  }
  
  function saveQuiz(event) {
    event.preventDefault();
  
    const quizTitle = document.getElementById('quizTitle').value;
    const questionElements = document.querySelectorAll('.question');
  
    let quiz = {
      title: quizTitle,
      questions: []
    };
  
    questionElements.forEach((questionElement) => {
      let question = {
        question: questionElement.querySelector('input[name="question"]').value,
        optionA: questionElement.querySelector('input[name="optionA"]').value,
        optionB: questionElement.querySelector('input[name="optionB"]').value,
        optionC: questionElement.querySelector('input[name="optionC"]').value,
        optionD: questionElement.querySelector('input[name="optionD"]').value,
        correctAnswer: questionElement.querySelector('select[name="correctAnswer"]').value
      };
      quiz.questions.push(question);
    });
  
    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    quizzes.push(quiz);
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
  
    alert('Quiz saved successfully!');
    document.getElementById('quizForm').reset();
    document.getElementById('questionsContainer').innerHTML = '';
  }
  
  function loadQuizList() {
    const quizListContainer = document.getElementById('quizListContainer');
    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
  
    quizzes.forEach((quiz, index) => {
      let quizDiv = document.createElement('div');
      quizDiv.classList.add('quiz');
      quizDiv.innerHTML = `
        <h3>${quiz.title}</h3>
        <button onclick="takeQuiz(${index})">Take Quiz</button>
      `;
      quizListContainer.appendChild(quizDiv);
    });
  }
  
  function takeQuiz(index) {
    localStorage.setItem('currentQuiz', index);
    window.location.href = 'take-quiz.html';
  }
  
  function loadQuiz() {
    const quizIndex = localStorage.getItem('currentQuiz');
    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const selectedQuiz = quizzes[quizIndex];
  
    document.getElementById('quizTitle').innerText = selectedQuiz.title;
    questions.push(...selectedQuiz.questions);
  
    showQuestion(currentQuestionIndex);
  
    document.getElementById('nextButton').addEventListener('click', nextQuestion);
  }
  
  function showQuestion(index) {
    const questionElement = document.getElementById('quizQuestion');
    const optionsElement = document.getElementById('quizOptions');
    const question = questions[index];
    questionElement.innerText = question.question;
    optionsElement.innerHTML = `
      <li><input type="radio" name="answer" value="A">${question.optionA}</li>
      <li><input type="radio" name="answer" value="B">${question.optionB}</li>
      <li><input type="radio" name="answer" value="C">${question.optionC}</li>
      <li><input type="radio" name="answer" value="D">${question.optionD}</li>
    `;
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion(currentQuestionIndex);
    } else {
      submitQuiz();
    }
  }
  
  function submitQuiz() {
    let score = 0;
    const selectedAnswers = document.querySelectorAll('input[name="answer"]:checked');
    selectedAnswers.forEach((selectedAnswer, index) => {
      if (selectedAnswer.value === questions[index].correctAnswer) {
        score++;
      }
    });
    displayResults(score, questions.length);
  }
  
  function displayResults(score, total) {
    const resultsElement = document.getElementById('results');
    resultsElement.innerText = `You scored ${score} out of ${total}`;
  }
  