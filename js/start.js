const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

// 사용자가 선택한 버튼 구분을 위한 배열 (선택된 답에 대한 결과가 저장)
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// 질문 개수 
const endPoint = 12;

// 결과 연산 함수
function calResult() {
    // select 배열에서 최대값을 가지고 있는 인덱스를 반환
    var result = select.indexOf(Math.max(...select));
    return result;
}

// 결과
function setResult() {
    // point에 가장 많이 선택한 인덱스(result)가 담김
    let point = calResult();
    const resultName = document.querySelector('.resultName');
    // resultName.innerHTML = infoList[point].name;
    console.log(infoList[point].name);

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = './canvas/image-' + point + '.png';

    // resultImg에 주소와 alt 값을 부여
    resultImg.src = imgURL;
    // 공유하기 버튼을 만들 때 필요한 alt에 point 값 할당
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');

    imgDiv.appendChild(resultImg);

}

// 결과 페이지 보여주는 함수
function goResult() {
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450)})

        setResult();
    }


// 질문지 답안 버튼으로 만드는 addAnswer() 함수
function addAnswer(answerText, qIdx, idx){
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
            // qIdx로 몇 번째 질문인지를 알 수 있음. 선택한 답안은 idx로 알 수 있음.
            var target = qnaList[qIdx].a[idx].type;
            // 반복문은 target의 length까지 돌고, 사용자가 버튼을 선택하였을 때 0~16 중 해당하는 타입이 1씩 증가함
            for (let i = 0; i < target.length; i++) {
                select[target[i]] += 1;
            }
            for (let i = 0; i < children.length; i++) {
                children[i].style.display = 'none'
            }
            goNext(++qIdx);
        }, 450)
    }, false);
}

// 질문
function goNext(qIdx){
    // 최종 질문까지 끝났을 때 
    if(qIdx === endPoint) {
        goResult();
        return;
    }

    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    // 질문지 답안 버튼으로 만들기 여러개의 버튼이니까 반복문 사용
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
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