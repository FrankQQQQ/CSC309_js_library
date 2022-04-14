"use strict";
// const printf = console.log;
const printf = console.log



function Calendarrr(){

}
Calendarrr.prototype = {
    isLeapYear(year){
        //check whether this year is a leap year
        if(year % 400 == 0 && year %100 == 0){
            return true
        }
        else if(year % 4 == 0 && year %100 != 0){
            return true
        }
        else{
            return false
        }

    },

    getNumberOfDates(year, month){
        if (year <= 100 || year > 3000){
            //printf("Invalid year")
            return 0
        }
        else if(month <= 0 || month > 12){
            //printf("Invalid month")
            return 0
        }
        else if(month != 2){
            if (month in [1, 3, 5, 7, 8, 10, 12]){
                return 31;
            }
            else{
                return 30;
            }
        }
        else{
            //month = 2, check leap year
            if(this.isLeapYear(year)){
                return 29;
            }
            else{
                return 28;
            }
        }
        
    },

    isValidDate(this_date){
        if(this_date.constructor != Array || this_date.length != 3 || !Number.isInteger(this_date[0]) || !Number.isInteger(this_date[1]) || !Number.isInteger(this_date[2])){
            printf("Invalid type")
            return false
        }
        let num_dates = this.getNumberOfDates(this_date[0], this_date[1])
        if(this_date[2] < 0){
            //printf("Invalid day")
            return false
        }
        else if(this_date[2] > num_dates){
            //printf("Invalid day")
            return false
        }
        return true
    },

    checkDay(this_date){
        //Return 0 if Sunday
        if(!this.isValidDate(this_date)){
            return -1
        }
        else{
            let cur_date = (this_date[0].toString().concat('-')).concat(this_date[1].toString()).concat('-').concat(this_date[2].toString()).concat(" 03:24:00")
            let cur_date_1 = new Date(cur_date)
            
            
            return cur_date_1.getDay()
            
        }

    },


    getNextMonth(year, month){


        if(month < 12){
            return [year, month + 1]
        }
        else{
            return [year + 1, 1]
        }

    },

    getLastMonth(year, month){


        if(month == 1){
            return [year-1, 12]
        }
        else{
            return [year, month - 1]
        }

    },

    getToday(){
        let today = new Date()
        return([today.getFullYear(),  today.getMonth() + 1, today.getDate()])
        
    },

    numToEng(month){
        switch(month){
            case 1:
                return "January"
                
            case 2:
                return 'February'
                break;
            case 3:
                return "March"
            case 4:
                return "April"
            case 5:
                return "May"
            case 6:
                return "June"
            case 7:
                return "July"
            case 8:
                return "August"
            case 9:
                return "September"
            case 10:
                return "October"
            case 11:
                return "November"
            case 12:
                return "December"
                    
        }

    },


    checkMonth(year, month){

        let result = []
        let first_date_day = this.checkDay([year, month, 1])
        var flag = 0
        var day = 1
        for(let i = 0; i < 6; i += 1){
            let this_row = []
            
            for(let j = 0; j < 7; j += 1){

            
                if(flag == 0){
                    this_row.push(0)
                }
                if(i == 0 && j == first_date_day){
                    flag = 1
                } 
                if(flag == 1){
                    this_row.push(day)
                    day += 1
                    if(day > this.getNumberOfDates(year, month)){
                        flag = 0;
                    }
                }

            }
            result.push(this_row)
        }
        if(result[5][0] == 0){
            result = result.slice(0, 5)
        }

        return result
        

    },

    checkYear(year){
        let result = []
        for(let i = 1; i < 13; i ++){
            result.push(this.checkMonth(year, i))
        }
        return result;
    },

    makeMonthCalendar(year, month){
        let days = this.getNumberOfDates(year, month)
        if(! this.isValidDate([year, month, days])){
            return null
        }
        else{
            var container = document.createElement("div")
            container.classList.add("calendar_container")
            let first_date_day = this.checkDay([year, month, 1])
            const table = document.createElement('table');

            // header.appendChild(document.createTextNode("this is header"))
            let first_row = document.createElement("tr")
            let header = document.createElement("td")
            header.classList.add("CalendarHeader")
            header.colSpan = "7"
            let last_month_button = document.createElement("div")
            last_month_button.innerHTML = "<<="
            // header.appendChild(last_month_button)


            header.innerHTML = year.toString().concat('-').concat(month.toString())
            header.innerHTML = (this.numToEng(month)).concat('-').concat(year.toString())

            first_row.appendChild(header)
            table.appendChild(first_row)

            let second_row = document.createElement("tr")

            let Mon = document.createElement("td")
            Mon.classList.add("weekdayTitle")
            Mon.innerHTML = "Mon"

            let Tue = document.createElement("td")
            Tue.classList.add("weekdayTitle")
            Tue.innerHTML = "Tue"

            let Wed = document.createElement("td")
            Wed.classList.add("weekdayTitle")
            Wed.innerHTML = "Wed"

            let Thu = document.createElement("td")
            Thu.classList.add("weekdayTitle")
            Thu.innerHTML = "Thu"
         
            let Fri = document.createElement("td")
            Fri.classList.add("weekdayTitle")
            Fri.innerHTML = "Fri"

            let Sat = document.createElement("td")
            Sat.classList.add("weekdayTitle")
            Sat.innerHTML = "Sat"

            let Sun = document.createElement("td")
            Sun.classList.add("weekdayTitle")
            Sun.innerHTML = "Sun"

            second_row.appendChild(Sun) 
            second_row.appendChild(Mon)
            second_row.appendChild(Tue)
            second_row.appendChild(Wed)
            second_row.appendChild(Thu)
            second_row.appendChild(Fri)
            second_row.appendChild(Sat)
            table.appendChild(second_row)
     

            var flag = 0
            var day = 1
            for(let i = 0; i < 6; i += 1){
                const row = table.insertRow()
                for(let j = 0; j < 7; j += 1){
                    if(i == 0 && j == first_date_day){
                        flag = 1
                    }
                    let grid = row.insertCell() 
                    if(flag == 1){
                        grid.classList.add("calendarGrid")
                        grid.appendChild(document.createTextNode(day.toString()))
                        day += 1
                        if(day > this.getNumberOfDates(year, month)){
                            flag = 0
                            //document.body.appendChild(container)
                            container.appendChild(table);
                    
                            return container
                        }
                    }
                }
            }


            
        }
    },

    makeMonthCalendarRaw(year, month){
        let days = this.getNumberOfDates(year, month)
        if(! this.isValidDate([year, month, days])){
            return null
        }
        else{
            var container = document.createElement("div")

            let first_date_day = this.checkDay([year, month, 1])
            const table = document.createElement('table');

            // header.appendChild(document.createTextNode("this is header"))
            let first_row = document.createElement("tr")
            let header = document.createElement("td")

            header.colSpan = "7"
            let last_month_button = document.createElement("div")
            last_month_button.innerHTML = "<<="
            // header.appendChild(last_month_button)


            header.innerHTML = year.toString().concat('-').concat(month.toString())
            header.innerHTML = (this.numToEng(month)).concat('-').concat(year.toString())

            first_row.appendChild(header)
            table.appendChild(first_row)

            let second_row = document.createElement("tr")

            let Mon = document.createElement("td")

            Mon.innerHTML = "Mon"

            let Tue = document.createElement("td")

            Tue.innerHTML = "Tue"

            let Wed = document.createElement("td")

            Wed.innerHTML = "Wed"

            let Thu = document.createElement("td")

            Thu.innerHTML = "Thu"
         
            let Fri = document.createElement("td")
            Fri.innerHTML = "Fri"

            let Sat = document.createElement("td")
            Sat.innerHTML = "Sat"

            let Sun = document.createElement("td")
            Sun.innerHTML = "Sun"

            second_row.appendChild(Sun) 
            second_row.appendChild(Mon)
            second_row.appendChild(Tue)
            second_row.appendChild(Wed)
            second_row.appendChild(Thu)
            second_row.appendChild(Fri)
            second_row.appendChild(Sat)
            table.appendChild(second_row)
     

            var flag = 0
            var day = 1
            for(let i = 0; i < 6; i += 1){
                const row = table.insertRow()
                for(let j = 0; j < 7; j += 1){
                    if(i == 0 && j == first_date_day){
                        flag = 1
                    }
                    let grid = row.insertCell() 
                    if(flag == 1){

                        grid.appendChild(document.createTextNode(day.toString()))
                        day += 1
                        if(day > this.getNumberOfDates(year, month)){
                            flag = 0
                            //document.body.appendChild(container)
                            container.appendChild(table);
                    
                            return container
                        }
                    }
                }
            }


            
        }
    },

    makeYearCalendar(year){
        let result = document.createElement("div")
        for(let i = 1; i < 13; i++){
            result.appendChild(this.makeMonthCalendarRaw(year, i))
        }
        return result

    },
    searchDateDay(date, day, year){
        //return a list of month in this year that at this date, matches the day.
        //e.g. searchDateDay(28, 3, 2019) means search all month in 2019 that 28th is Wednesday.
        let result = []
        for(let month = 1; month < 13; month++){
            if(this.checkDay([year, month, date]) == day){
                result.push(month);
            }
        }
        return result
    },



    
    functionalCalendar(year, month){
        let this_container = document.createElement("div")
        this_container.classList.add("all_container")

        // let button_container = document.createElement

        let left_button = document.createElement("button")
        left_button.classList.add("left_button")
        let right_button = document.createElement("button")
        right_button.classList.add("right_button")
        left_button.innerHTML = "<<"
        right_button.innerHTML = ">>"
        let current_year = year
        let current_month = month
        
        let current_button = document.createElement("button")
        current_button.classList.add("current_time_button")
        current_button.innerHTML = "Now"

        //let current_element = this.makeMonthCalendar(year, month)





        this_container.appendChild(left_button)
        this_container.appendChild(right_button)
        this_container.appendChild(current_button)

        let current_calendar = this.makeMonthCalendar(year, month)

        this_container.appendChild(current_calendar)

        

        
        


        current_button.addEventListener("click", function(e){
            e.preventDefault()
            // e.target.parentNode.removeChild(current_calendar)
            
            e.target.parentNode.removeChild(e.target.parentNode.children[3])

            
            current_year = Calendarrr.prototype.getToday()[0]
            current_month = Calendarrr.prototype.getToday()[1]
            
            e.target.parentNode.appendChild(Calendarrr.prototype.makeMonthCalendar(current_year, current_month))
            
            
        })

        left_button.addEventListener("click", function(e){
            e.preventDefault()

            e.target.parentNode.removeChild(e.target.parentNode.children[3])

            current_year = Calendarrr.prototype.getLastMonth(current_year, current_month)[0]
            current_month = Calendarrr.prototype.getLastMonth(current_year, current_month)[1]
            
            e.target.parentNode.appendChild(Calendarrr.prototype.makeMonthCalendar(current_year, current_month))
            
            
        })



        right_button.addEventListener("click", function(e){
            e.preventDefault()


             e.target.parentNode.removeChild(e.target.parentNode.children[3])

            current_year = Calendarrr.prototype.getNextMonth(current_year, current_month)[0]
            current_month = Calendarrr.prototype.getNextMonth(current_year, current_month)[1]
            e.target.parentNode.appendChild(Calendarrr.prototype.makeMonthCalendar(current_year, current_month))
            
            
        })

        return this_container
    },

    showSpecificCalendar(){
        let this_container = document.createElement("div")
        let input_field = document.createElement("div")
        let specific_year = document.createElement("input")
        specific_year.type = "text"
        specific_year.placeholder = "Type in a year"
        let specific_month = document.createElement("input")
        specific_month.type = "text"
        specific_month.placeholder = "Type in a month"
        let specific_submit = document.createElement("input")
        specific_submit.type = "button"
        specific_submit.value = "show"
        let specific_remove = document.createElement("input")
        specific_remove.type = "button"
        specific_remove.value = "hide"
        input_field.appendChild(specific_year);
        input_field.appendChild(specific_month);
        input_field.appendChild(specific_submit);
        input_field.appendChild(specific_remove)
        this_container.appendChild(input_field);

        specific_remove.addEventListener("click", (e) => {
            e.preventDefault();
            if(e.target.parentNode.parentNode.children[1] !== undefined){
                e.target.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.children[1])
            }
            
        })

        specific_submit.addEventListener("click", (e) =>{
            e.preventDefault();
            let this_year = e.target.parentNode.children[0].value
            let this_month = e.target.parentNode.children[1].value
            printf(this.getNumberOfDates(parseInt(this_year), parseInt(this_month)))
            if(this.isValidDate([parseInt(this_year), parseInt(this_month), this.getNumberOfDates(parseInt(this_year), parseInt(this_month))]) === false){
                alert("Please enter a valid Year-Month pair");
            }
            else{
                //remove existed one
                if(this_container.children[1] !== undefined){
                    this_container.removeChild(this_container.children[1])
                }
                //add
                let need_to_add = this.functionalCalendar(parseInt(this_year), parseInt(this_month))
                this_container.appendChild(need_to_add)
            }
        })
        return this_container
    },

    editableGrid(){
        let this_container = document.createElement("div")
        this_container.classList.add("grid_container")
        this_container.addEventListener("dblclick", (e) => {
            if(e.target.children.length === 0){
            
            
                
                let input_field = document.createElement("input")
                input_field.type = "text"
                input_field.style = "width: 95px"
                input_field.placeholder = "Enter notes here"
                let save_button = document.createElement("input")
                save_button.type = "button"
                save_button.value = "Save"
                this_container.appendChild(input_field)
                this_container.appendChild(save_button)


                save_button.addEventListener("click", (k) =>{ 
                    k.preventDefault;
                    this_container.innerHTML = input_field.value
                    
                    
                })

            }
            
        })
        
        

        return this_container
    },


    makeEditableMonthCalendar(year, month){
        let days = this.getNumberOfDates(year, month)
        if(! this.isValidDate([year, month, days])){
            return null
        }
        else{
            var container = document.createElement("div")
            container.classList.add("calendar_container")
            let first_date_day = this.checkDay([year, month, 1])
            const table = document.createElement('table');

            // header.appendChild(document.createTextNode("this is header"))
            let first_row = document.createElement("tr")
            let header = document.createElement("td")
            header.classList.add("CalendarHeader")
            header.colSpan = "7"
            let last_month_button = document.createElement("div")
            last_month_button.innerHTML = "<<="
            // header.appendChild(last_month_button)


            header.innerHTML = year.toString().concat('-').concat(month.toString())
            header.innerHTML = (this.numToEng(month)).concat('-').concat(year.toString())

            first_row.appendChild(header)
            table.appendChild(first_row)

            let second_row = document.createElement("tr")

            let Mon = document.createElement("td")
            Mon.classList.add("weekdayTitle")
            Mon.innerHTML = "Mon"

            let Tue = document.createElement("td")
            Tue.classList.add("weekdayTitle")
            Tue.innerHTML = "Tue"

            let Wed = document.createElement("td")
            Wed.classList.add("weekdayTitle")
            Wed.innerHTML = "Wed"

            let Thu = document.createElement("td")
            Thu.classList.add("weekdayTitle")
            Thu.innerHTML = "Thu"
         
            let Fri = document.createElement("td")
            Fri.classList.add("weekdayTitle")
            Fri.innerHTML = "Fri"

            let Sat = document.createElement("td")
            Sat.classList.add("weekdayTitle")
            Sat.innerHTML = "Sat"

            let Sun = document.createElement("td")
            Sun.classList.add("weekdayTitle")
            Sun.innerHTML = "Sun"

            second_row.appendChild(Sun) 
            second_row.appendChild(Mon)
            second_row.appendChild(Tue)
            second_row.appendChild(Wed)
            second_row.appendChild(Thu)
            second_row.appendChild(Fri)
            second_row.appendChild(Sat)
            table.appendChild(second_row)
     

            var flag = 0
            var day = 1
            for(let i = 0; i < 6; i += 1){
                const row = table.insertRow()
                for(let j = 0; j < 7; j += 1){
                    if(i == 0 && j == first_date_day){
                        flag = 1
                    }
                    let grid = row.insertCell() 
                    if(flag == 1){
                        grid.classList.add("calendarGrid")
                        grid.appendChild(document.createTextNode(day.toString()))
                        grid.appendChild(this.editableGrid())
                        day += 1
                        if(day > this.getNumberOfDates(year, month)){
                            flag = 0
                            //document.body.appendChild(container)
                            container.appendChild(table);
                    
                            return container
                        }
                    }
                }
            }


            
        }
    },

    makeEditableFunctionalCalendar(year, month){
        let this_container = document.createElement("div")
        this_container.classList.add("all_container")

        // let button_container = document.createElement

        let left_button = document.createElement("button")
        left_button.classList.add("left_button")
        let right_button = document.createElement("button")
        right_button.classList.add("right_button")
        left_button.innerHTML = "<<"
        right_button.innerHTML = ">>"
        let current_year = year
        let current_month = month
        
        let current_button = document.createElement("button")
        current_button.classList.add("current_time_button")
        current_button.innerHTML = "Now"


        this_container.appendChild(left_button)
        this_container.appendChild(right_button)
        this_container.appendChild(current_button)

        let current_calendar = this.makeEditableMonthCalendar(year, month)

        this_container.appendChild(current_calendar)

        

        
        


        current_button.addEventListener("click", function(e){
            e.preventDefault()
            // e.target.parentNode.removeChild(current_calendar)
            
            e.target.parentNode.removeChild(e.target.parentNode.children[3])


            current_year = Calendarrr.prototype.getToday()[0]
            current_month = Calendarrr.prototype.getToday()[1]
            
            e.target.parentNode.appendChild(Calendarrr.prototype.makeEditableMonthCalendar(current_year, current_month))
            
            
        })

        left_button.addEventListener("click", function(e){
            e.preventDefault()
            e.target.parentNode.removeChild(e.target.parentNode.children[3])

            current_year = Calendarrr.prototype.getLastMonth(current_year, current_month)[0]
            current_month = Calendarrr.prototype.getLastMonth(current_year, current_month)[1]
            
            e.target.parentNode.appendChild(Calendarrr.prototype.makeEditableMonthCalendar(current_year, current_month))
            
            
        })



        right_button.addEventListener("click", function(e){
            e.preventDefault()

             e.target.parentNode.removeChild(e.target.parentNode.children[3])

            current_year = Calendarrr.prototype.getNextMonth(current_year, current_month)[0]
            current_month = Calendarrr.prototype.getNextMonth(current_year, current_month)[1]
            e.target.parentNode.appendChild(Calendarrr.prototype.makeEditableMonthCalendar(current_year, current_month))
            
            
        })

        return this_container
    },












}
