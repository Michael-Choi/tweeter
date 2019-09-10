$(document).ready(function() {
  // --- our code goes here ---
  $("textarea").on("keypress", function() {
    let textLen = $(this).val().length;
    console.log(textLen);
    if (140 - textLen <= 0) {
      $(this)
        .parent()
        .find(".counter")
        .html(140 - textLen)
        .css({ color: "red" });
    } else {
      $(this)
        .parent()
        .find(".counter")
        .html(140 - textLen)
        .css({ color: "black" });
    }
  });
  console.log("ready");
});
