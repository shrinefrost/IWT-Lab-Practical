


// PAGE 2: Load Feedback List
if (document.getElementById("feedbackList")) {
  const feedbackList = document.getElementById("feedbackList");
  
  try {
    let feedbackData = localStorage.getItem("feedback");
    feedbackData = feedbackData ? JSON.parse(feedbackData) : [];
    
    
    if (feedbackData.length === 0) {
      feedbackList.innerHTML = '<p style="text-align: center; padding: 40px; color: #5f6368;">No feedback yet!</p>';
    } else {
      feedbackData.forEach(item => {
        const card = document.createElement("div");
        card.className = "feedback-card";
        
        card.innerHTML = `
          <div class="user">
            <div class="avatar">${item.name?.charAt(0)?.toUpperCase() || '?'}</div>
            <div>
              <strong>${item.name || 'Anonymous'}</strong>
              <div class="email">${item.email || ''}</div>
            </div>
          </div>
          <p>${item.text || ''}</p>
          <div class="date">${item.date || ''}</div>
        `;
        feedbackList.appendChild(card);
      });
    }
  } catch (e) {
    console.error('Feedback parse error:', e);
    feedbackList.innerHTML = '<p>Error loading feedback</p>';
  }
}


// Navigate to add feedback
function goToAddFeedback() {
  window.location.href = "add-feedback.html";
}

// PAGE 3: Submit Feedback with Validation
function submitFeedback() {
  const text = document.getElementById("feedbackText").value.trim();
  const error = document.getElementById("error");
  
  // Clear previous errors
  error.textContent = "";
  error.className = "error";

  
  // Feedback validation
  if (!text) {
    error.textContent = "Feedback cannot be empty.";
    return;
  }
  if (text.length < 10) {
    error.textContent = "Feedback must be at least 10 characters long.";
    return;
  }
  if (text.length > 500) {
    error.textContent = "Feedback cannot exceed 500 characters.";
    return;
  }
  
  // Create feedback object
  const feedback = {
    name: localStorage.getItem("userName"),
    email: localStorage.getItem("userEmail"),
    text: text,
    date: new Date().toDateString()
  };
  
  // Add to existing feedback array
  const existing = JSON.parse(localStorage.getItem("feedback")) || [];
  existing.unshift(feedback); // Add to beginning (newest first)
  
  // Save back to localStorage
  localStorage.setItem("feedback", JSON.stringify(existing));
  
  alert("Thank you for your feedback! 🎉");
  window.location.href = "feedback.html";
}
