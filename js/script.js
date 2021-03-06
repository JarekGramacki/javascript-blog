/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/
  
  // event to obiekt ktory opisuje zdarzenie, zawiera informacje gdzie byl kilk (poz X, Y),
  // na jaki element (currentTarget=this=kliknieteElement) itp
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    console.log('Link was clicked!', event);
    
    /*[DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    //w petli skaczemy po kazdym elemencie z listy activeLinks
    for(let activeLink of activeLinks){
      // dla kazdego elementu usuwamy klase active z atrybutu class
      activeLink.classList.remove('active');
    }
  
    /*[IN PROGRESS] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);
  
    /*[DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post');
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
  
    /* get 'href' attribute from the clicked link */
    let articleSelector = clickedElement.getAttribute('href');
      
    /* find the correct article using the selector (value of 'href' attribute) */
    let postToActive = document.querySelector(articleSelector);
   
    /* add class 'active' to the correct article */
    postToActive.classList.add('active');
  }

  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }