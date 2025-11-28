// Biến toàn cục
let currentQuestion = 0;
let userAnswers = [];
let timeLeft = 3600; // 60 phút = 3600 giây
let timerInterval;
let quizStarted = false;
let shuffledQuizData = [];

// Hàm trộn mảng (Fisher-Yates shuffle)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', function() {
    // Trộn câu hỏi
    shuffledQuizData = shuffleArray(quizData).map(q => {
        // Tạo mảng các index và trộn
        const indices = [0, 1, 2, 3].filter(i => i < q.options.length);
        const shuffledIndices = shuffleArray(indices);
        
        // Tạo options mới theo thứ tự đã trộn
        const shuffledOptions = shuffledIndices.map(i => q.options[i]);
        
        // Tìm vị trí mới của đáp án đúng
        const newCorrectIndex = shuffledIndices.indexOf(q.correct);
        
        return {
            ...q,
            options: shuffledOptions,
            correct: newCorrectIndex
        };
    });
    
    initQuiz();
    setupEventListeners();
    startTimer();
});

function initQuiz() {
    userAnswers = new Array(shuffledQuizData.length).fill(null);
    displayQuestion();
    updateQuestionCounter();
    updateNavigationButtons();
    renderQuestionList();
}

function setupEventListeners() {
    document.getElementById('prev-btn').addEventListener('click', previousQuestion);
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('submit-btn').addEventListener('click', submitQuiz);
    document.getElementById('restart-btn').addEventListener('click', restartQuiz);
}

function displayQuestion() {
    const questionContainer = document.getElementById('question-container');
    const question = shuffledQuizData[currentQuestion];
    
    let html = `
        <div class="question">
            <div class="question-text">
                <strong>Câu ${currentQuestion + 1}:</strong> ${question.question}
            </div>
            <div class="options">
    `;
    
    question.options.forEach((option, index) => {
        const isChecked = userAnswers[currentQuestion] === index ? 'checked' : '';
        const isSelected = userAnswers[currentQuestion] === index ? 'selected' : '';
        html += `
            <label class="option ${isSelected}">
                <input type="radio" 
                       name="question${currentQuestion}" 
                       value="${index}"
                       ${isChecked}
                       onchange="selectAnswer(${index})">
                <span>${String.fromCharCode(65 + index)}. ${option}</span>
            </label>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    questionContainer.innerHTML = html;
    updateQuestionList();
}

function renderQuestionList() {
    const listContainer = document.getElementById('question-list');
    let html = '';
    
    for (let i = 0; i < shuffledQuizData.length; i++) {
        const isAnswered = userAnswers[i] !== null;
        const isCurrent = i === currentQuestion;
        html += `
            <div class="question-item ${isAnswered ? 'answered' : ''} ${isCurrent ? 'current' : ''}" 
                 onclick="goToQuestion(${i})"
                 title="Câu ${i + 1}${isAnswered ? ' (Đã trả lời)' : ' (Chưa trả lời)'}">
                ${i + 1}
            </div>
        `;
    }
    
    listContainer.innerHTML = html;
}

function updateQuestionList() {
    renderQuestionList();
}

function goToQuestion(index) {
    currentQuestion = index;
    displayQuestion();
    updateQuestionCounter();
    updateNavigationButtons();
}

function selectAnswer(answerIndex) {
    userAnswers[currentQuestion] = answerIndex;
    
    // Cập nhật giao diện
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        if (index === answerIndex) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
    
    // Cập nhật danh sách câu hỏi
    updateQuestionList();
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
        updateQuestionCounter();
        updateNavigationButtons();
    }
}

function nextQuestion() {
    if (currentQuestion < shuffledQuizData.length - 1) {
        currentQuestion++;
        displayQuestion();
        updateQuestionCounter();
        updateNavigationButtons();
    }
}

function updateQuestionCounter() {
    const answered = userAnswers.filter(a => a !== null).length;
    document.getElementById('question-counter').textContent = 
        `Câu ${currentQuestion + 1}/${shuffledQuizData.length} (Đã trả lời: ${answered})`;
}

function updateNavigationButtons() {
    document.getElementById('prev-btn').disabled = currentQuestion === 0;
    document.getElementById('next-btn').disabled = currentQuestion === shuffledQuizData.length - 1;
}

function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Hết giờ! Bài thi sẽ được tự động nộp.');
            submitQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time-display').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Đổi màu khi còn ít thời gian
    const timerElement = document.getElementById('timer');
    if (timeLeft <= 300) { // 5 phút
        timerElement.style.color = '#dc3545';
        timerElement.style.fontWeight = 'bold';
    }
}

function submitQuiz() {
    // Kiểm tra câu hỏi chưa trả lời
    const unanswered = userAnswers.filter(a => a === null).length;
    if (unanswered > 0) {
        const confirm = window.confirm(
            `Bạn còn ${unanswered} câu chưa trả lời. Bạn có chắc muốn nộp bài?`
        );
        if (!confirm) return;
    }
    
    clearInterval(timerInterval);
    calculateScore();
    showResults();
}

function calculateScore() {
    let correct = 0;
    let incorrect = 0;
    let skipped = 0;
    
    userAnswers.forEach((answer, index) => {
        if (answer === null) {
            skipped++;
        } else if (answer === shuffledQuizData[index].correct) {
            correct++;
        } else {
            incorrect++;
        }
    });
    
    return { correct, incorrect, skipped };
}

function showResults() {
    const { correct, incorrect, skipped } = calculateScore();
    const total = shuffledQuizData.length;
    const percentage = ((correct / total) * 100).toFixed(1);
    const timeTaken = 3600 - timeLeft;
    const minutesTaken = Math.floor(timeTaken / 60);
    const secondsTaken = timeTaken % 60;
    
    // Ẩn quiz, hiện kết quả
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');
    
    // Hiển thị điểm
    let grade = '';
    let gradeColor = '';
    if (percentage >= 80) {
        grade = 'Xuất sắc';
        gradeColor = '#28a745';
    } else if (percentage >= 65) {
        grade = 'Khá';
        gradeColor = '#17a2b8';
    } else if (percentage >= 50) {
        grade = 'Trung bình';
        gradeColor = '#ffc107';
    } else {
        grade = 'Yếu';
        gradeColor = '#dc3545';
    }
    
    document.getElementById('score-display').innerHTML = `
        <h3 style="font-size: 2.5em; margin-bottom: 20px;">${correct}/${total}</h3>
        <p style="font-size: 1.3em; margin-bottom: 10px;">Điểm: ${percentage}%</p>
        <p style="font-size: 1.5em; color: ${gradeColor}; font-weight: bold;">${grade}</p>
        <div class="score-details">
            <div class="score-item">
                <div style="font-size: 0.9em; opacity: 0.9;">Đúng</div>
                <div style="font-size: 1.5em; font-weight: bold;">${correct}</div>
            </div>
            <div class="score-item">
                <div style="font-size: 0.9em; opacity: 0.9;">Sai</div>
                <div style="font-size: 1.5em; font-weight: bold;">${incorrect}</div>
            </div>
            <div class="score-item">
                <div style="font-size: 0.9em; opacity: 0.9;">Bỏ qua</div>
                <div style="font-size: 1.5em; font-weight: bold;">${skipped}</div>
            </div>
            <div class="score-item">
                <div style="font-size: 0.9em; opacity: 0.9;">Thời gian</div>
                <div style="font-size: 1.5em; font-weight: bold;">${minutesTaken}:${secondsTaken.toString().padStart(2, '0')}</div>
            </div>
        </div>
    `;
    
    // Hiển thị đáp án chi tiết
    displayAnswerReview();
}

function displayAnswerReview() {
    const reviewContainer = document.getElementById('answer-review');
    let html = '<h3 style="margin-bottom: 20px; color: #667eea;">Xem lại đáp án</h3>';
    
    shuffledQuizData.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const correctAnswer = question.correct;
        const isCorrect = userAnswer === correctAnswer;
        
        html += `
            <div class="review-question ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="review-question-text">
                    Câu ${index + 1}: ${question.question}
                </div>
        `;
        
        if (userAnswer !== null) {
            html += `
                <div class="review-answer user">
                    <strong>Bạn chọn:</strong> ${String.fromCharCode(65 + userAnswer)}. ${question.options[userAnswer]}
                    ${isCorrect ? '✓' : '✗'}
                </div>
            `;
        } else {
            html += `
                <div class="review-answer user">
                    <strong>Bạn chọn:</strong> <em>Không trả lời</em>
                </div>
            `;
        }
        
        if (!isCorrect) {
            html += `
                <div class="review-answer correct-ans">
                    <strong>Đáp án đúng:</strong> ${String.fromCharCode(65 + correctAnswer)}. ${question.options[correctAnswer]}
                </div>
            `;
        }
        
        html += '</div>';
    });
    
    reviewContainer.innerHTML = html;
}

function restartQuiz() {
    // Trộn lại câu hỏi và đáp án
    shuffledQuizData = shuffleArray(quizData).map(q => {
        const indices = [0, 1, 2, 3].filter(i => i < q.options.length);
        const shuffledIndices = shuffleArray(indices);
        const shuffledOptions = shuffledIndices.map(i => q.options[i]);
        const newCorrectIndex = shuffledIndices.indexOf(q.correct);
        
        return {
            ...q,
            options: shuffledOptions,
            correct: newCorrectIndex
        };
    });
    
    currentQuestion = 0;
    userAnswers = new Array(shuffledQuizData.length).fill(null);
    timeLeft = 3600;
    
    document.getElementById('result-container').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    
    initQuiz();
    startTimer();
}
