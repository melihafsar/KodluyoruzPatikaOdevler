let toDoFormDOM = document.querySelector("#toDoListForm");
let olList = document.querySelector("#listToDo");
let alert = document.querySelector("#alert");
let works;
let listID;

toDoFormDOM.addEventListener("submit", submitHandler);

class Work {
    constructor(workName, workDetail, workNumber) {
        this.workName = workName;
        this.workDetail = workDetail;
        this.workNumber = workNumber;
    }
}

let alertFunction = (title, message, className = "warning") => {
    return `
        <div class="alert alert-${className} alert-dismissible fade show" role="alert">
            <strong> ${title}!  </strong>${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
};

function submitHandler(event) {
    event.preventDefault();
    let workName = document.querySelector("#inputWorkName");
    let workDetail = document.querySelector("#inputWorkDetail");
    let workNumber = document.querySelector("#inputWorkNumber");

    if (workName.value && workName && workDetail) {
        //localStorage add.
        let work = new Work(workName.value, workDetail.value, workNumber.value);
        setLocal(work);
        //localStorage add.
        reloadPage();
    } else {
        alert.innerHTML = alertFunction(
            "Bilgilendirme",
            "Eksik bilgi girişi yapıldığından görev eklenmedi."
        );
    }
}

//LocalStorage'tan works dizisini ceker ve diziyi return eder.
function getLocal() {
    works = localStorage.getItem("workInfo");
    works = JSON.parse(works);
    return works;
}

function setLocal(work) {
    works = works || []; //!diziye ilk defa eklenecekse once diziyi tanimlar
    works.push(work);
    localStorage.setItem("workInfo", JSON.stringify(works));
}

// Htmldeki gorev listesine, localStorage' tan aldigi works dizisinin icerigini kaydeder.
function fillTheList() {
    let works = getLocal();
    try {
        works.forEach((element, index) => {
            let li = document.createElement("li");
            li.innerHTML = `
            <div class="container">
            <div class="row">
              <div class="col-11">
                <li onclick="getID(this.id)" id="li${index}"
                  class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">${element.workName}</div>
                    ${element.workDetail}
                  </div>
                  <div class="mt-1">
                    <span class="badge bg-primary rounded-pill">${element.workNumber}</span>
                  </div>
                </li>

              </div>
              <div class="col-1 m-auto">
                <button onclick="getButtonID(this.id)" id="button-${index}" type="button" class="btn btn-danger">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x"
                    viewBox="0 0 16 16">
                    <path
                      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z">
                    </path>
                  </svg>
                </button>

              </div>
            </div>
          </div>            
`
            {/**
        
            `
            <li onclick="getID(this.id)" id="li${index}"
                class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold"> ${element.workName} </div>
                    ${element.workDetail}
        </div>
        <div class="mt-1">
              <span class="badge bg-primary rounded-pill">${element.workNumber}</span>    
                <button onclick="getButtonID(this.id)" id="button-${index}" type="button" class="btn btn-danger">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
                  </svg>
                </button>
              </div>
        </li>`;
        */}
            olList.append(li);
        });
    } catch (error) {
        console.log(`Daha once listeye is eklenmedi. 
        Error: ${error}`);
    }
    paintBoxes();
}

let getButtonID = (buttonID) => removeWork(buttonID);

function removeWork(buttonID) {
    
    let array = buttonID.split("-");
    let workIndex = array[1];
    letLiID = `li${workIndex}`;
    let element = document.querySelector(`#${letLiID}`);
    let elementHTML = element.innerHTML;
    let works = getLocal();
    console.log(works);
    let isAvilable = false;
    let index = -1;
    works.forEach((element, itemNo) => {
        if (!isAvilable) {
            isAvilable = elementHTML.includes(element.workName);
            index = itemNo;
        }
    });
    console.log(index);

    if (index > -1) {
        works.splice(index, 1);
    }
    //set local
    localStorage.setItem("workInfo", JSON.stringify(works));
    
    //! ListId deki boyanan degerler de guncellenmeli
    let buttonElement = document.querySelector(`#${buttonID}`);
    buttonElement.parentElement.removeChild(buttonElement)
    element.parentElement.removeChild(element);
}

function getIDLocal() {
    listID = localStorage.getItem("listID");
    listID = JSON.parse(listID);
    return listID;
}

function setIDLocal(elementID) {
    listID = listID || [];
    listID.push(elementID);
    localStorage.setItem("listID", JSON.stringify(listID));
}

function paintBoxes() {
    let listID = getIDLocal();

    try {
        listID.forEach((id) => {
            completedWork(id);
        });
    } catch (error) {
        console.log(`Daha once is tamamlanmadi. 
        Error: ${error}`);
    } finally {
        console.log("Boyama islemi adimi gecildi.");
    }
}

// Yapilan islerin bitirilme durumu
let getID = (elementID) => {
    listID = getIDLocal();

    if (listID != null && listID.includes(elementID)) {
        unCompletedWork(elementID);
    } else {
        setIDLocal(elementID);
        completedWork(elementID);
    }
};

// tamamlanmis isler icin renk ve text decoration class larinin kaldirilmesi
function completedWork(elementID) {
    let completeLi = document.querySelector(`#${elementID}`);
    try {
        completeLi.classList.add("bg-success", "text-decoration-line-through");
    } catch (error) {
        console.log("Error : ", error);
    }
}

// tamamlanmamis isler icin renk ve text decoration class larinin kaldirilmesi
function unCompletedWork(elementID) {
    let index = listID.indexOf(elementID);
    if (index > -1) {
        listID.splice(index, 1);
    }
    localStorage.setItem("listID", JSON.stringify(listID));
    let completeLi = document.querySelector(`#${elementID}`);
    try {
        completeLi.classList.remove("bg-success", "text-decoration-line-through");
    } catch (error) {
        console.log("Error : ", error);
    }
}

//sayfadaki degisiklerin guncellenmesi
let reloadPage = () => window.location.reload();
