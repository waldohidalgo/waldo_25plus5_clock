$(function () {
  const mainTitle = $(".main_title")[0];
  const footerTag = $("#footer_tag")[0];
  const typewriterMainTitle = new Typewriter(mainTitle, {
    loop: false,
    delay: 75,
  });
  typewriterMainTitle.typeString("25 + 5 Clock ⏰").start();

  const typewriterFooterTag = new Typewriter(footerTag, {
    loop: false,
    delay: 75,
  });
  typewriterFooterTag.typeString("Developed by:").start();
});
