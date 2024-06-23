// letは後から情報を書き換えることができるもの
let taskList =[];

// ローカルストレージからデータを取得し文字から配列に変換
// constは後から情報を書き換えることができないもの
// 頭に何もないものはletを書き換えるもの
const task = localStorage.getItem('todoText');
console.log(taskList, task);

if(task !==null){

taskList = JSON.parse(task);
    // for(何回繰り返したいか){
// taskList.lengthは、その配列の個数分繰り返す、という意味
for (let i = 0; i < taskList.length; i++) {
    // 繰り返ししたい処理を書く
    $('#todoList').append(createTask(taskList[i]));
}};

// 追加ボタンを押した時
$('#addTodoBtn').on('click',function(){

// 入力テキスト情報を取得する  
    const todoText = $('#todoText').val();
    const priority = $('#priority').val();

    if(todoText !=='');
        const newTask = {
            text: todoText,
            priority: priority,
            completed: false
        };
    
    // todoTextに追加されたものをnewTaskに追加する
    taskList.push(newTask);
    // ローカルストレージにデータ保存するコード
    // ローカルストレージには配列は保存できず、文字列しか保存できないので、JSON.stringifyで保存できるようにする
    localStorage.setItem('todoText', JSON.stringify(taskList));

    // 今ある文字データを書き換えせずに新しいデータを追加する
    $('#todoList').append(createTask(newTask));
    // 追加ボタンを押した際に入力欄の内容が空っぽにする
    $('#todoText').val('');
})

// 削除ボタンを押した時
$('#deleteTodoBtn').on('click',function(){{
    // ローカルストレージから全消しするコード
    localStorage.clear();
    // 画面上のタスク情報を全削除
    $('#todoList').empty('');

    taskList = [];
}})

function createTask(task) {
    const taskElement = $('<li>')
        .text(task.text)
        .addClass(getPriority(task.priority))
        .toggleClass('completed', task.completed);

    const completeBtn = $('<button>')
        .text('完了')
        .on('click', function () {
        task.completed = !task.completed;
        taskElement.toggleClass('completed', task.completed);
        localStorage.setItem('todoText', JSON.stringify(taskList));
    });

    taskElement.append(completeBtn);
    return taskElement;
}

function getPriority(priority) {
    switch (priority) {
        case '高':
            return 'priority-high';
        case '中':
            return 'priority-medium';
        case '低':
            return 'priority-low';
        default:
            return '';
    }
}