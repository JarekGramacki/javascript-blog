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
