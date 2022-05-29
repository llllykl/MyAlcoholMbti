const main = document.querySelector("#main");
const qna = document.querySelector("#qna");

const endPoint=12;

// 질문지 답안 버튼으로 만드는 addAnswer() 함수
function addAnswer(answerText, qIdx){
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-5');
    answer.classList.add('py-4');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    // answer버튼이 a에 소속
    a.appendChild(answer);
    answer.innerHTML = answerText;

    // 답안지를 클릭하면 다음 질문으로 넘어가기
    answer.addEventListener("click", function(){
        // button 세개 다 사라지게 하기 (모두 선택)
        var children = document.querySelectorAll('.answerList');
        // 버튼 비활성화
        // 사용자가 버튼 하나만 눌러도 모든 버튼들이 사라짐
        for (let i = 0; i < children.length; i++) {
            children[i].disabled = true;
            // fadeOut
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        // 시간을 두고 답안지 사라지기
        setTimeout(() => {
            for (let i = 0; i < children.length; i++) {
                children[i].style.display = 'none'
            }
            goNext(++qIdx);
        }, 450)
    }, false);
}

// 질문
function goNext(qIdx){
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    // 질문지 답안 버튼으로 만들기 여러개의 버튼이니까 반복문 사용
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx);
    }
    var status = document.querySelector('.statusBar');
    status.style.width=(100/endPoint)*(qIdx+1)+'%';
    document.querySelector('.statusnum').innerHTML = qIdx+1  + '/12';
}


// begin() 함수 호출되면 main페이지 사라지고 qna페이지 나타나기
function begin(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450)
        let qIdx = 0;
        goNext(qIdx);
    }, 450); 
}