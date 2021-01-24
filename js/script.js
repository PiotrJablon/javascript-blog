{
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');

  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list';

  function generateTitleLinks(customSelector = ''){

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = '';

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for(let article of articles){

      /* get the article id */

      const articleId = article.getAttribute('id');

      /* find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* get the title from the title element */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* create HTML of the link */

      titleList.insertAdjacentHTML('afterbegin', linkHTML);

      /* insert link into titleList */

      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  function generateTags(){

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(let article of articles){
      /* find tags wrapper */
      const articleTag = article.querySelector(optArticleTagSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        /* generate HTML of the link */
        const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
        /* add generated code to html variable */
        html = html + tagHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
          /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
      /* insert HTML of all the links into the tags wrapper */
      articleTag.insertAdjacentHTML('afterbegin', html);
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');
    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';
    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + ' (' +  allTags[tag] + ') ' + '</a></li>';
      console.log(tag)
    /* [NEW] END LOOP: for each tag in allTags: */
    }
    /* [NEW] add html from allTags to tagList */
    tagList.innerHTML = allTagsHTML;
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
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTagLinks){
    /* remove class active */
    activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tag of tagLinks){
    /* add class active */
    tag.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let link of tagLinks){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
  }

  addClickListenersToTags();

  function generateAuthors(){
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles){
      const articleAuthor = article.querySelector(optArticleAuthorSelector);
      let html = '';
      const articleAuthors = article.getAttribute('data-author');
      const linkHTML = '<a href="#author-' + articleAuthors + '"><span> by ' + articleAuthors + '</span></a>';
      html = html + linkHTML;
      articleAuthor.innerHTML = html;
    }
  }

  generateAuthors();

  function authorClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    for (let activeAuthor of activeAuthorLinks){
      activeAuthor.classList.remove('active');
    }
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    for (let author of authorLinks){
      author.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors(){
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');
    for (let link of authorLinks){
      link.addEventListener('click', authorClickHandler);
    }
  }

  addClickListenersToAuthors();
}
