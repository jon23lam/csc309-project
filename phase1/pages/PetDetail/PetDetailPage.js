const slider = document.querySelector(".slider");

function scrollToNextImage(direction) {
  const sliderWidth = slider.clientWidth;
  const currentScrollLeft = slider.scrollLeft;
  const nextScrollLeft = currentScrollLeft + sliderWidth;
  const nextScrollRight = currentScrollLeft - sliderWidth;

  if (direction === 1) {
    if (nextScrollLeft >= slider.scrollWidth) {
      slider.scrollTo({
        left: 0,
        // behavior: "smooth",
      });
    } else {
      slider.scrollTo({
        left: nextScrollLeft,
        // behavior: "smooth",
      });
    }
  }
  if (direction === -1) {
    // Check for -1 direction
    if (nextScrollRight <= 0) {
      slider.scrollTo({
        left: slider.scrollWidth, // Scroll to the end (right)
        // behavior: "smooth",
      });
    } else {
      slider.scrollTo({
        right: nextScrollRight, // Scroll left
        // behavior: "smooth",
      });
    }
  }
}

setInterval(() => scrollToNextImage(1), 8000); // 8000 milliseconds = 8 seconds, initially scrolling left
