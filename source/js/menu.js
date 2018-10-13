var burger = document.querySelector(".menu__button");
var navigation = document.querySelector(".nav-list");
var newsbtn = document.querySelector(".news-button");
var news = document.querySelector(".news-list");
var major = document.querySelector(".major-list");
var majorbtn = document.querySelector(".major-button");

var menutoggle = function () {
  navigation.classList.toggle("nav-list--show");
};

menutoggle();
burger.addEventListener('click', function () {
    menutoggle();
});

var newstoggle = function () {
  news.classList.toggle("news-list--show");
  major.classList.toggle("major-list--hide");
};

var majortoggle = function () {
  majorbtn.classList.toggle("major-button--hide");
};

majorbtn.addEventListener('click', function () {
  majortoggle();
  newstoggle();
  newsbtn.classList.toggle("news-button--show");
});

newstoggle();
newsbtn.addEventListener('click', function () {
  newstoggle();
  newsbtn.classList.toggle("news-button--show");
  majorbtn.classList.toggle("major-button--hide");
});
