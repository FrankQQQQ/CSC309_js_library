"use strict";


let my_calendar = new Calendarrr();

let example9_1 = my_calendar.makeMonthCalendarRaw(2021, 11);
document.getElementById("example9_1").appendChild(example9_1)

let example9_2 = my_calendar.makeMonthCalendar(2021, 11);
document.getElementById("example9_2").appendChild(example9_2)
            
let example_10 = my_calendar.makeYearCalendar(2022);
document.getElementById("example_10").appendChild(example_10)

            
let example_12 = my_calendar.functionalCalendar(2020, 5 );
document.getElementById("example_12").appendChild(example_12)


        
let example_13 = my_calendar.showSpecificCalendar( );
document.getElementById("example_13").appendChild(example_13)

let example_14 = my_calendar.makeEditableMonthCalendar(2020, 5);
document.getElementById("example_14").appendChild(example_14)



let example_15 = my_calendar.makeEditableFunctionalCalendar(2020, 5);
document.getElementById("example_15").appendChild(example_15)


