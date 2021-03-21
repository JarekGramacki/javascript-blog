const templates = {
  articleLink: Handlebars.compile(
    document.querySelector("#template-article-link").innerHTML
  ),
  tagLink: Handlebars.compile(
    document.querySelector("#template-tag-link").innerHTML
  ),
  authorLink: Handlebars.compile(
    document.querySelector("#template-author-link").innerHTML
  ),
  tagCloudLink: Handlebars.compile(
    document.querySelector("#template-tagCloud-link").innerHTML
  ),
};

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optLinkAhrefSelector = ".titles a",
  optArticleTagsSelector = ".post-tags .list",
  optArticleTagsSelectorx = ".post-tags .list li a",
  optArticleAuthorSelector = ".post .post-author",
  optArticleAuthorSelectorx = ".post .post-author li a",
  optAuthorsListSelector = ".list-authors",
  optAuthorsListSelectorx = ".list-authors li a",
  optTagsListSelector = ".list.tags li a",
  optCloudClassCount = "5",
  optCloudClassPrefix = "tag-size-";

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;

  /*[DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll(".titles a.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  /*[DONE] add class 'active' to the clicked link */
  clickedElement.classList.add("active");

  /*[DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll(".post");

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  /*[DONE] get 'href' attribute from the clicked link */
  let articleSelector = clickedElement.getAttribute("href");

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  let targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add("active");
};

function addClickListenerToAllLinks() {
  let links = document.querySelectorAll(optLinkAhrefSelector);
  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

function generateTitleLinks(customSelector = "") {
  /* remove contents of titleList */
  console.log("custom selektor:", customSelector);
  let titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = "";

  /* for each article */
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );

  let html = "";

  for (let article of articles) {
    /* get the article id */
    let articleId = article.getAttribute("id");

    /* find the title element */
    /* get the title from the title element */
    let articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //<li><a href="#{{ id }}"><span>{{ title }}</span></a></li>
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into titleList */
    //titleList.innerHTML = titleList.innerHTML + linkHTML;

    //titleList.insertAdjacentHTML("beforeend", linkHTML);

    html = html + linkHTML;
  }

  titleList.innerHTML = html;
  addClickListenerToAllLinks();
}
generateTitleLinks();

const params = { max: 0, min: 999999 };
console.log("max and min :", params);

function calculateTagsParams(tags) {
  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWraper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = "";
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");
    /* split tags into array */
    const articleTagsArray = articleTags.split(" ");
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      //const linkHTML = '<li><a href="#tag-' + tag + '">' +  tag  +'</a></li>';

      const linkHTMLData = { dataTags: tag };
      //console.log('linnk html:',linkHTMLData);
      const linkHTML = templates.tagLink(linkHTMLData);
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWraper.innerHTML = html;
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(".tags");

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);

  //let allTagsHTML = '';
  const allTagsData = { tags: [] };

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */

    //allTagsHTML +='<li><a href="#tag-'+ tag  +'">'+ tag  +' (' + allTags[tag] + ') '+'</a></li>';
    //const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>' + '    ';

    // allTagsHTML += tagLinkHTML;
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams),
    });

    /* [NEW] END LOOP: for each tag in allTags: */
  }

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace("#tag-", "");
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
    /* remove class active */
    activeTagLink.classList.remove("active");
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log("tag links:", tagLinks);
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    console.log(tagLink);
    /* add class active */
    tagLink.classList.add("active");
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(tagSelector) {
  /* find all links to tags */
  let links = document.querySelectorAll(tagSelector);
  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener("click", tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags(optArticleTagsSelectorx);
addClickListenersToTags(optTagsListSelector);

function generateAuthors() {
  let allAuthors = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find autors wrapper */
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    /* make html variable with empty string */
    let html = "";
    /* get autors from data-autor attribute */
    const articleAuthor = article.getAttribute("data-author");

    /* generate HTML of the link */
    //const linkHTML = '<li><a href="#author-' + articleAuthor + '">' +  articleAuthor  +'</a></li>';
    const linkHTMLData = { artAuthor: articleAuthor };

    const linkHTML = templates.authorLink(linkHTMLData);
    /* add generated code to html variable */
    html = html + linkHTML;
    /* insert HTML of all the links into the autors wrapper */
    authorsWrapper.innerHTML = html;
    /* END LOOP: for every article: */

    if (!allAuthors[articleAuthor]) {
      /* [NEW] add tag to allTags object */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
  }

  const autListWrapper = document.querySelector(optAuthorsListSelector);
  for (let aut in allAuthors) {
    const autLink =
      '<li><a href="#author-' +
      aut +
      '">' +
      aut +
      " (" +
      allAuthors[aut] +
      ") </a></li>";
    autListWrapper.innerHTML += autLink;
  }
}
generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  /* make a new constant "autor" and extract tag from the "href" constant */
  const author = href.replace("#author-", "");
  /* find all tag links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active tag link */
  for (let activeAuthorLink of activeAuthorLinks) {
    /* remove class active */
    activeAuthorLink.classList.remove("active");
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add("active");
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAutors(pupa) {
  /* find all links to authors */
  let links = document.querySelectorAll(pupa);
  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener("click", authorClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToAutors(optArticleAuthorSelectorx);
addClickListenersToAutors(optAuthorsListSelectorx);
