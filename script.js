const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')

const questionContainerElement= document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement= document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame(){
     console.log('started')
     startButton.classList.add('hide')
     shuffledQuestions= questions.sort(() => Math.random() - .5)
     currentQuestionIndex = 0
     questionContainerElement.classList.remove('hide')
    setNextQuestion()
}
function setNextQuestion(){
    resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}
function showQuestion(question)
{
    questionElement.innerText= question.question
    question.answers.forEach(answer => {
    const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click',selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}
function resetState()
{
    clearStatusClass(document.body)
   nextButton.classList.add('hide')
   while(answerButtonsElement.firstChild){
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
   }
}
function selectAnswer(e){
     const selectedButton = e.target
     const correct = selectedButton.dataset.correct
     setStatusClass(document.body , correct)
     Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button,button.dataset.correct)
    })

    if(shuffledQuestions.length > currentQuestionIndex+1){
       nextButton.classList.remove('hide')
    }else{
        startButton.innerText= 'Restart'
        startButton.classList.remove('hide')
    }
}
function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    }else{
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions =[
  { 
    question:'What is the full form of DBMS?',
    answers: [
       {text:'Data of Binary Management System',correct:false},
       {text:'Database Management System',correct:true},
       {text:'Database Management Service',correct:false},
       {text:'Data Backup Management System',correct:false}  
    ]
  },
  {
  question:'What is DBMS?',
  answers: [
     {text:'DBMS is a collection of queries',correct:false},
     {text:'DBMS is a high-level language',correct:false},
     {text:'DBMS is a programming language',correct:false},
     {text:' DBMS stores, modifies and retrieves data',correct:true}  
  ]
},
{
    question:'Which type of data can be stored in the database?',
    answers: [
       {text:'Image oriented data',correct:false},
       {text:'Text, files containing data',correct:false},
       {text:'Data in the form of audio or video',correct:false},
       {text:'All of the above',correct:true}  
    ]
  },
  {
    question:'Which of the following is not a type of database?',
    answers: [
       {text:'Hierarchical',correct:false},
       {text:'Network',correct:false},
       {text:'Distributed',correct:false},
       {text:'Decentralized',correct:true}  
    ]
  }
]

