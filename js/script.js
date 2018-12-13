/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


// Global variables
const page = document.querySelector('.page');
const pageHeader = document.querySelector('.page-header');
const studentList = document.querySelector('.student-list').getElementsByTagName('li');

let pageSize = 10;
let pageNum = 1;
let pageTotal = parseInt(studentList.length / pageSize);

/***Search function with filter ***/
function searchBar() {
   let searchBar = document.createElement('input');
   searchBar.setAttribute('type', 'text');
   searchBar.setAttribute( 'placeholder', 'Search…');
   searchBar.className = 'student-search';
   pageHeader.appendChild(searchBar);
   searchBar.addEventListener('keyup', (e) => {
      let term = e.target.value
      let searchLimit = 10;
      for(i=0; i < studentList.length; i++) {
         if(studentList[i].textContent.includes(term)) {
            for(i=0; i< searchLimit; i++) {
               console.log(studentList[i]);
            }
         } else {
            studentList[i].style.display = 'none';
         }
      }
   })
}
searchBar();

//*** ShowPage function to show selected page view of students***/
function showPage(pageNum) {
   // hide all students
   for(i=0; i<studentList.length; i++) {
      studentList[i].style.display = 'none';
   }
   // show list of students according to selected page number and size limit
   for(i=0; i<pageSize; i++) {
      studentIndex = pageNum * pageSize - pageSize + i;
      studentList[studentIndex].style.display = 'block';
   }
};
showPage(pageNum);

/*** AppendPageLinks function to generate, append, and add  functionality to the pagination buttons.***/
function appendPageLinks(pageTotal) {
   let pageRange = document.createElement('ul');
   pageRange.className = 'pagination';
   page.appendChild(pageRange);
   pageList =  Array.from(Array(pageTotal).keys());
   for(i=0; i<pageList.length; i++) {
      let pageBtn = document.createElement('li');
      let pageLink = document.createElement('a');
      pageLink.href = "#";
      pageLink.textContent = i+1;
      pageBtn.appendChild(pageLink);
      pageRange.appendChild(pageBtn);
      pageLink.addEventListener('click', (e) => {
         pageNum = e.target.textContent;
         showPage(pageNum);
      })
   }
};
appendPageLinks(pageTotal)
