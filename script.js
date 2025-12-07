const quoteText = document.getElementById("quote-text");
const prevBtn = document.getElementById("prevQuote");
const nextBtn = document.getElementById("nextQuote");

// Массив для хранения загруженных цитат
let quotes = [];
let currentIndex = -1;

// Универсальная функция получения одной цитаты
async function fetchQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    return data.content; // текст цитаты
  } catch (error) {
    console.error("Ошибка загрузки цитаты:", error);
    return "Ошибка загрузки цитаты. Попробуйте позже.";
  }
}

// Отобразить цитату по индексу
function showQuote(index) {
  quoteText.textContent = quotes[index];
}

// Загрузить новую цитату и перейти к ней
async function loadNewQuote() {
  const newQuote = await fetchQuote();
  quotes.push(newQuote);
  currentIndex = quotes.length - 1;
  showQuote(currentIndex);
}

// Кнопка "вперед"
nextBtn.addEventListener("click", async () => {
  // Если следующая цитата уже есть — просто показываем
  if (currentIndex < quotes.length - 1) {
    currentIndex++;
    showQuote(currentIndex);
  } else {
    // Иначе загружаем новую
    await loadNewQuote();
  }
});

// Кнопка "назад"
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    showQuote(currentIndex);
  }
});

// При загрузке страницы — получаем первую цитату
loadNewQuote();



// 2. Получение случайных изображений с Picsum.photos
async function loadImages() {
  const imagesContainer = document.getElementById("images");

  for (let i = 0; i < 5; i++) {
    const img = document.createElement("img");
    img.src = `https://picsum.photos/200/300?random=${Math.random()}`;
    img.alt = "Случайное изображение";
    img.style.margin = "10px";

    imagesContainer.appendChild(img);
  }
}

// Загружаем изображения при загрузке страницы
loadImages();

const toTopBtn = document.getElementById("toTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    toTopBtn.classList.add("show");
  } else {
    toTopBtn.classList.remove("show");
  }
});

toTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* ==== Аккордеон ==== */
document.querySelectorAll(".accordion-title").forEach(title => {
  title.addEventListener("click", () => {
    const content = title.nextElementSibling;
    content.style.display =
      content.style.display === "block" ? "none" : "block";
  });
});


/* ==== Фильтрация галереи ==== */
document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;

    document.querySelectorAll(".gallery img").forEach(img => {
      if (category === "all" || img.dataset.category === category) {
        img.style.display = "block";
      } else {
        img.style.display = "none";
      }
    });
  });
});


/* ==== Модальное окно ==== */
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalVideo = document.getElementById("modalVideo");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;

    // получить ссылку из data-video
    const videoLink = img.getAttribute("data-video");

    if (videoLink) {
      modalVideo.href = videoLink;
      modalVideo.style.display = "block";
    } else {
      modalVideo.style.display = "none";
    }
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

const themeToggle = document.getElementById("themeToggle");

// 1) При загрузке страницы применяем сохранённую тему
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

// 2) При клике переключаем тему
themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("dark");

  // Сохраняем новое значение
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

});


