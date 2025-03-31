/*
유저가 값을 입력한다
+ 버튼을 클릭하면 할 일 추가
delete 버튼을 클릭하면 할일 삭제
check 버튼을 클릭하면 할일이 끝나면서 밑줄이 간다
    1. check 버튼을 클릭하는 순간 isComplete값을 false에서 true로 바꿈
    2. true이면 done, 밑줄 추가
    3. false이면 working으로 간주
working, done 탭을 누르면 언더바가 이동한다
done탭은 끝난 아이템만 working탭은 진행중인 아이템만
All탭을 누르면 다시 전체 아이템으로 돌아온다
*/

/*
개인적으로 추가한 부분
    1. 인풋창 포커스되면 있던 내용을 지움. (<- 불편할 수 있으나 중복 등록을 방지.) <- 5단계에서 미션으로 나옴.
    2. 인풋창이 비워진 상태로 addButton을 클릭하면 placeholder의 문구를 수정하여
        사용자가 할 일을 입력하도록 유인. <- 5단계에서 미션으로 나옴.
*/

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".tabs div");
let taskList  = [];
let filterList  = [];
let mode = "tab-all";

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function(event){
    if(event.keyCode === 13){
        addTask(event);
    }
});
taskInput.addEventListener("click", function(){
    taskInput.value = "";
});

for(let i = 0; i < tabs.length; i++){
    tabs[i].addEventListener("click", function(event){
        filter(event);
    })
}

function addTask(){
    
    let task = {
        id: randomIdGenerator(),
        taskContent: taskInput.value,
        isComplete: false
    };

    if(task.taskContent == ""){
        taskInput.placeholder = ("free today?");
        return;
    }

    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].taskContent == task.taskContent){
            taskInput.value = "";
            taskInput.placeholder = ("Duplicate tasks in the list.");
            return;
        }
    }

    taskList.push(task);

    console.log(taskList);

    render();

}

function render(){

    let list = [];

    let result = "";

    if(mode === 'tab-all'){
        list = taskList;
    }else{
        list = filterList;
    }

    for(let i = 0; i < list.length; i++){
        if(list[i].isComplete === true){
            result += `
                <div class = "list" id = "${list[i].id}">
                    <div class = "done-list">
                        ${list[i].taskContent}
                    </div>
                    <div class = "buttons">
                        <button onclick = "CompleteTask('${list[i].id}')" id = "check-button" class = "check-button2">
                            ✔︎
                        </button>
                        <button onclick = "deleteTask('${list[i].id}')" id = "delete-button" class = "delete-button">
                            ❌
                        </button>
                    </div>
                </div>`
        }else{
            result += `
                <div class = "list" "${list[i].id}">
                    <div class = "working-list">
                        ${list[i].taskContent}
                    </div>
                    <div class = "buttons">
                        <button onclick = "CompleteTask('${list[i].id}')" id = "check-button" class = "check-button">
                            ✔︎
                        </button>
                        <button onclick = "deleteTask('${list[i].id}')" id = "delete-button" class = "delete-button">
                            ❌
                        </button>
                    </div>
                </div>`
        }
    }

    document.getElementById("task-board").innerHTML = result;

}

function CompleteTask(id){

    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id === id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
}

function deleteTask(id){

    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id === id){
            taskList.splice(i, 1);
            break;
        }
    }

    filter();
}

function filter(event){

    console.log(mode);

    if(event){
        mode = event.target.id;
    }

    filterList = [];

    if(mode === "tab-working"){
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }
    }else if(mode === "tab-done"){
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
        }
    }

    render();

}

function randomIdGenerator(){
    return '-' + Math.random().toString(36).substring(2, 9);
}