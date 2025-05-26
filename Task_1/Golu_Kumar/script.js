flag = false;
const togg = document.getElementById("toggle");
        togg.addEventListener("click",()=>{
            if(flag==false){
                document.getElementById("main").style.backgroundColor =  "rgb(43, 43, 43)";
                document.getElementById("main").style.color="yellow";
                flag=true;
                    togg.innerText="Light";
            }
            else{
                document.getElementById("main").style.backgroundColor =  "antiquewhite";
                document.getElementById("main").style.color="black";
                flag=false;
                togg.innerText="Dark";
            }
        })

var getTasks = JSON.parse(localStorage.getItem('Tasks'));
const TaskArray = getTasks || [];
const add = document.getElementById("add");
const list = document.getElementById("list-section");
// const tasks = document.querySelector(".tasks");
const inp = document.getElementById("inp");
add.addEventListener('click',()=>{
    
    const data = inp.value; 
    TaskArray.push(data);
    
    
    localStorage.setItem("Tasks", JSON.stringify(TaskArray));

    const keys = Object.keys(TaskArray);
    
    const n = keys.length;
    
    const another = document.createElement("div");
    another.className = "tasks";


    const p = document.createElement("p");
    const delet = document.createElement("button");
    delet.className = "delete";
    delet.innerText= "Delete";
    p.innerHTML= getTasks[n-1];
    another.appendChild(p);
    another.appendChild(delet);
    list.appendChild(another);
    
    
        inp.value="";
})

getTasks.forEach((element, index) => {
    
    const another = document.createElement("div");
    another.className = "tasks";


    const p = document.createElement("p");
    const delet = document.createElement("button");
    delet.className = "delete";
    delet.innerText= "Delete";
    p.innerHTML= element;
    another.appendChild(p);
    another.appendChild(delet);
    list.appendChild(another);

    
    delet.addEventListener("click", ()=>{
        
        console.log(index)
            // 1. Remove from array
        TaskArray.splice(index, 1);

        // 2. Update localStorage
        localStorage.setItem("Tasks", JSON.stringify(TaskArray));

        // 3. Remove from DOM
        another.remove();
                
        
        another.remove();
    })
});
