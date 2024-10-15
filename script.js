// Back to Home
document.getElementById('back-to-home').addEventListener('click', () => {
  document.getElementById('detail-section').style.display = 'none';
  document.getElementById('home-section').style.display = 'block';
});


document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    targetSection.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

  
  const webtoonListSections = {
    topWebtoons: document.getElementById('top-webtoons'),
    trendingWebtoons: document.getElementById('trending-webtoons'),
    romanceWebtoons: document.getElementById('romance-webtoons'),
    fantasyWebtoons: document.getElementById('fantasy-webtoons'),
  };
  
  // Categorize webtoons and display them
  webtoons.forEach(webtoon => {
    const webtoonItem = document.createElement('div');
    webtoonItem.classList.add('webtoon-item');
  
    webtoonItem.innerHTML = `
      <img src="${webtoon.thumbnail}" alt="${webtoon.title}">
      <h3>${webtoon.title}</h3>
      <p>${webtoon.description}</p>
      <button onclick="viewWebtoon(${webtoon.id})">Read More</button>
    `;
  
    // Add to categories dynamically
    if (webtoon.id === 1) {
      webtoonListSections.topWebtoons.appendChild(webtoonItem);
    } else {
      webtoonListSections.trendingWebtoons.appendChild(webtoonItem);
    }
  });
  
  // Handle view for details
  function viewWebtoon(id) {
    const webtoon = webtoons.find(w => w.id === id);
  
    document.getElementById('webtoon-title').textContent = webtoon.title;
    document.getElementById('webtoon-large-image').src = webtoon.largeImage;
    document.getElementById('webtoon-description').textContent = webtoon.detailedDescription;
  
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = "";
    webtoon.comments.forEach(comment => {
      const commentItem = document.createElement('li');
      commentItem.textContent = comment;
      commentsList.appendChild(commentItem);
    });
  
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('detail-section').style.display = 'block';
  }
  
  // Add comment
  function addComment() {
    const commentInput = document.getElementById('comment-input');
    const newComment = commentInput.value;
  
    if (newComment) {
      const commentsList = document.getElementById('comments-list');
      const commentItem = document.createElement('li');
      commentItem.textContent = newComment;
      commentsList.appendChild(commentItem);
  
      commentInput.value = ''; // Clear input
    }
  }
  
// JavaScript to filter webtoons by genre
document.getElementById('filter-genre').addEventListener('change', function() {
  const genre = this.value;
  const webtoonItems = document.querySelectorAll('.webtoon-item');

  webtoonItems.forEach(function(item) {
    const description = item.querySelector('p').textContent.toLowerCase();

    if (genre === 'all' || description.includes(genre)) {
      item.style.display = 'block';  // Show all or matched genre
    } else {
      item.style.display = 'none';  // Hide non-matching genres
    }
  });
});

// JavaScript to sort webtoons
document.getElementById('sort-option').addEventListener('change', function() {
  const option = this.value;
  const webtoonRow = document.querySelector('.webtoon-row');
  const webtoonItems = Array.from(document.querySelectorAll('.webtoon-item'));

  if (option === 'alphabetical') {
    webtoonItems.sort(function(a, b) {
      const titleA = a.querySelector('h3').textContent.toLowerCase();
      const titleB = b.querySelector('h3').textContent.toLowerCase();
      return titleA.localeCompare(titleB);
    });
  } else if (option === 'popularity') {
    // Assuming popularity is indicated in the data-popularity attribute
    webtoonItems.sort(function(a, b) {
      return parseInt(b.getAttribute('data-popularity')) - parseInt(a.getAttribute('data-popularity'));
    });
  }

  // Append sorted webtoon items to the container
  webtoonItems.forEach(function(item) {
    webtoonRow.appendChild(item);
  });
});


// Function to show webtoon details
function showWebtoonDetail(title, description, image) {
  document.getElementById('modal-title').innerText = title;
  document.getElementById('modal-description').innerText = description;
  document.getElementById('modal-image').src = image;
  
  // Display the modal
  document.getElementById('webtoon-detail-modal').style.display = 'block';
}

// Function to close the modal
function closeWebtoonDetail() {
  document.getElementById('webtoon-detail-modal').style.display = 'none';
}

// Close the modal when clicking outside of the modal content
window.onclick = function(event) {
  const modal = document.getElementById('webtoon-detail-modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Scroll to Section on Navbar Click
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Comment Section Functionality
function handleCommentSubmit(event) {
  event.preventDefault();

  const commentText = document.getElementById('comment-text').value;
  if (commentText) {
    const commentsContainer = document.getElementById('comments-container');

    // Create a new comment div
    const newComment = document.createElement('div');
    newComment.textContent = commentText;
    commentsContainer.appendChild(newComment);

    // Clear the textarea
    document.getElementById('comment-text').value = '';
  }
}
