const data = [];

const todoText = document.querySelector(".todoText");
const list = document.querySelector(".list");
const btn_add = document.querySelector(".btn_add");
const todoNotDoneCount = document.querySelector(".todoNotDoneCount");
const doneClear = document.querySelector(".doneClear");
const tab = document.querySelector(".tab");


// 新增代辦事項到data裡
btn_add.addEventListener("click",todoAdd);
function todoAdd(){
    let obj = {};
    obj.todoText = todoText.value;
    obj.checked = false;
    obj.id = new Date().getTime();
    data.push(obj); 
    renderData()
}

// 用enter新增代辦事項
todoText.addEventListener("keyup",function(e){
    if(e.key == "Enter"){
        todoAdd();
    }
});

// 刪除代辦事項
list.addEventListener("click",(e) => {
    let id = parseInt(e.target.dataset.id);
    if(e.target.classList.contains("delete")){
        e.preventDefault();
        data.splice(id,1);
    }else{
        data[id].checked = !data[id].checked;  /*點擊input時將data裡的checked的狀態變為相反之狀態*/
    }
    renderData();
})

//一鍵清除完成之項目
doneClear.addEventListener("click",todoClear);
function todoClear(){
    data.forEach((item,index) => {
        if(item.checked == true){
            data.splice(index,1);
        }
    })
    renderData();
}

// 切換全部、待完成、已完成等狀態
tab.addEventListener("click",todoChange);
let targetState = "all";
function todoChange(e){
    let catchTabLi = document.querySelectorAll(".tab li"); //選取全部tab裡的li
    catchTabLi.forEach((item) => {
        item.setAttribute("class","");  //將全部的li的class變為""
    })
    e.target.setAttribute("class","active"); //再將選到的li的class加上active
    targetState = e.target.dataset.state; //紀錄點擊之後點到哪個data-state
    renderData();
}




//渲染並顯示多少個代辦事項
function renderData(){
    let str = "";
    data.forEach((item,index) => {
        if(targetState == "all"){
            if(item.checked == false){
                str += `<li><label class="checkbox" for=""><input type="checkbox" ${item.checked} data-id=${index}/><span>${item.todoText}</span></label><a href="#" class="delete"></a></li>`;
            }else if(item.checked == true){
                str += `<li><label class="checkbox" for=""><input type="checkbox" ${item.checked} data-id=${index} checked/><span>${item.todoText}</span></label><a href="#" class="delete"></a></li>`;
            }
        }else if(targetState == "notDone"){
            if(item.checked == false){
                str += `<li><label class="checkbox" for=""><input type="checkbox" ${item.checked} data-id=${index}/><span>${item.todoText}</span></label><a href="#" class="delete"></a></li>`;
            }
        }else if(targetState == "hadDone"){
            if(item.checked == true){
                str += `<li><label class="checkbox" for=""><input type="checkbox" ${item.checked} data-id=${index} checked/><span>${item.todoText}</span></label><a href="#" class="delete"></a></li>`;
            }
        }
    }); 
    list.innerHTML = str;
    let todoNotDoneitems = data.filter((item) => {
        return item.checked == false;
    })
    todoNotDoneCount.textContent = todoNotDoneitems.length;
};




