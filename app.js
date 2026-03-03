import { galleryItems } from "./gallery-items.js";

const galleryList = document.querySelector(".js-gallery");
const lightbox = document.querySelector(".js-lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const closeButton = document.querySelector('[data-action="close-lightbox"]');

let currentIndex = 0;

// Рендер галереї
function createGalleryItem({ preview, original, description }) {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  `;
}

const galleryMarkup = galleryItems.map(createGalleryItem).join("");
galleryList.insertAdjacentHTML("beforeend", galleryMarkup);

// Відкриття модального вікна
function openModal(imageURL) {
  currentIndex = galleryItems.findIndex((item) => item.original === imageURL);

  lightbox.classList.add("is-open");
  lightboxImage.src = imageURL;
  lightboxImage.alt = galleryItems[currentIndex].description;
}

// Закриття модалки
function closeModal() {
  lightbox.classList.remove("is-open");
  lightboxImage.src = "";
  lightboxImage.alt = "";
}

// Делегування кліку
galleryList.addEventListener("click", (event) => {
  event.preventDefault();

  if (!event.target.classList.contains("gallery__image")) return;

  const largeImageURL = event.target.dataset.source;
  openModal(largeImageURL);
});

// Кнопка закриття
closeButton.addEventListener("click", closeModal);

// Закриття по overlay
lightbox.addEventListener("click", (event) => {
  if (event.target.classList.contains("lightbox__overlay")) {
    closeModal();
  }
});

// Закриття по ESC + перегортання
document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) return;

  if (event.code === "Escape") {
    closeModal();
    return;
  }

  if (event.code === "ArrowRight") {
    currentIndex = (currentIndex + 1) % galleryItems.length;
  }

  if (event.code === "ArrowLeft") {
    currentIndex =
      (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  }

  lightboxImage.src = galleryItems[currentIndex].original;
  lightboxImage.alt = galleryItems[currentIndex].description;
});
