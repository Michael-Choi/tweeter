/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac"
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1461116232227
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd"
    },
    content: {
      text: "Je pense , donc je suis"
    },
    created_at: 1461113959088
  }
];

function renderTweets(tweets) {
  for (tweet of tweets) {
    $("#tweets-container").append(createTweetElement(tweet));
  }
}

function createTweetElement(tweetData) {
  const tweet = `
  <section class="tweets">
  <div class="tweetheaders">
    <img src="${tweetData.user.avatars}" ></a>
    <span>${tweetData.user.name}</span>
  </div>
  <article>${tweetData.content.text}</article>
  <div class="tweetfooters">
    <span>${new Date(tweetData.created_at).getTime()} days ago</span>
    <span>icons</span>
  </div>
  </section>)
  `;
  return $(tweet);
}

renderTweets(data);

//const $tweet = $("<article>").addClass("tweet");
// const $tweet = createTweetElement(data[0]);
// console.log($tweet); // to see what it looks like
//$("#tweets-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
