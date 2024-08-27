// https://stackoverflow.com/a/64218300/19356052
// ORIGINAL:
// $ cat docs/js/image-carousel.js 
var keepTime = 2000;
console.log("Carousel MKDocs");
function updateCarousel(img) {
  if (img.carouselRunning) {
    let outstyle = img.carousel[img.carouselIndex % img.carousel.length].style;
    outstyle.visibility = 'hidden';
    outstyle.opacity = 0;
    img.carouselIndex = (img.carouselIndex + 1) % img.carousel.length;
    let instyle = img.carousel[img.carouselIndex % img.carousel.length].style;
    instyle.visibility = 'visible';
    instyle.opacity = 1;
    instyle.position = 'absolute';
  }
  setTimeout(updateCarousel, keepTime, img);
}

function setCarouselEvents(img) {
  img.style.visibility = 'hidden';
  img.style.transition = 'opacity 1.3s, visibility 1.3s';
  img.style.position = 'absolute';
  img.addEventListener(
      'mouseover', function(e) { this.carousel[0].carouselRunning = false; });
  img.addEventListener(
      'mouseout', function(e) { this.carousel[0].carouselRunning = true; });
}

function setCarousel(img) {
  img.carouselRunning = true;
  setCarouselEvents(img);
  img.carouselIndex = 0;
  setTimeout(updateCarousel, 1, img);
}

// fist we need to ask DOM for all p > img tags
let imgs = document.querySelectorAll('P > IMG');
for (let i = 1; i < imgs.length; i++) {
  let h = imgs[i].naturalHeight;
  let w = imgs[i].naturalWidth;
  let pe = imgs[i].previousElementSibling;
  if (!pe) {
    continue;
  }
  if (pe.nodeName != "IMG") {
    continue;
  }
  let sh = pe.naturalHeight;
  let sw = pe.naturalWidth;
  if (sw != w || sh != h) {
    continue;
  }
  if (imgs[i].carousel) {
    continue;
  }
  if (!pe.carousel) {
    pe.carousel = [ pe ];
    setCarousel(pe);
  }
  pe.carousel.push(imgs[i]);
  imgs[i].carousel = pe.carousel;
  setCarouselEvents(imgs[i]);
  // set parent size
  pe.parentElement.style.minWidth = "calc(" + sw + "px + 2em)";
  pe.parentElement.style.minHeight = "calc(" + sh + "px + 2em)";
}

// PHIND REFACTOR:
// Function to check if images have similar dimensions
// function hasSimilarDimensions(img1, img2) {
//   const tolerance = 10; // Allow up to 10 pixels difference in width or height
//   return Math.abs(img1.width - img2.width) <= tolerance &&
//          Math.abs(img1.height - img2.height) <= tolerance;
// }

// // Function to select images with similar dimensions
// function selectImagesWithSimilarDimensions() {
//   const imgs = document.querySelectorAll('P > IMG');
//   const selectedImages = [];

//   for (let i = 1; i < imgs.length; i++) {
//     const img = imgs[i];
//     const prevImg = imgs[i - 1];

//     if (!prevImg || !img.previousElementSibling ||
//         prevImg.nodeName !== "IMG" || img.nodeName !== "IMG") {
//       continue;
//     }

//     if (hasSimilarDimensions(prevImg, img)) {
//       if (!selectedImages.includes(prevImg)) {
//         selectedImages.push(prevImg);
//       }
//       selectedImages.push(img);
//     }
//   }

//   return selectedImages;
// }

// const keepTime = 2000;

// function updateCarousel(images) {
//   if (images.carouselRunning) {
//     const currentIndex = images.carouselIndex % images.length;
//     const nextIndex = (currentIndex + 1) % images.length;

//     // Hide current image
//     images[currentIndex].style.opacity = 0;
//     images[currentIndex].style.visibility = 'hidden';

//     // Show next image
//     images[nextIndex].style.opacity = 1;
//     images[nextIndex].style.visibility = 'visible';

//     images.carouselIndex = nextIndex;
//   }

//   setTimeout(() => updateCarousel(images), keepTime);
// }

// function setCarouselEvents(images) {
//   images.forEach(img => {
//     img.style.position = 'absolute';
//     img.style.transition = 'opacity 1.3s, visibility 1.3s';

//     img.addEventListener('mouseover', () => {
//       images[images.findIndex(i => i === img)].carouselRunning = false;
//     });

//     img.addEventListener('mouseout', () => {
//       images[images.findIndex(i => i === img)].carouselRunning = true;
//     });
//   });
// }

// function setCarousel(images) {
//   images.carouselRunning = true;
//   setCarouselEvents(images);
//   images.carouselIndex = 0;
//   setTimeout(() => updateCarousel(images), 1);
// }


// // Select images with similar dimensions
// const selectedImages = selectImagesWithSimilarDimensions();

// if (selectedImages.length > 1) {
//   const firstImage = selectedImages[0];
//   const lastImage = selectedImages[selectedImages.length - 1];

//   // Set parent size based on image dimensions
//   firstImage.parentElement.style.minWidth = `${firstImage.width}px`;
//   firstImage.parentElement.style.minHeight = `${firstImage.height}px`;

//   // Initialize carousel
//   setCarousel(selectedImages);

//   console.log("Carousel initialized successfully.");
// } else {
//   console.log("Not enough images found for carousel.");
// }
