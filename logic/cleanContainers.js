function cleanContainer() {

    let contextView = document.getElementById("contentView");
    let nameList = document.getElementById("nameList");
    let campaignList = document.getElementById("campaignList");
    let nextBttn = document.getElementById("nextButton");
    let prevBttn = document.getElementById("prevButton");
    let dinamicDiv = document.getElementById("dinamicDiv");
    let listC = campaignList.querySelectorAll("li");
    let listA = nameList.querySelectorAll("li");

    contextView.innerHTML = "";
    listC.forEach((li) => {
        li.textContent = ' '
        li.style.cursor = 'default';
    });
    listA.forEach((li) => {
        li.textContent = '.'
        li.style.cursor = 'default';
    });
    dinamicDiv.style.display = 'none';
    nextBttn.style.visibility = 'hidden';
    prevBttn.style.visibility = 'hidden';
};

export { cleanContainer };