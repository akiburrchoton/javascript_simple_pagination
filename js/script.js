/*
Exam One - Batch 364
Total 60 (40 + 20) Marks
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

// new WOW().init();

function showPage(arrayOfItems) {    
    const ul = document.querySelector('.student-list');
    ul.innerText = " ";
    
    // Showing the items of data based on the range sent from the pagination function
    for (var i = 0; i < arrayOfItems.length; i++) {
        
        // Checking if the Data Array is empty or not to avoid error
        if(i < data.length){

            const li = document.createElement('li');
            const studentDetails = document.createElement('div');
            const avatar = document.createElement('img');
            const studentName = document.createElement('h3');
            
            const studentEmail = document.createElement('span');

            const joinedDetails = document.createElement('div');
            const date = document.createElement('span');

            li.className = "student-item cf";
            li.className += " animate__animated animate__fadeInUp animate__delay-1s";
            studentDetails.className = "student-details";
            avatar.className = "avatar";
            studentName.className = "student-name";
            studentEmail.className = "email";
            joinedDetails.className = "joined-details";
            date.className = "date";

            // Fetching the information from the Data array
            avatar.src = arrayOfItems[i].picture.large;
            studentName.innerText = arrayOfItems[i].name.first + " " + arrayOfItems[i].name.last;
            studentEmail.innerText = arrayOfItems[i].email;
            date.innerText = "Joined " + arrayOfItems[i].registered.date;

            studentDetails.appendChild(avatar);
            studentDetails.appendChild(studentName);
            studentDetails.appendChild(studentEmail);
            joinedDetails.appendChild(date);

            li.appendChild(studentDetails);
            li.appendChild(joinedDetails);

            ul.appendChild(li);

        }
    }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination() {

    // Calculation of how many pages needed to be generated
    const numberOfPages = Math.ceil(data.length / 9);
    const ul = document.querySelector('.link-list');
    
    // Creating pagination buttons 
    for (var i = 0; i < numberOfPages; i++) {

        var li = document.createElement('li');
        li.className = "pagination-list";
        var button = document.createElement('button');
        button.type = "button";
        button.className = "pagination-btn";
        button.innerText = i + 1;
        li.appendChild(button);
        ul.appendChild(li);
    }

    var pageBtn = document.querySelectorAll('.pagination-list');
    pageBtn[0].children[0].className += " active";
    
    // Addeventlistner for the pagintaion buttons
    for (let i = 0; i < pageBtn.length; i++){
        pageBtn[i].addEventListener('click', function(){
            
            //To remove active button resetting the class name of each button first
            var btn = pageBtn[i].children;
            
            for (let j = 0; j < pageBtn.length; j++) {
                let btn = pageBtn[j].children;
                
                btn[0].className = "pagination-btn";
            }

            btn[0].className += ' active';
            
            const pageNumber = Number(pageBtn[i].innerText);
            const startRange = (pageNumber - 1) * 9;
            const endRange = pageNumber * 9;

            // Creating an array with the items based on the range (start and pagenumber) 
            const arrayOfItemsToShow = data.slice(startRange, endRange);

            showPage(arrayOfItemsToShow);
        });
    }
}


/*
(Bonus Task)
Create the `searchPage` function
This function will search and display results from all students
Only the filtered result will be displayed in the view
*/

function searchPage() {
    const input = document.querySelector('#search');

    input.addEventListener('keyup', function () {
        
        var search = input.value.toLowerCase();

        // Array of filtered items that included value of input(search) from the Data array
        const filteredItems = data.filter(function(d){
            let name = d.name.first + " " + d.name.last;

            // Sending the items that startswith the value of the input only
            const result = name.toLowerCase().startsWith(search);
            
            return result;
        });

        //Showing Error Message if search doesn't match
        const p = document.querySelector('.success-msg');
        
        if(filteredItems.length == 0){
            p.style.display = "block";
        }else{
            p.style.display = "none";
        }

        if(search != ""){
            showPage(filteredItems);
        }else{
            const firstPageItems = data.slice(0,9);
            showPage(firstPageItems);
        } 

    });
}


// Call functions
const firstPageItems = data.slice(0,9);
showPage(firstPageItems);
addPagination();
searchPage();

