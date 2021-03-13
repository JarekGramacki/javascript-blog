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
};

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
 
function generateTitleLinks() {
  /* remove contents of titleList */
  let titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  let articles = document.querySelectorAll(optArticleSelector);

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

    console.log('Wstawiam kolejny link: ', linkHTML);
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
    console.log('Article Tags:', articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
      console.log('pojedyńcze tagi:', tag);
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' +  tag  +'</a></li>';
      console.log('link html:',linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;
      console.log('generowanie kodu do zmiennej html:',html);
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWraper.innerHTML = html;
    console.log('Tags Wraper:',tagsWraper)
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
  const href = document.querySelectorAll('a[href="' + href + '"]');
  console.log('kliknięty href:', clickedHref);
  /* make a new constant "tag" and extract tag from the "href" constant */

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

function addClickListenersToTags(){
  /* find all links to tags */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();