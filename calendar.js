
let date = new Date();

// 년, 월 받아오기
const rederCalendar = () => {
  const year = date.getFullYear();
  const month = date.getMonth();


  let monthName = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

  document.querySelector(".mon").textContent = `${monthName[month]}`;

  const prevLast = new Date(year, month, 0);
  const thisLast = new Date(year, month + 1, 0);

  // 지난달 마지막 날짜, 요일
  const prevLastDate = prevLast.getDate();
  const PrevLastDay = prevLast.getDay();

  // 이번달 마지막 날짜, 요일
  const thisListDate = thisLast.getDate();
  const thisListDay = thisLast.getDay();

  const prevDates = [];
  const thisDates = [...Array(thisListDate + 1).keys()].slice(1);
  const nextDates = [];


  if(PrevLastDay !== 6) {
    for(let i = 0; i < PrevLastDay + 1; i++) {
      prevDates.unshift(prevLastDate - i);
    }
  };

  for(let i = 0; i < 7 - thisListDay; i++) {
    nextDates.push(i);
  }

  const dates = prevDates.concat(thisDates, nextDates);
  const firstDate = dates.indexOf(1);
  const lastDate = dates.lastIndexOf(thisListDate);

  dates.forEach((date, i) => {
    const condition = i >= firstDate && i < lastDate + 1 ? "this" : "other";
    dates[i] = `<button class="date" data-index="${i}"><span class="${condition}">${date}</span></button>`
  })

  // data를 button 마다 넣는 것은 성공
  // 가져다가 사용하는 방법이 어려움...
  //document.querySelector(".date").addEventListener("click", () => {
    //todo-wrap에 클래스 .off를 주고 클릭을 하면 .off 삭제 하면서 해당 data로 연결...?
  //})

  document.querySelector(".dates").innerHTML = dates.join("");

  const today = new Date();
  if(month === today.getMonth() && year === today.getFullYear()) {
    for(let date of document.querySelectorAll(".this")) {
      if(+date.innerText === today.getDate()) {
        date.classList.add("today");
        break;
      }
    }
  }


}



rederCalendar();

const prevMonth = () => {
  date.setDate(1);
  date.setMonth(date.getMonth() - 1);
  rederCalendar();
}

const nextMonth = () => {
  date.setDate(1);
  date.setMonth(date.getMonth() + 1);
  rederCalendar();
}
