let tasks = [
    {
        "title": "انهاء المشروع",
        "date": "26/3/2023",
        "isDone": false,
        "isMarked":false
       
    },
    {
        "title": "انهاء دورة الجافا سكريبت",
        "date": "26/3/2023",
        "isDone": false,
        "isMarked":false
    },
];

function getTasksFromStorage() {
    let retrivedTasks = JSON.parse(localStorage.getItem("tasks"));

    //    if(retrivedTasks==null)
    //    {
    //     tasks=[]
    //    } else
    //    {
    //     tasks=retrivedTasks
    //    }

    tasks = retrivedTasks ?? []

}
getTasksFromStorage()
//localStorage.clear();

function fillTaskOnPage() {
    document.getElementById("tasks").innerHTML = "";
    let index = 0;
    for (task of tasks) {
        let content = `
<div class="task ${task.isDone ? "done" : ""}">
    <div class="task-info">
         ${task.isDone ?
                `<button onclick="toggleTaskcomplete(${index})" class="circle" id="isdone">
            <span class="material-symbols-outlined">
             cancel
            </span>
         </button>
         `
                :
                `<button onclick="toggleTaskcomplete(${index})" class="circle" id="done">
                <span class="material-symbols-outlined">
                 task_alt
                </span>
          </button>`}
         
         <h2>${task.title}</h2>

        <div class="time">
            <span class="material-symbols-outlined">
                calendar_month
            </span>
            <span>${task.date}</span>
        </div>
    </div>
    <div class="task_actions">
        <button onclick="deleteTask(${index})" class="circle" id="delete">
            <span class="material-symbols-outlined">
                 delete
            </span>
        </button>         
        <button onclick="editTask(${index})" class="circle" id="edit">
            <span class="material-symbols-outlined">
                edit
            </span>
        </button>
        ${task.isMarked ? `
        <button onclick="markTask(${index})" class="circle" id="ismark">
            <span class="material-symbols-outlined">
                grade
            </span>
        </button>`
        :
        ` <button onclick="markTask(${index})" class="circle" id="mark">
        <span class="material-symbols-outlined">
            grade
        </span>
    </button>`
        }
    </div>
</div>`
        document.getElementById("tasks").innerHTML += content;
        index++;
    }
}
fillTaskOnPage();
let taskName;
document.getElementById("add").addEventListener("click", function () {
    swal({
        text: '"أدخل مهمتك الجديدة"',
        content: "input",
        button: {
            text: "تأكيد",
            closeModal: true,
        },
    }).then(value => {
        taskName = value;
        let now = new Date();
        let date = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear() + " | " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        let taskObj =
        {
            "title": taskName,
            "date": date,
            "isDone": false
        };
        tasks.push(taskObj)
        storeTasks();
        fillTaskOnPage();

    });
});

document.getElementById("deleteAll").addEventListener("click", function () {
    tasks = [];
    storeTasks()
    fillTaskOnPage()
})

function deleteTask(index) {
    let task = tasks[index]
    swal({
        title: " هل أنت متأكد من حذف مهمة: " + task.title,
        text: "للذتكير بمجرد الحذف, لن تتمكن من استعادة هذه المهمة",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((value) => {
            let isConfermed = value;
            if (isConfermed == true) {
                tasks.splice(index, 1);
                storeTasks()
                fillTaskOnPage();
            }

        });

}
function editTask(index) {
    let task = tasks[index];
    swal("أدخل عنوان المهمة الجديدة",
        {
            content: {
                element: "input",
                attributes: {
                    value: task.title,
                }
            },


            button: {
                text: "تأكيد",
                closeModal: true,
            },
        }).then((value) => {
            let newTaskTitle = value;
            if (newTaskTitle != undefined) {
                task.title = newTaskTitle;
                storeTasks()
                fillTaskOnPage();
            }

        });
}

function markTask(index)
{
    let i=1;
    let y=0;
    let newTasks=[];
    newTasks[0]=tasks[index];
    tasks.splice(index,1);
    for(task of tasks)
    {

        newTasks[i]=tasks[y];
        i++;
        y++;
    }
    tasks=newTasks;
    for(task of tasks)
    {
        task.isMarked=false;
    }
    tasks[0].isMarked=true;
    storeTasks()
    fillTaskOnPage();
    

}

function toggleTaskcomplete(index) {
    let task = tasks[index];
    task.isDone = !task.isDone;
    storeTasks()
    fillTaskOnPage();
}



function storeTasks() {
    let taskString = JSON.stringify(tasks)
    localStorage.setItem("tasks", taskString)
}