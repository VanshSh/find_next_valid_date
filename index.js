const btn = document.querySelector('button')
const datePicker = document.getElementById('date-picker')
btn.addEventListener('click', () => {
    const selectedDate = datePicker.value
    const newValidDateDiv = document.querySelector('span')
    if (selectedDate) {
        const newValidDate = nextValidDate(selectedDate)
        newValidDateDiv.innerHTML = newValidDate
    }
})

// To confirm the validity of the date
function nextValidDate(date) {
    let dateIsValid = false
    let nextDate = date
    while (dateIsValid === false) {
        if (checkIfSunday(nextDate)) {
            nextDate = increaseDate(nextDate)
        } else if (invalidDateArr(nextDate)) {
            nextDate = increaseDate(nextDate)
        } else if (inLastFewDays(nextDate)) {
            nextDate = increaseDate(nextDate)
        } else {
            dateIsValid = true
            return nextDate
        }
    }
}

// To check if the date is on sunday
function checkIfSunday(date) {
    let newDate = new Date(date)
    let day = newDate.getDay()
    return day === 0
}

// To check if the date is in invalid dates array
function invalidDateArr(givenDate) {
    let customsierInvalidDate = [
        '2023-04-05',
        '2023-04-06',
        '2023-04-07',
        '2023-04-28',
        '2023-01-09',
        '2023-06-10',
        '2023-10-02',
        '2023-06-15',
    ]

    return customsierInvalidDate.includes(givenDate)
}

// To check if the date is in last few days of month
function inLastFewDays(date) {
    let newDate = new Date(date)
    let lastFewDays = 5
    let currentYear = newDate.getFullYear()
    let currentMonth = String(newDate.getMonth() + 1).padStart(2, '0')
    let lastDateofCurrentMonth = new Date(
        currentYear,
        currentMonth,
        0
    ).getDate()
    const firstInvalidDate = new Date(
        `${currentYear}-${currentMonth}-${lastDateofCurrentMonth - lastFewDays}`
    )
    const lastInvalidDate = new Date(
        `${currentYear}-${currentMonth}-${lastDateofCurrentMonth}`
    )
    return newDate > firstInvalidDate && newDate <= lastInvalidDate
}

// To increase the date +1 to the next day
function increaseDate(date) {
    let updatedDate = date
    let fullDate = new Date(updatedDate)
    let currentYear = fullDate.getFullYear()
    let currentMonth = String(fullDate.getMonth() + 1).padStart(2, '0')
    currentMonth = Number(currentMonth)
    let currentDate = String(fullDate.getDate()).padStart(2, '0')
    currentDate = Number(currentDate)
    let lastDateofCurrentMonth = new Date(
        currentYear,
        currentMonth,
        0
    ).getDate()

    if (currentMonth === 12 && currentDate === lastDateofCurrentMonth) {
        updatedDate = `${currentYear + 1}-01-01`
    } else if (currentMonth === 2 && lastDateofCurrentMonth) {
        updatedDate = `${currentYear}-03-01`
    } else if (currentDate === lastDateofCurrentMonth) {
        if (currentMonth + 1 < 10) {
            updatedDate = `${currentYear}-0${currentMonth + 1}-01`
        } else {
            updatedDate = `${currentYear}-${currentMonth + 1}-01`
        }
    } else {
        if (currentDate + 1 <= 9 && currentMonth <= 9) {
            updatedDate = `${currentYear}-0${currentMonth}-0${currentDate + 1}`
        } else {
            if (currentDate + 1 >= 10 && currentMonth <= 9) {
                updatedDate = `${currentYear}-0${currentMonth}-${
                    currentDate + 1
                }`
            } else {
                if (currentDate + 1 <= 9 && currentMonth > 9) {
                    updatedDate = `${currentYear}-${currentMonth}-0${
                        currentDate + 1
                    }`
                } else {
                    updatedDate = `${currentYear}-${currentMonth}-${
                        currentDate + 1
                    }`
                }
            }
        }
    }

    return updatedDate
}

// console.log("Final Valid Date", nextValidDate(givenDate));
