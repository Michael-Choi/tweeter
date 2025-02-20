/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function renderTweets(tweets) {
  //tweetsArr holds all the created html then appends it in order
  let tweetsArr = [];
  tweets.forEach(tweet => tweetsArr.unshift(createTweetElement(tweet)));
  $("#tweets-container").append(tweetsArr);
}

function createTweetElement(tweetData) {
  console.log(tweetData);
  const tweet = `
  <section class="tweets">
  <div class="tweetheaders">
    <div>
      <img src="${escape(tweetData.user.avatars)}" ></a>
      <span class="username">${escape(tweetData.user.name)}</span>
    </div>
    <p class="handle">${escape(tweetData.user.handle)}</p>
  </div>
  <article>${escape(tweetData.content.text)}</article>
  <div class="tweetfooters">
    <span>${Math.round(
      (Date.now() - new Date(tweetData.created_at)) / 86400000
    )} days ago</span>
    <span>icons</span>
  </div>
  </section>)
  `;
  return $(tweet);
}
//escape function makes text safe and prevents injection
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//on submit, if the text input is valid makes a post request. then displays the error message if the post is invalid
$("form").on("submit", async function(event) {
  event.preventDefault();
  let queryString = await $(this).serialize();
  if (queryString.length < 145 && queryString.length > 5) {
    try {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: queryString,
        success: function() {
          $("#tweets-container").empty();
          loadTweets();
        }
      });
      error = false;
      toggleerror(error);
    } catch (err) {
      error = true;
    }
  } else {
    error = true;
    toggleerror(error);
  }
});

async function loadTweets() {
  try {
    await $.ajax({
      url: "http://localhost:8080/tweets",
      dataType: "JSON",
      success: function(data) {
        renderTweets(data);
      }
    });

    // .then(data => renderTweets(data));
  } catch (err) {
    console.log(err);
  }
}

$(document).ready(() => {
  loadTweets();
});

$("#toggle-btn").click(function() {
  $(".new-tweet").slideToggle();
});

let toggleerror = error => {
  if (error == true) {
    $(".error")
      .removeClass("Hidden")
      .addClass("Show");
  } else {
    $(".error")
      .addClass("Hidden")
      .removeClass("Show");
  }
};
focusMethod = function getFocus() {
  setTimeout(() => {
    document.querySelector("textarea").focus();
  }, 100);
};
$(window).scroll(function() {
  var height = $(window).scrollTop();

  if (height > 600) {
    $(".jumpToTop")
      .addClass("Show")
      .removeClass("Hidden");
  } else {
    $(".jumpToTop")
      .removeClass("Show")
      .addClass("Hidden");
  }
});
//jumps the user to top of page
function jump() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
