let questions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let userAnswers = [];

const questionBank = {
  student: {
    Math: [
      {q:"What is 2+2?", options:["3","4","5","6"], answer:"4"},
      {q:"What is 10-4?", options:["5","6","7","8"], answer:"6"},
      {q:"What is 5×6?", options:["20","25","30","35"], answer:"30"},
      {q:"What is 12÷4?", options:["2","3","4","6"], answer:"3"},
      {q:"Square root of 81?", options:["7","8","9","10"], answer:"9"},
      {q:"Value of π (approx)?", options:["2.12","3.14","3.41","4.13"], answer:"3.14"},
      {q:"What is 15% of 200?", options:["25","30","35","40"], answer:"30"},
      {q:"Solve: 7²?", options:["47","48","49","50"], answer:"49"},
      {q:"What is 1000/10?", options:["10","50","100","200"], answer:"100"},
      {q:"Smallest prime number?", options:["0","1","2","3"], answer:"2"}
    ],
    Science: [
      {q:"Water freezes at?", options:["0°C","10°C","-5°C","5°C"], answer:"0°C"},
      {q:"Earth revolves around?", options:["Moon","Sun","Mars","Venus"], answer:"Sun"},
      {q:"Gas needed for breathing?", options:["Oxygen","Nitrogen","Carbon","Helium"], answer:"Oxygen"},
      {q:"Which planet is Red Planet?", options:["Earth","Mars","Venus","Jupiter"], answer:"Mars"},
      {q:"Which organ pumps blood?", options:["Liver","Heart","Lungs","Kidney"], answer:"Heart"},
      {q:"H2O is?", options:["Water","Hydrogen","Oxygen","Acid"], answer:"Water"},
      {q:"Force unit?", options:["Newton","Joule","Watt","Pascal"], answer:"Newton"},
      {q:"Plant food made by?", options:["Photosynthesis","Respiration","Digestion","Evaporation"], answer:"Photosynthesis"},
      {q:"Human skeleton bones?", options:["106","206","306","406"], answer:"206"},
      {q:"Sun is a?", options:["Planet","Star","Asteroid","Comet"], answer:"Star"}
    ]
  },
  college: {
    Physics: [
      {q:"Unit of Force?", options:["Newton","Joule","Pascal","Watt"], answer:"Newton"},
      {q:"Speed of light?", options:["3×10^8 m/s","1.5×10^8 m/s","3×10^6 m/s","3000 m/s"], answer:"3×10^8 m/s"},
      {q:"Acceleration due to gravity?", options:["8.8","9.8","10.8","11.8"], answer:"9.8"},
      {q:"Work=?", options:["Force×Mass","Force×Distance","Mass×Velocity","Power×Time"], answer:"Force×Distance"},
      {q:"Energy unit?", options:["Newton","Pascal","Joule","Watt"], answer:"Joule"},
      {q:"1 kWh =?", options:["1000 J","3600 J","3.6×10^6 J","100 J"], answer:"3.6×10^6 J"},
      {q:"Ohm’s law?", options:["V=IR","P=VI","E=mc²","F=ma"], answer:"V=IR"},
      {q:"SI unit of Power?", options:["Joule","Watt","Newton","Ampere"], answer:"Watt"},
      {q:"Lens used in magnifying glass?", options:["Concave","Convex","Plane","Prism"], answer:"Convex"},
      {q:"Charge of electron?", options:["+1","-1","0","+2"], answer:"-1"}
    ],
    C: [
      {q:"C developed by?", options:["Dennis Ritchie","James Gosling","Guido Rossum","Bjarne Stroustrup"], answer:"Dennis Ritchie"},
      {q:"File extension of C?", options:[".cpp",".java",".c",".py"], answer:".c"},
      {q:"Symbol to end statement?", options:[";","/",".",":"], answer:";"},
      {q:"Keyword to return value?", options:["break","continue","return","exit"], answer:"return"},
      {q:"Default return type of main()?", options:["void","int","float","char"], answer:"int"},
      {q:"Header for printf()?", options:["stdio.h","conio.h","math.h","stdlib.h"], answer:"stdio.h"},
      {q:"Operator for AND?", options:["&&","||","!","&"], answer:"&&"},
      {q:"Which loop executes at least once?", options:["for","while","do-while","if"], answer:"do-while"},
      {q:"Pointer stores?", options:["Value","Address","Function","Loop"], answer:"Address"},
      {q:"Which is not a keyword?", options:["auto","main","for","if"], answer:"main"}
    ],
    Python: [
      {q:"Python developed by?", options:["Dennis Ritchie","James Gosling","Guido van Rossum","Linus Torvalds"], answer:"Guido van Rossum"},
      {q:"File extension?", options:[".java",".py",".c",".txt"], answer:".py"},
      {q:"Mutable datatype?", options:["Tuple","List","String","Int"], answer:"List"},
      {q:"Keyword for function?", options:["def","function","fun","define"], answer:"def"},
      {q:"Loop keyword?", options:["for","foreach","loop","iterate"], answer:"for"},
      {q:"Default return of print()?", options:["int","str","None","bool"], answer:"None"},
      {q:"Which is library for ML?", options:["numpy","pandas","sklearn","all"], answer:"all"},
      {q:"Operator for power?", options:["^","**","//","%"], answer:"**"},
      {q:"Range(5) generates?", options:["0-5","1-5","0-4","1-6"], answer:"0-4"},
      {q:"Keyword for class?", options:["class","object","define","cls"], answer:"class"}
    ],
    Java: [
      {q:"Java developed by?", options:["Dennis Ritchie","James Gosling","Guido Rossum","Ken Thompson"], answer:"James Gosling"},
      {q:"File extension?", options:[".class",".java",".js",".jv"], answer:".java"},
      {q:"Entry point method?", options:["start()","main()","run()","init()"], answer:"main()"},
      {q:"Keyword for inheritance?", options:["extends","implements","inherits","super"], answer:"extends"},
      {q:"JVM means?", options:["Java Virtual Machine","Java Variable Manager","Just Virtual Machine","None"], answer:"Java Virtual Machine"},
      {q:"OOP not feature?", options:["Encapsulation","Polymorphism","Compilation","Inheritance"], answer:"Compilation"},
      {q:"Method overriding in?", options:["Compile-time","Run-time","Both","Never"], answer:"Run-time"},
      {q:"Keyword for interface?", options:["interface","class","extends","package"], answer:"interface"},
      {q:"Package keyword?", options:["import","export","include","package"], answer:"package"},
      {q:"Which collection allows duplicates?", options:["Set","Map","List","None"], answer:"List"}
    ]
  },
  professor: {
    Research: [
      {q:"h-index used for?", options:["IQ","Teaching","Research impact","Speed"], answer:"Research impact"},
      {q:"Citation style in CS?", options:["APA","MLA","IEEE","Harvard"], answer:"IEEE"},
      {q:"Impact factor relates to?", options:["Journals","Books","Exams","Projects"], answer:"Journals"},
      {q:"Scopus is?", options:["Database","Search engine","Book","Tool"], answer:"Database"},
      {q:"Which is plagiarism tool?", options:["Turnitin","LaTeX","Overleaf","Mendeley"], answer:"Turnitin"},
      {q:"LaTeX used for?", options:["Coding","Typesetting","Drawing","Compiling"], answer:"Typesetting"},
      {q:"Conference publication is?", options:["Primary","Secondary","Tertiary","None"], answer:"Primary"},
      {q:"Open access journal?", options:["Free","Paid","Restricted","Closed"], answer:"Free"},
      {q:"DOI stands for?", options:["Digital Object Identifier","Data Online Index","Doc Over Internet","None"], answer:"Digital Object Identifier"},
      {q:"ORCID is?", options:["Researcher ID","Paper ID","Journal ID","Grant ID"], answer:"Researcher ID"}
    ]
  }
};

function updateCategories() {
  const role = document.getElementById("role").value;
  const categorySelect = document.getElementById("category");
  categorySelect.innerHTML = "";
  if (role && questionBank[role]) {
    Object.keys(questionBank[role]).forEach(cat => {
      let opt = document.createElement("option");
      opt.value = cat;
      opt.innerText = cat;
      categorySelect.appendChild(opt);
    });
  }
}

function startQuiz() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const role = document.getElementById("role").value;
  const category = document.getElementById("category").value;

  if (!name || !email || !role || !category) {
    alert("Please fill all fields!");
    return;
  }

  currentQuestion = 0;
  score = 0;
  userAnswers = [];

  questions = questionBank[role][category];
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("quizScreen").classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  if (currentQuestion >= questions.length) {
    endQuiz();
    return;
  }
  document.getElementById("question").innerText = questions[currentQuestion].q;
  let optionsHtml = "";
  questions[currentQuestion].options.forEach(opt => {
    optionsHtml += `<div class="option" onclick="selectAnswer('${opt}')">${opt}</div>`;
  });
  document.getElementById("options").innerHTML = optionsHtml;
  startTimer();
}

function selectAnswer(selected) {
  clearInterval(timer);
  let correctAnswer = questions[currentQuestion].answer;
  userAnswers.push({question: questions[currentQuestion].q, selected, correct: correctAnswer});
  if (selected === correctAnswer) score++;
  currentQuestion++;
  loadQuestion();
}

function startTimer() {
  let timeLeft = 15;
  document.getElementById("timer").innerText = "Time left: " + timeLeft + "s";
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = "Time left: " + timeLeft + "s";
    if (timeLeft <= 0) {
      clearInterval(timer);
      userAnswers.push({
        question: questions[currentQuestion].q,
        selected: "No Answer",
        correct: questions[currentQuestion].answer
      });
      currentQuestion++;
      loadQuestion();
    }
  }, 1000);
}

function endQuiz() {
  document.getElementById("quizScreen").classList.add("hidden");
  document.getElementById("resultScreen").classList.remove("hidden");
  document.getElementById("score").innerText = `You scored ${score} out of ${questions.length}`;
  let feedback = score === questions.length ? "🎉🔥 Excellent!" : 
                 score >= questions.length/2 ? "🙂👍 Good Job!" : "😢 Better luck next time!";
  document.getElementById("emojiFeedback").innerText = feedback;
  let reviewHtml = "";
  userAnswers.forEach((ans,i)=>{
    reviewHtml += `<div class="review">
      <p><b>Q${i+1}:</b> ${ans.question}</p>
      <p>Your Answer: <span class="${ans.selected===ans.correct?'correct':'wrong'}">${ans.selected}</span></p>
      <p>Correct Answer: <span class="correct">${ans.correct}</span></p>
    </div>`;
  });
  document.getElementById("review").innerHTML = reviewHtml;
}

function playAgain() {
  document.getElementById("resultScreen").classList.add("hidden");
  document.getElementById("startScreen").classList.remove("hidden");
}
