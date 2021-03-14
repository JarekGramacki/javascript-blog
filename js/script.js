const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;

  //console.log("Link was clicked!", event);

  /*[DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /*[DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /*[DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

  /*[DONE] get 'href' attribute from the clicked link */
  let articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  let targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

function addClickListenerToAllLinks() {
  let links = document.querySelectorAll(optLinkAhrefSelector);
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optLinkAhrefSelector = '.titles a';
  optArticleTagsSelector = '.post-tags .list';
  optArticleTagsSelectorx = '.post-tags .list li a';
  optArticleAuthorSelector= '.post .post-author';

  function generateTitleLinks(customSelector = ''){
  /* remove contents of titleList */
  console.log('custom selektor:',customSelector);
  let titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for (let article of articles) {
    /* get the article id */
    let articleId = article.getAttribute('id');

    /* find the title element */
    /* get the title from the title element */
    let articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    let linkHTML = '<li><a href="#' + articleId +'"><span>'+ articleTitle +"</span></a></li>";

    /* insert link into titleList */
    //titleList.innerHTML = titleList.innerHTML + linkHTML;

    //console.log('Wstawiam kolejny link: ', linkHTML);
    //titleList.insertAdjacentHTML("beforeend", linkHTML);

    html = html + linkHTML;
  }

  titleList.innerHTML = html;
  addClickListenerToAllLinks();
}

generateTitleLinks();


function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);


  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWraper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' +  tag  +'</a></li>';
      /* add generated code to html variable */
      html = html + linkHTML;
      //console.log('generowanie kodu do zmiennej html:',html);
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWraper.innerHTML = html;
    
  /* END LOOP: for every article: */
  }
}
generateTags();


function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('.posts .active');
  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
    /* remove class active */
    activeTagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
   }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('tag links:', tagLinks);
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks){
    console.log(tagLink);
    /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  } 
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  let links = document.querySelectorAll(optArticleTagsSelectorx);
  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find autors wrapper */
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    /* make html variable with empty string */
    let html = '';
    /* get autors from data-autor attribute */
    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);
    /* generate HTML of the link */
    const linkHTML = '<li><a href="#author-' + articleAuthor + '">' +  articleAuthor  +'</a></li>';
    /* add generated code to html variable */
    html = html + linkHTML;
    /* insert HTML of all the links into the autors wrapper */
    authorsWrapper.innerHTML = html;
  /* END LOOP: for every article: */
  }
}
generateAuthors();


function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "autor" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  /* find all tag links with class active */

  /* START LOOP: for each active tag link */

    /* remove class active */

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  /* START LOOP: for each found tag link */

    /* add class active */

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToAutors(){
  /* find all links to tags */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();