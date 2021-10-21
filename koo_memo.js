//스케줄 메모장의 전체적인 구성, 디자인을 설계
//html과 css를 구성에 맞게 코딩
//js를 이용하여 DataBase.mon으로부터 얻은 정보를 프린트
//버튼을 주어서 리스트 삭제 가능하게 만들기(Delete이용)
//시간, 텍스트 input과 버튼을 만들기
//버튼 클릭시 해당 value들을 DataBase.mon에 추가 후 재프린트하기
//변수 day를 선언, 오늘의 요일을 넣어두고 계속해서 활용
//요일 버튼을 누르면 해당 요일을 day에 참조하고 프린트 하기
//mon을 제외하고 다른 요일에도 스케줄 추가 되도록 만들기
//(mon으로 써둔 코딩을 모두 [day]로 바꾸어 완성)

//----------------------------- Data Base -----------------------------
const data_days={
    sun:{

    },
    mon:{
        430:"기상",
        480:"출근",
        1080:"퇴근"
    },
    tue:{
        
    },
    wed:{
        
    },
    thur:{
        
    },
    fri:{
        
    },
    sat:{
        
    }
}


const d_09=
  {
    //size는 한달 이벤트 중에 연속성이 있는 것을 표현합니다.
    1:{
      430: {to:500,event:"기상 커피마기",end:{y:0,m:0,d:0},size:30},
      //end:{y:0,m:0,d:0} 연속 이벤트입니다.

    },
    12:{
      530: {to:630,event:"에이콘아카데미",end:{y:2021,m:10,d:25},size:19},
      //한달간 일정이기 때문에 사이즈가 한달을 넘지 않습니다.
      1000: {to:1060,event:"에이콘회의",end:{y:2021,m:9,d:12},size:1},
      1180: {to:1270,event:"에이콘아카데미",end:{y:2021,m:10,d:25},size:19},

    },
    13:{
      900: {to:1060,event:"에이콘발표",end:{y:2021,m:9,d:12},size:1},
    }
}








//------------ 변수 day 생성, 우선 그날의 요일을 받고 쭉~ 계속 활용 ---------

console.log(new Date().getDay());
let day=""; //변수 day 위치 확인

switch (new Date().getDay()) {
    case 0:
      day = "sun";
      break;
    case 1:
      day = "mon";
      break;
    case 2:
       day = "tue";
      break;
    case 3:
      day = "wed";
      break;
    case 4:
      day = "thur";
      break;
    case 5:
      day = "fri";
      break;
    case 6:
      day = "sat";
  }
  
  //---------------------스케줄 리스트 프린함수 ---------------------

  printSchedule();
  function printSchedule(){
      let schedule_li= document.querySelector("ul.schedule_li");
      console.log(schedule_li);

    document.querySelector("div.schedule_li h2").innerText=day;

    li_html="";
    console.log(data_days[day]); //data_days.mon으로 받던것을 업그레이드
    //★★★ data_days.day로 받을 수 있을 것 같았는데... 안되는 점 확인!!!
    console.log(parseInt(420/60)); //parseInt: 정수 뽑아내기
    for(key in data_days[day]){
        li_html+=`<li>`
        li_html+=`<b class='time'>`
        li_html+=(parseInt(key/60)+"").padStart(2,0); //문자열만들기: +""
        //padStart(2,0) : 문자열의 2칸까지는 빈곳이 있다면 0으로 채우기
        li_html+=":"+((key%60)+"").padStart(2,0);
        li_html+=`</b>`
        li_html+=`<span>`
        li_html+=data_days[day][key];
        li_html+=`</span>`
        li_html+=`<button class="delete" 
                  onclick="deleteSchedule(event)"
                  value="${key}"">`
        li_html+=`x</button>`
        li_html+=`</li>`
    }
    schedule_li.innerHTML=li_html;
}

//----------------------- 리스트 삭제 함수 -----------------------

function deleteSchedule(e){
    console.log(e.target);
    let li_val=e.target.value;
    delete data_days[day][li_val]; //delete로 Json의 값을 삭제 할 수 있다.
    console.log(data_days);
    printSchedule();
}

//----------------------- 리스트 추가 함수 -----------------------

function addSchedule(){
    console.log(document.querySelector(".add_time").value);
    let arrAddTime= document.querySelector(".add_time").value.split(":");
    console.log(arrAddTime);
    console.log(Number(arrAddTime[0]*60)+Number(arrAddTime[1]));
    let addTime=Number(arrAddTime[0]*60)+Number(arrAddTime[1]);
    
    let addText=document.querySelector(".add_text").value;
    day= document.querySelector("div.schedule_li h2").innerText;
    data_days[day][addTime]=addText;
    console.log(data_days);
    printSchedule();
}

//------------------ 요일 리스트에 이벤트함수 주기 -------------------

console.log(document.querySelectorAll("div.days div"));
let days= document.querySelectorAll("div.days div");

for(v of days){ //addEventListener는 배열에 줄 수 X ---> for구문활용
v.addEventListener("click", function(event){
    console.log(event.target.title);
    day=event.target.title;
    printSchedule();
})}
