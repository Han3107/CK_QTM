let shuffledQuestions = [];
let userAnswers = {};
const form = document.getElementById('quizForm');
const result = document.getElementById('result');
const progressBar = document.getElementById('progressBar');

// Shuffle array function
function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Render quiz with shuffled questions and options
function renderQuiz() {
    shuffledQuestions = shuffle(questionsData);
    form.innerHTML = '';
    
    shuffledQuestions.forEach((q, index) => {
        // Create shuffled options with original indices
        const shuffledOptions = q.options.map((opt, idx) => ({ 
            text: opt, 
            originalIndex: idx 
        }));
        const shuffled = shuffle(shuffledOptions);
        
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <div class="question-text">Câu ${index + 1}: ${q.question}</div>
            <div class="options">
                ${shuffled.map((opt, optIdx) => `
                    <div class="option">
                        <input type="radio" name="q${index}" value="${opt.originalIndex}" id="q${index}_${optIdx}">
                        <label for="q${index}_${optIdx}">${String.fromCharCode(97 + optIdx)}. ${opt.text}</label>
                    </div>
                `).join('')}
            </div>
        `;
        form.appendChild(questionDiv);
    });
    
    // Add submit button
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'submit-btn';
    submitBtn.textContent = 'Nộp Bài';
    form.appendChild(submitBtn);
}

// Update progress bar
document.addEventListener('change', function(e) {
    if (e.target.type === 'radio') {
        let answered = 0;
        shuffledQuestions.forEach((_, index) => {
            if (document.querySelector(`input[name="q${index}"]:checked`)) {
                answered++;
            }
        });
        const progress = (answered / shuffledQuestions.length) * 100;
        progressBar.style.width = progress + '%';
    }
});

// Handle form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let score = 0;
    let resultDetails = [];
    
    shuffledQuestions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        const correctAnswer = q.correct;
        const options = document.querySelectorAll(`input[name="q${index}"]`);
        
        let userAnswer = null;
        let isCorrect = false;
        
        // Highlight correct and incorrect answers
        options.forEach(option => {
            const parent = option.parentElement;
            parent.classList.remove('correct', 'incorrect');
            
            if (parseInt(option.value) === correctAnswer) {
                parent.classList.add('correct');
            }
            
            if (selected && option === selected) {
                userAnswer = parseInt(option.value);
                if (parseInt(option.value) === correctAnswer) {
                    score++;
                    isCorrect = true;
                } else {
                    parent.classList.add('incorrect');
                }
            }
        });
        
        // Store result details
        resultDetails.push({
            questionNum: index + 1,
            question: q.question,
            userAnswer: userAnswer !== null ? q.options[userAnswer] : 'Không trả lời',
            correctAnswer: q.options[correctAnswer],
            isCorrect: isCorrect
        });
    });
    
    // Calculate percentage
    const percentage = ((score / shuffledQuestions.length) * 100).toFixed(1);
    
    // Create detailed results HTML
    let detailsHTML = '<div class="result-details">';
    resultDetails.forEach(detail => {
        const iconClass = detail.isCorrect ? 'correct' : 'incorrect';
        const icon = detail.isCorrect ? '✓' : '✗';
        
        detailsHTML += `
            <div class="result-item ${iconClass}">
                <div class="result-question">
                    <span class="question-icon ${iconClass}">${icon}</span>
                    Câu ${detail.questionNum}: ${detail.question}
                </div>
                <div class="result-answer user-answer">
                    Bạn chọn: ${detail.userAnswer}
                </div>
                ${!detail.isCorrect ? `
                    <div class="result-answer correct-answer">
                        Đáp án đúng: ${detail.correctAnswer}
                    </div>
                ` : ''}
            </div>
        `;
    });
    detailsHTML += '</div>';
    
    // Display results
    document.getElementById('scoreText').textContent = `Kết Quả: ${score}/${shuffledQuestions.length}`;
    document.getElementById('scoreDetail').innerHTML = `
        <p>Bạn đã trả lời đúng ${score} câu trong tổng số ${shuffledQuestions.length} câu</p>
        <p>Điểm số: ${percentage}%</p>
        ${detailsHTML}
    `;
    document.getElementById('percentage').textContent = '';
    
    // Show result section
    result.classList.add('show');
    result.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Disable form inputs
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => input.disabled = true);
    document.querySelector('.submit-btn').disabled = true;
});

// Reset quiz function
function resetQuiz() {
    userAnswers = {};
    result.classList.remove('show');
    progressBar.style.width = '0%';
    renderQuiz();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
    renderQuiz();
});