let works;

function workAdd(){
    if(works === undefined){
        works = new Array();
        works.push(randomID());
    }
    else{
        works.push(randomID());
    }
}
let randomID = () =>
{
    let rand;
    let isAvailable = false;
    while(!isAvailable){
        rand = Math.floor(Math.random() * 100)
        if (!works.includes(rand)) {
            isAvailable = true;
        }
    }
    return rand
}