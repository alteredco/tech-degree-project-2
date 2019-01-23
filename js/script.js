/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*** Global variables ***/
const page = document.querySelector('.page');
const pageHeader = document.querySelector('.page-header');
const studentList = document.querySelector('.student-list').getElementsByTagName('li');
let pageSize = 10;
let pageNum = 1;

/***Generate searchbox with button***/
function createSearchBar() {
   let studentSearch = document.createElement('div');
   studentSearch.className = 'student-search';
   pageHeader.appendChild(studentSearch);
   let searchBox = document.createElement('input');
   searchBox.className = 'searchBar';
   searchBox.setAttribute('type', 'text');
   searchBox.setAttribute( 'placeholder', 'Search for students…');
   studentSearch.appendChild(searchBox);
   let searchBtn = document.createElement('button');
   searchBtn.className = 'search-button';
   searchBtn.textContent = 'Search';
   studentSearch.appendChild(searchBtn);
}
createSearchBar();

/*** Show selected page view of students***/
function showPage(currentPage, list) {
   console.log(currentPage);
   // hide all students
   for(i=0; i<list.length; i++) {
      list[i].style.display = 'none';
   }
   // show list of students according to selected page number and size limit
   for(i=0; i<pageSize; i++) {
      studentIndex = pageNum * pageSize - pageSize + i;
      list[studentIndex].style.display = 'block';

   }
};
showPage(pageNum, studentList);

/*** Calculate number of pages needed for list ***/
function getTotal() {
   let itemTotal = studentList.length;
   let pageTotal = parseInt(itemTotal / pageSize);
   //  page for remainder items
   if((itemTotal%pageSize)!=0){
      pageTotal += 1;
   };
   return pageTotal;
}

/*** Generate, append and add  functionality to the pagination buttons.***/
function appendPageLinks(total, listType) {
   let startPage = 1;
   let endPage = total;
   // create ul for page buttons
   let pageRange = document.createElement('ul');
   pageRange.className = 'pagination';
   page.appendChild(pageRange);
   // create array of page numbers based on parameter
   let pageList =  Array.from(Array((endPage + 1) - startPage).keys()).map( i => startPage + 1);
   // create li page button links
   for(i=0; i<pageList.length; i++) {
      let pageBtn = document.createElement('li');
      let pageLink = document.createElement('a');
      pageLink.href = "#";
      pageLink.textContent = i+1;
      pageBtn.appendChild(pageLink);
      pageRange.appendChild(pageBtn);
      // add event listener to page buttons
      pageLink.addEventListener('click', (e) => {
         // remove active class from all page buttons 
         let active = document.querySelectorAll('.active');
         for(i=0; i<active.length; i++){
            active[i].classList.remove('active');
         }
         // add active class to clicked page button
         e.target.classList.add('active');
         // display correct section of list for clicked page button
         pageNum = e.target.textContent;
         showPage(pageNum, listType);
      })
   }
};

/***Paginates the full list of students ***/
appendPageLinks(getTotal(), studentList);

/***Set up debounce to use with search ***/
let debounce = (fn, time) => {
   let timeout;
   return function() {
      const functionCall = () => fn.apply(this, arguments);
   
      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
   }
}

/*** Create no results message to be used for error handling ***/
function noResultsHandler() {
   let messageDiv = document.createElement('div');
   let errMess = "There were no matches for your search";
   messageDiv.className = "error-message";
   messageDiv.textContent = errMess;
   messageDiv.style.display = "none";
   // access ul of students
   let studentUl = document.querySelector('.student-list');
   // insert noResult message in student ul
   studentUl.insertBefore(messageDiv, studentUl.children[0]);
}
noResultsHandler();

/*** Display search results upon typing in searchbox or click of search button ***/
function runSearch() {
   // access input from user
   let searchInput = document.querySelector('.searchBar');
   //add event listener for searchbox that debounces on keyup
   searchInput.addEventListener('keyup',  debounce((e) => {
         filterSearch();
      }, 1000));
   //*** Filter searches based on user input
   function filterSearch() {
      // access no result message
      let messageDiv = document.querySelector('.error-message');
      // for tracking if results or not
      let results = false;
      // access user search value
      let searchValue = searchInput.value.toLowerCase();
      //access all the names and emails of students in list
      let studentDetails = document.querySelectorAll('.student-details')
      // loop through student details
      studentDetails.forEach(function(studentDetails) {
         let text = studentDetails.innerText.toLowerCase();
         // check and display if matching user search value
         if(text.match(searchValue)) {
            studentDetails.parentNode.style.display = "block";
            studentDetails.parentNode.id = "hit";
            // track  if result
            results = true;
         } else {
            studentDetails.parentNode.style.display = "none";
            studentDetails.parentNode.id = "miss";
         }
         // check and display no result  message if no results
         if(results != true || searchValue === 'null') {
            messageDiv.style.display = "block";
         } else {
            messageDiv.style.display = "none";
         }
      });
      // access pagination ul
      let pagination = document.querySelector('.pagination');
      // remove previous pagination ul on search
      pagination.remove(pagination);
      //access results of search
      let resultsList = document.querySelectorAll('#hit')
      // calculate the number of search results and number of pages needed 
      function getResultsTotal() {
         let hitTotal = resultsList.length;
         let resultsTotal = parseInt(hitTotal / pageSize);
         //  page for remainder items
         if((hitTotal%pageSize)!=0){
            resultsTotal += 1;
         };
         return resultsTotal;
      }
      // Paginates search results
      appendPageLinks(getResultsTotal(), resultsList);

      //reset page view on clearing of search box
      if(searchValue === '') {
         studentDetails.forEach(function(studentDetails) {
            studentDetails.parentNode.id = "";
         });
         showPage(pageNum, studentList);
      }
   }
   //access search button
   let searchBtn = document.querySelector('.search-button');
   //add event listener to search button
   searchBtn.addEventListener('click', (e) => {
         filterSearch(searchInput);
   })
}
runSearch();
