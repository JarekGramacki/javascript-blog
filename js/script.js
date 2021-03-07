 
{  
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    console.log('Link was clicked!', event);
    
    /*[DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
  
    /*[IN PROGRESS] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
   
  
    /*[DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
  
    /* get 'href' attribute from the clicked link */
    let articleSelector = clickedElement.getAttribute('href');
   
      
    /* find the correct article using the selector (value of 'href' attribute) */
    let targetArticle = document.querySelector(articleSelector);


    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  }

  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }



    const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  function generateTitleLinks(){

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);

    function clearMessages(){
      .innerHTML = '.titles';
    }
    clearMessages();
    /* for each article */

    /* get the article id */

    /* find the title element */

    /* get the title from the title element */

    /* create HTML of the link */

    /* insert link into titleList */

  }

  generateTitleLinks();
}