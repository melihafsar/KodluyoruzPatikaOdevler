let toDoFormDOM = document.querySelector("#toDoListForm")
let olList = document.querySelector("#listToDo")
let alert = document.querySelector("#alert")
let works
let listID


toDoFormDOM.addEventListener("submit", submitHandler)

class Work {
    constructor(workName, workDetail, workNumber) {
        this.workName = workName
        this.workDetail = workDetail
        this.workNumber = workNumber
    }
}

let alertFunction = (title, message, className = "warning") => {
    return `
        <div class="alert alert-${className} alert-dismissible fade show" role="alert">
            <strong> ${title}!  </strong>${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `
}
//
function submitHandler(event) {
    event.preventDefault();
    let workName = document.querySelector("#inputWorkName");
    let workDetail = document.querySelector("#inputWorkDetail")
    let workNumber = document.querySelector("#inputWorkNumber");

    if (workName.value && workName && workDetail) {
        //addList(workName.value, workDetail.value, workNumber.value)

        //localStorage add.
        let work = new Work(workName.value, workDetail.value, workNumber.value)
        setLocal(work)
        //localStorage add.
        reloadPage()

        //workName.value = workNumber.value = workDetail.value = "";
    }
    else {
        alert.innerHTML = alertFunction("Bilgilendirme", "Eksik bilgi girişi yapıldığından görev eklenmedi.")
    }

}

/*
function addList(workName, workDetail, workNumber) {
    let li = document.createElement("li")
    li.innerHTML = `<li onclick="getID(this.id)" id=li${index}"
    class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold"> ${workName} </div>
      ${workDetail}
    </div>
    <span class="badge bg-primary rounded-pill">${workNumber}</span>
    </li>`
    olList.append(li)
}
*/

//LocalStorage'tan works dizisini ceker ve diziyi return eder. 
function getLocal() {
    works = localStorage.getItem("workInfo")
    works = JSON.parse(works)
    return works
}

function setLocal(work) {
    works = works || [];  //!diziye ilk defa eklenecekse once diziyi tanimlar
    works.push(work)
    localStorage.setItem("workInfo", JSON.stringify(works))
}


// Htmldeki gorev listesine, localStorage' tan aldigi works dizisinin icerigini kaydeder.
function fillTheList() {
    let works = getLocal()
    try {
        works.forEach((element, index) => {
            let li = document.createElement("li")
            li.innerHTML = `<li onclick="getID(this.id)" id="li${index}"
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
    paintBoxes()
}

function getIDLocal() {
    listID = localStorage.getItem("listID")
    listID = JSON.parse(listID)
    return listID
}

function setIDLocal(elementID) {
    listID = listID || []
    listID.push(elementID)
    localStorage.setItem("listID", JSON.stringify(listID))
}

function paintBoxes() {
    let listID = getIDLocal()

    try {
        listID.forEach(id => {
            completedWork(id)
        })
    } catch (error) {
        console.log(`Daha once is tamamlanmadi. 
        Error: ${error}`)
    }
    finally {
        console.log("Boyama islemi adimi gecildi.")
    }
}

// Yapilan islerin bitirilme durumu
let getID = (elementID) => {
    listID = getIDLocal()

    if (listID != null && listID.includes(elementID)) {
        unCompletedWork(elementID)
    } else {
        setIDLocal(elementID)
        completedWork(elementID)
    }
}


function completedWork(elementID) {
    let completeLi = document.querySelector(`#${elementID}`)
    completeLi.classList.add("bg-success", "text-decoration-line-through")
}

function unCompletedWork(elementID) {
    let index = listID.indexOf(elementID)
    if (index > -1) { 
        listID.splice(index, 1); 
    }
    localStorage.setItem("listID", JSON.stringify(listID))
    let completeLi = document.querySelector(`#${elementID}`)
    completeLi.classList.remove("bg-success", "text-decoration-line-through")
}

//sayfadaki degisiklerin guncellenmesi
let reloadPage = () => window.location.reload()

