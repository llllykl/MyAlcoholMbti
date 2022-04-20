
// main 변수에는 index.html의 main section이 담김
const main = document.querySelector("#main");
// qna 변수에는 index.html의 qna section이 담김
const qna = document.querySelector("#qna");

// begin 함수 실행 시 main 페이지 숨겨지고, qna 페이지 보여짐
// 메인 이미지 클릭 시 실행
function begin() {
    // begin 함수가 실행되었을 때 main section을 끄기 시작함
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    // setTimeout() : 타이머가 만료된 뒤 함수나 지정된 코드를 실행하는 타이머를 설정
    // main section이 1초의 반 가량 꺼졌을 때(450) qna section 등장
    setTimeout( () => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        // main 애니메이션 끝났을 때 main section display none
        setTimeout( () => {
            main.style.display = "none";
            // main이 완전히 꺼진 후에 qna display block
            qna.style.display = "block";
        }, 450)
    }, 450);
}