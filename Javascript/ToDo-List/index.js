//TODO: Guncel sorun tamamlanmis isler kaldırılınca localstorage tan silinmiyor
//TODO: Tamamlanmış olan işin tekrardan tamamlanacak isler arasina almak icin bu kisma metot yazilmali
let toDoFormDOM = document.querySelector("#toDoListForm");
let olList = document.querySelector("#listToDo");
let completedList = document.querySelector("#completedToDo");
let alert = document.querySelector("#alert");
let changedWork;
//Eklenen islerin ve boyanan islerin bilgisini tutan diziler
let works;
let listID;
let arrayID;
let completedWorks; //tamamlanmis islerin listesi

//calisarak sayfa yuklendigi gibi localStorage taki isleri sayfaya doldurur.
fillTheWorks();

//eklenen isler sayfaya doldurulduktan sonra class tanimlamalarinda "button" isminde olanlari dinler. Tiklanirsa id degerini dondurur.
Array.prototype.forEach.call(
    document.querySelectorAll(".button"),
    function (el) {
        el.addEventListener("click", function () {
            let work_ID = changeButtonToWorkId(this.id)
            removeWork(work_ID);
        });
    }
);

//eklenen isler sayfaya doldurulduktan sonra class tanimlamalarinda "liElement" isminde olanlari dinler. Tiklanirsa id degerini dondurur.
Array.prototype.forEach.call(
    document.querySelectorAll(".liElement"),
    function (el) {
        el.addEventListener("click", function () {
            let liID = this.id;
            console.log("ilk ID: ",this.id)
            let divID = changeLiToWorkID(liID)
            console.log("divID: ",this.id)
            let element = document.querySelector(`#div-${divID}`)
            element.classList.add("loader")
            setTimeout(() => {
                console.log("yukleniyor")
                element.classList.remove("loader")
                getID(liID);
            }, 400);

            //Todo: completedWORK

        });
    }
);

//Is bilgi class
class Work {
    workID;
    constructor(workName, workDetail, workNumber) {
        this.workName = workName;
        this.workDetail = workDetail;
        this.workNumber = workNumber;
        this.workID = 0;
    }
}

//form doldurulmasinda herhangi bir hata cikmasi durumunda bu hatanin kullaniciya geri bildirim olarak dönmesini saglar.
let alertFunction = (title, message, className = "warning") => {
    return `
    <div class="alert alert-${className} alert-dismissible fade show" role="alert">
    <strong> ${title}!  </strong>${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
};

//form submit butonuna tiklandiginda calisir ve is eklenir.
toDoFormDOM.addEventListener("submit", submitHandler);

// Bilgisi gelen isler eklenmis olur.
function submitHandler(event) {
    event.preventDefault();
    let workName = document.querySelector("#inputWorkName");
    let workDetail = document.querySelector("#inputWorkDetail");
    let workNumber = document.querySelector("#inputWorkNumber");

    if (workName.value && workName && workDetail) {
        //is olusturulur.
        let work = new Work(workName.value, workDetail.value, workNumber.value);
        //localStorage'a is eklenir.
        setLocal(work);
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
//LocalStorage'tan completedWorks dizisini ceker ve diziyi return eder.
function getCompletedWorksLocal() {
    completedWorks = localStorage.getItem("completedWorkInfo");
    completedWorks = JSON.parse(completedWorks);
    return completedWorks;
}

//is nesnesini parametre olarak alir ve localStorage a ekler.
function setLocal(work) {
    works = works || []; //? diziye ilk defa eklenecekse once diziyi tanimlar
    work.workID = randomID()

    // let worksLength = works.length;
    // if (worksLength != 0) {
    //     work.workID = works[worksLength - 1].workID + 1;
    // }



    works.push(work);
    localStorage.setItem("workInfo", JSON.stringify(works));
}

//Tamamlanmis is nesnesini parametre olarak alir ve localStorage a ekler.
function setCompletedWorksLocal(work) {
    if (completedWorks === null) {
        completedWorks = new Array();
        completedWorks.push(work);
    }
    else {
        completedWorks.push(work);
    }

    //let worksLength = works.length;
    //if (worksLength != 0) {
    //    work.workID = works[worksLength - 1].workID + 1;
    //}
    //? YORUM SATIRINA ALINMA SEBEBI: is sifirdan eklenmiyor id degismesine gerek yok
    localStorage.setItem("completedWorkInfo", JSON.stringify(completedWorks));
}

function fillTheWorks() {
    let works = getLocal();
    fillTheList(olList, works, "works dolduruldu")
    let completedWorks = getCompletedWorksLocal();
    fillTheList(completedList, completedWorks, "completedWorksDolduruldu")
}

// Htmldeki gorev listesine, localStorage' tan aldigi works dizisinin icerigini dinamik olarak kaydeder.
function fillTheList(listType, works, message) {
    console.log(message)
    try {
        works.forEach((element) => {
            let li = document.createElement("li");
            li.innerHTML = ` 
            <div class="container">
                  <div class="row">
                    <div class="col-10">
                      <li id="li${element.workID}" class="liElement list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                          <div class="fw-bold">${element.workName}</div>
                          ${element.workDetail}
                        </div>
                        <div class="mt-1">
                          <span class="badge bg-primary rounded-pill">${element.workNumber}</span>
                        </div>
                      </li>
                    </div>
                    <div class="col-2 m-auto">
                        <div class="row">
                            <div class="col-sm">
                                <button id="button-${element.workID}" type="button" class="button btn btn-danger">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x"
                                      viewBox="0 0 16 16">
                                      <path
                                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z">
                                      </path>
                                    </svg>
                                  </button>
                            </div>
                            <div class="col-sm">
                                <div id="div-${element.workID}"></div>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>        
`;
            listType.append(li);
        });
    } catch (error) {
        console.log(`Daha once listeye is eklenmedi. 
        Error: ${error}`);
    }
    paintBoxes()
}

let changeLiToWorkID = (liID) => {
    let index = liID.slice(2)
    return index
}

let changeButtonToWorkId = (buttonID) => {
    let array = buttonID.split("-");
    console.log("changeButtonToWorkId: ", array[1])
    return array[1];
}

//tiklanan butonun ID degerini paremetre olarak alir ve gorevi kaldirir.
function removeWork(workID) {
    //yeri degisecek isin gecici olarak id si listeye changeWork te ekleniyor.
    //sebebi ise is tamamen kaldirilmayacak sadece yeri degisecek
    //removeWork() ortak bir function oldugundan orada is id'leri siliniyor.
    //?
    arrayID = JSON.parse(localStorage.getItem("arrayID"))
    let result = arrayID.indexOf(parseInt(workID))
    arrayID.splice(result,1)
    localStorage.setItem("arrayID",JSON.stringify(arrayID))
    //?

    let liID = `li${workID}`;
    let element = document.querySelector(`#${liID}`);
    let works = getLocal();
    let workIndex;
    works.forEach((element, index) => {
        if (element.workID == workID) {
            workIndex = index;
            changedWork = element
        }
    });

    if (workIndex > -1) {
        works.splice(workIndex, 1);
    }
    //set local
    localStorage.setItem("workInfo", JSON.stringify(works));

    listID = getIDLocal();

    try {
        let liIndex = listID.indexOf(liID);

        if (liIndex > -1) {
            listID.splice(liIndex, 1);
        }
        //set local
        localStorage.setItem("listID", JSON.stringify(listID));
    } catch (error) {
        console.log("ERROR: boyama listesi daha önce olusturulmadi hatası");
    }

    let buttonElement = document.querySelector(`#button-${workID}`);
    buttonElement.parentElement.removeChild(buttonElement);
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

// Yapilan islerin bitirilme durumu
let getID = (elementID) => {
    listID = getIDLocal();

    if (listID != null && listID.includes(elementID)) {
        unCompletedWork(elementID);
        //TODO: ilk işlemi buradan yapmaya başlayacaksın.
        //TODO: Tamamlanmış olan işin tekrardan tamamlanacak isler arasina almak icin bu kisma metot yazilmali
    } else {
        changeWork(elementID)
    }
};

// tamamlanmis isler icin renk ve text decoration class larinin eklenmesi
function completedWork() {
    console.log("comletedWorkteyim")
    listID = getIDLocal()
    listID.forEach(element => {
        let completeLi = document.querySelector(`#${element}`);
        try {
            completeLi.classList.add("bg-success", "text-decoration-line-through");
            console.log("classlar eklendi")
        } catch (error) {
            console.log("completedWork Error : ", error);
        }
    })
}

function changeWork(elementID) {
    work_ID = changeLiToWorkID(elementID)
    //yeri degisecek isin gecici olarak id si listeye ekleniyor.
    //sebebi ise is tamamen kaldirilmayacak sadece yeri degisecek
    //removeWork() ortak bir function oldugundan orada is id'leri siliniyor.
    //?
    arrayID = JSON.parse(localStorage.getItem("arrayID"))
    arrayID.push(parseInt(work_ID))
    localStorage.setItem("arrayID",JSON.stringify(arrayID))
    //?
    removeWork(work_ID)
    if (changedWork != (null || undefined)) {
        console.log(changedWork)
    }
    setCompletedWorksLocal(changedWork)
    setIDLocal(elementID);
    console.log("setlendi")
    reloadPage()
}

// tamamlanmamis isler icin renk ve text decoration class larinin kaldirilmasi
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

let randomID = () => {
    if (arrayID === undefined) {
        arrayID = new Array()
        try {
            arrayID = JSON.parse(localStorage.getItem("arrayID"))    
        } catch (error) {
            console.log("ERROR: arrayID ilk defa olusturuldu.",error)
        }
    }
    else {
        arrayID = JSON.parse(localStorage.getItem("arrayID"))
    }
    let rand;
    let isAvailable = false;
    while (!isAvailable) {
        rand = Math.floor(Math.random() * 100)
        if (arrayID != null) {
            if (!arrayID.includes(rand)) {
                isAvailable = true;
            }    
        } else {
            arrayID = [0]
            localStorage.setItem("arrayID", JSON.stringify(arrayID));
            return 0
        }
        arrayID.push(rand)
    }
    localStorage.setItem("arrayID", JSON.stringify(arrayID));
    return rand
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