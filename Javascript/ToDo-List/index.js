let toDoFormDOM = document.querySelector("#toDoListForm")
let olList = document.querySelector("#listToDo")
let alert = document.querySelector("#alert")
let works = []

toDoFormDOM.addEventListener("submit", submitHandler)

let alertFunction = (title, message, className = "warning") => {
    return `
        <div class="alert alert-${className} alert-dismissible fade show" role="alert">
            <strong> ${title}!  </strong>${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `
}

function submitHandler(event) {
    event.preventDefault();
    let workName = document.querySelector("#inputWorkName");
    let workDetail = document.querySelector("#inputWorkDetail")
    let workNumber = document.querySelector("#inputWorkNumber");

    if (workName.value && workName && workDetail) {
        addList(workName.value, workDetail.value, workNumber.value)
        //TODO: localStorage eklenecek works[] -> work{ name,detail,number} 
        
        
        //!
        let work = new Work(workName.value, workDetail.value, workNumber.value)
        setLocal(work)
        //!

        workName.value = workNumber.value = workDetail.value = "";
    }
    else {
        alert.innerHTML = alertFunction("Bilgilendirme", "Eksik bilgi girişi yapıldığından görev eklenmedi.")
    }

}


function addList(workName, workDetail, workNumber) {
    let li = document.createElement("li")
    li.innerHTML = `<li
    class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold"> ${workName} </div>
      ${workDetail}
    </div>
    <span class="badge bg-primary rounded-pill">${workNumber}</span>
    </li>`
    olList.append(li)
}

class Work {
    constructor(workName, workDetail, workNumber) {
        this.workName = workName
        this.workDetail = workDetail
        this.workNumber = workNumber
    }
}

function setLocal(work) {
    works = works || [];  //!
    works.push(work)
    localStorage.setItem("workInfo", JSON.stringify(works))
}

//LocalStorage'tan works dizisini ceker ve diziyi return eder. 
function getLocal() {
    works = localStorage.getItem("workInfo")
    works = JSON.parse(works)
    return works
}

// Htmldeki gorev listesine, localStorage' tan aldigi works dizisinin icerigini kaydeder.
function fillTheList(){  
    let works = getLocal()

    try {
        works.forEach(element => {
            let li = document.createElement("li")
            li.innerHTML = `<li
                class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold"> ${element.workName} </div>
                    ${element.workDetail}
        </div>
        <span class="badge bg-primary rounded-pill">${element.workNumber}</span>    
        </li>`
            olList.append(li)
        });
    } catch (error) {
        console.log(`Daha once listeye is eklenmedi. 
        Error: ${error}`)
    }
}


