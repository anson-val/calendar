const currentDate = document.querySelector(".current-date"),
    calDaysList = document.querySelector(".days"),
    calIconBar = document.querySelectorAll(".icons span"),
    eventPreviewer = document.querySelector(".event-previewer"),
    eventPreviewerHeader = eventPreviewer.querySelector("header");

let today = new Date(),    // returns the date of now (when the function is called).
    currentYear = today.getFullYear(),    // currentYear is the year that is being displayed.
    currentMonth = today.getMonth();    // currentMonth is the month that is being displayed.

// .getMonth() returns integer 0-11, so we need an array to convert 0-11 to English.
const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

function absPos(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

const renderCalendar = () => {
    let firstDayofMonth = new Date(currentYear, currentMonth, 1).getDay(),    // returns the corresponding weekday of the first day of currentMonth.
        lastDayofMonth = new Date(currentYear, currentMonth + 1, 0).getDay(),    // returns the corresponding weekday of the last day of currentMonth.
        lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate(),    // returns the last day of currentMonth. (We can actually use the argument date = 0 to find the last day of the previous month.).
        lastDateofPrevMonth = new Date(currentYear, currentMonth, 0).getDate()    // returns the last day of currentMonth - 1 (previous month).
    let liTag = "";

    // Add the dates of previous months to liTag
    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive prev-date">${lastDateofPrevMonth - i + 1}</li>`;
    }

    // highlights the current day
    for (let i = 1; i <= lastDateofMonth; i++) {
        if (i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()){
            liTag += `<li class="active">${i}</li>`
        } else {
        liTag += `<li>${i}</li>`;
        }
    }

    // Add the dates of previous months to liTag
    for (let i = 1; i <= 6 - lastDayofMonth; i++) {
        liTag += `<li class="inactive next-date">${i}</li>`
    }

    // injects all the tags back to the HTML file.
    currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
    calDaysList.innerHTML = liTag;
}

renderCalendar();

calIconBar.forEach(icon => {
    icon.addEventListener("click", () => {

        switch (icon.id) {
            case "prev":
                currentMonth -= 1;
                break;
            case "next":
                currentMonth += 1;
                break;
            case "today":
                currentYear = today.getFullYear()
                currentMonth = today.getMonth();
                renderCalendar();
                break;
        }

        if (currentMonth > 11 || currentMonth < 0) {
            let date = new Date(currentYear, currentMonth);   // Passing month = 13 into the Date() function returns January of the next year.
            currentYear = date.getFullYear();
            currentMonth = date.getMonth();
        }

        renderCalendar();
    });
});

calDaysList.addEventListener("click", (e) => {
    if (e.target && e.target.matches("li")) {
        const offsetYAdjustment = 40;
        console.log(e);
        eventPreviewerHeader.querySelector("h2").innerText = e.target.innerText;
        if (e.target.className.includes("prev-date")){
            eventPreviewerHeader.querySelector("p").innerText = months[currentMonth - 1].substring(0, 3);
        } else if (e.target.className.includes("next-date")){
            eventPreviewerHeader.querySelector("p").innerText = months[currentMonth + 1].substring(0, 3);
        } else {
            eventPreviewerHeader.querySelector("p").innerText = months[currentMonth].substring(0, 3);
        }
        eventPreviewer.style.left = `${absPos(e.target).left}px`;
        eventPreviewer.style.top = `${absPos(e.target).top + offsetYAdjustment}px`;
        eventPreviewer.style.display = "flex";
        eventPreviewer.style.animationName = "fadeIn";
        eventPreviewer.style.animationDuration = "0.3s";
    }
})

window.addEventListener("click", (e) => {
    if (!(e.target.matches("li") || eventPreviewer.contains(e.target)) && eventPreviewer.style.display === "flex"){
        eventPreviewer.style.display = "none";
    }
})