"use strict";
window.onload=function(){
    let Inputtask= document.getElementById("inputtask")
    let Addbutton=document.getElementById("addbutton")
    let Sortbutton=document.getElementById("sortbutton")
    let Clearbutton=document.getElementById("clearbutton")
    let unordered_list=document.getElementById("unordli")

    let tasks=[]
    if(localStorage.list){
        tasks=JSON.parse(localStorage.list)
        refreshList()
    }

    function refreshList(){
        localStorage.list=JSON.stringify(tasks)
        unordered_list.innerHTML=""
        for (let i in tasks){
            let task=tasks[i]

            let newtask_li=document.createElement("li")
            let newtask_div=document.createElement("div")
            let newtask_span=document.createElement("span")
            let newtask_b1=document.createElement("button")
            let newtask_b2=document.createElement("button")
            let libtnup=document.createElement("button")
            let libtndown=document.createElement("button")

            newtask_li.className="list-group-item"
            newtask_div.className="row"
            newtask_span.className=task.done?"col disabled":"col"
            newtask_b1.className=task.done?"mx-2 btn btn-warning col-2":"mx-2 btn btn-info col-2"
            newtask_b2.className="mx-2 btn btn-danger col-2"
            libtnup.className="mx-2 btn btn-primary col-1"
            libtndown.className="mx-2 btn btn-primary col-1"


            newtask_span.innerText=task.name
            newtask_b1.innerText=task.done?"❌":"✔️"
            newtask_b2.innerText="Delete"
            libtnup.innerText="⬆️"
            
            libtndown.innerText="⬇️"

            newtask_b1.onclick=function(){
                task.done= !task.done
                refreshList()
            }
            newtask_b2.onclick=function(){
                tasks.splice(i,1)
                refreshList()
            }
            // libtnup.onclick=function(){
            //     if(i!=0){
            //         let temp=tasks[i-1]
            //         tasks[i-1]=tasks[i]
            //         tasks[i]=temp
            //         refreshList()
            //     }
            // }
            // libtndown.onclick=function(){
            //     if(i!=tasks.length-1){
            //         let temp=tasks[i+1]
            //         tasks[i+1]=tasks[i]
            //         tasks[i]=temp
            //         refreshList()
            //     }
            // }
            
            newtask_div.appendChild(newtask_span)
            newtask_div.appendChild(libtnup)
            newtask_div.appendChild(libtndown)
            newtask_div.appendChild(newtask_b1)
            newtask_div.appendChild(newtask_b2)
    
            newtask_li.appendChild(newtask_div)
            unordered_list.appendChild(newtask_li)
        }
    }
    
    Inputtask.addEventListener("keyup",function(e){
        if(e.keyCode==13){
            addTask()
        }
    })
    Addbutton.onclick=function(){
        addTask()
    }
    Sortbutton.onclick=function(){
        sortList()
    }
    Clearbutton.onclick=function(){
        clearList()
    }

    function addTask(){
        if(Inputtask.value==""){
            window.alert("Please Enter a Task")
            return 0;
        }

        let newtask=Inputtask.value
        tasks.push({
            name: newtask,
            done: false
        })
        Inputtask.value=""
        refreshList()
    }

    //try working with this function again
    function sortList(){
        tasks.sort(function (a, b) {
            return a.done - b.done
          })
          refreshList()
    }

    function clearList(){
        tasks=tasks.filter(function(t){
            return !t.done
        })
        refreshList()
    }
}