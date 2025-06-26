const itemsPerPage = 4;
const galleryItems = document.querySelectorAll('.gallery-item');
const paginationContainer = document.getElementById('pagination');
const totalPages = Math.ceil(galleryItems.length / itemsPerPage);

function showPage(page) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  galleryItems.forEach((item, index) => {
    item.style.display = (index >= start && index < end) ? 'block' : 'none';
  });

  // Rebuild pagination
  paginationContainer.innerHTML = '';

  // Page 1
  const page1 = document.createElement('li');
  page1.className = `page-item ${page === 1 ? 'active' : ''}`;
  page1.innerHTML = `<a class="page-link">1</a>`;
  page1.onclick = () => showPage(1);
  paginationContainer.appendChild(page1);

  // Page 2 (if exists)
  if (totalPages >= 2) {
    const page2 = document.createElement('li');
    page2.className = `page-item ${page === 2 ? 'active' : ''}`;
    page2.innerHTML = `<a class="page-link">2</a>`;
    page2.onclick = () => showPage(2);
    paginationContainer.appendChild(page2);
  }

  // Ellipsis
  if (totalPages > 3) {
    const ellipsis = document.createElement('li');
    ellipsis.className = 'page-item disabled';
    ellipsis.innerHTML = `<a class="page-link">...</a>`;
    paginationContainer.appendChild(ellipsis);
  }

  // Next (»)
  const next = document.createElement('li');
  next.className = `page-item ${page === totalPages ? 'disabled' : ''}`;
  next.innerHTML = `<a class="page-link">&raquo;</a>`;
  next.onclick = () => { if (page < totalPages) showPage(page + 1); };
  paginationContainer.appendChild(next);

  // Last (Last »)
  const last = document.createElement('li');
  last.className = `page-item ${page === totalPages ? 'active' : ''}`;
  last.innerHTML = `<a class="page-link">अंतिम &raquo;</a>`;
  last.onclick = () => showPage(totalPages);
  paginationContainer.appendChild(last);
}

// Init
showPage(1);


// =======================
// Filter Functionality
// =======================
document.getElementById('filterForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const textValue = document.getElementById('textFilter').value.toLowerCase();
  const dateValue = document.getElementById('dateFilter').value;
  const cards = document.querySelectorAll('.gallery-cards');

  cards.forEach(card => {
    const title = card.getAttribute('data-title').toLowerCase();
    const date = card.getAttribute('data-date');
    const matchesText = textValue === '' || title.includes(textValue);
    const matchesDate = dateValue === '' || date === dateValue;

    card.style.display = (matchesText && matchesDate) ? 'block' : 'none';
  });
});


// document.querySelectorAll('.carousel .carousel-item img').forEach(img => {
//   img.style.cursor = 'pointer';

//   img.addEventListener('click', function (e) {
//     const rect = img.getBoundingClientRect();
//     const x = e.clientX - rect.left;

//     const carousel = img.closest('.carousel');

//     if (x > rect.width / 2) {
//       // Clicked right side – go to next
//       bootstrap.Carousel.getInstance(carousel).next();
//     } else {
//       // Clicked left side – go to previous
//       bootstrap.Carousel.getInstance(carousel).prev();
//     }
//   });
// });

document.querySelectorAll('#galleryCarousel .carousel-item img').forEach(img => {
  img.style.cursor = 'zoom-in';

  img.addEventListener('click', function () {
    const src = img.getAttribute('src');

    const overlay = document.createElement('div');
    overlay.className = 'zoom-overlay';
    overlay.innerHTML = `
      <button class="close-zoom">&times;</button>
      <img src="${src}" alt="Zoomed Image">
    `;
    document.body.appendChild(overlay);

    overlay.querySelector('.close-zoom').onclick = () => overlay.remove();
    overlay.onclick = (e) => {
      if (e.target === overlay) overlay.remove();
    };
  });
});

const carousel = document.getElementById('galleryCarousel');
const counter = document.getElementById('slide-counter');
const items = carousel.querySelectorAll('.carousel-item');
const total = items.length;

const updateCounter = () => {
  const activeIndex = [...items].findIndex(item => item.classList.contains('active'));
  counter.textContent = `${activeIndex + 1} out of ${total}`;
};

carousel.addEventListener('slid.bs.carousel', updateCounter);
window.addEventListener('load', updateCounter);




const modal = document.getElementById('galleryModal');

modal.addEventListener('hidden.bs.modal', () => {
  const iframes = modal.querySelectorAll('iframe');
  iframes.forEach(iframe => {
    const src = iframe.src;
    iframe.src = src; // Reset src to stop video
  });
});

document.querySelectorAll('.gallery-item img').forEach((img, index) => {
      img.addEventListener('click', () => {
        const carousel = bootstrap.Carousel.getOrCreateInstance(document.querySelector('#galleryCarousel'));
        carousel.to(index);
      });
    });