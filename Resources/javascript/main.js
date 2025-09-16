// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Add some interactive hover effects for project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(-10px) scale(1)";
  });
});

// ===== INTERACTIVE FEATURES =====

// Dark Mode Toggle
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Simple theme state tracking (using variable instead of localStorage)
let currentTheme = "light";

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  // Update button icon and theme
  if (body.classList.contains("dark-mode")) {
    themeToggle.textContent = "☀️";
    currentTheme = "dark";
  } else {
    themeToggle.textContent = "🌙";
    currentTheme = "light";
  }
});

// Interactive Profile Image
const profileImage = document.getElementById("profile-image");

// Alternative image styles/filters
const imageStyles = [
  { filter: "brightness(1)", transform: "scale(1) rotate(0deg)" }, // Original
  {
    filter: "sepia(100%) hue-rotate(45deg) saturate(200%)",
    transform: "scale(1.05) rotate(5deg)",
  }, // Sepia
  {
    filter: "grayscale(100%) contrast(120%)",
    transform: "scale(1.1) rotate(-5deg)",
  }, // Grayscale
  {
    filter: "hue-rotate(180deg) saturate(150%)",
    transform: "scale(1.05) rotate(10deg)",
  }, // Color shift
  {
    filter: "blur(2px) brightness(1.2)",
    transform: "scale(1.1) rotate(-10deg)",
  }, // Dreamy
  {
    filter: "contrast(150%) brightness(1.1)",
    transform: "scale(1.05) rotate(3deg)",
  }, // High contrast
];

let currentImageIndex = 0;

if (profileImage) {
  profileImage.addEventListener("click", () => {
    // Add clicked class for animation
    profileImage.classList.add("clicked");

    // Change style after short delay
    setTimeout(() => {
      currentImageIndex = (currentImageIndex + 1) % imageStyles.length;
      const newStyle = imageStyles[currentImageIndex];

      // Apply new filter and transform
      profileImage.style.filter = newStyle.filter;
      profileImage.style.transform = newStyle.transform;

      // Remove clicked class after animation
      setTimeout(() => {
        profileImage.classList.remove("clicked");
      }, 300);
    }, 150);
  });
}

// Project Dropdowns
document.querySelectorAll(".dropdown-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-target");
    const targetDetails = document.getElementById(targetId);

    if (!targetDetails) return; // Safety check

    // Close all other dropdowns first
    document.querySelectorAll(".project-details").forEach((details) => {
      if (details.id !== targetId) {
        details.classList.remove("active");
        // Reset other buttons
        const otherButton = document.querySelector(
          `[data-target="${details.id}"]`
        );
        if (otherButton) {
          otherButton.style.transform = "rotate(0deg)";
        }
      }
    });

    // Toggle current dropdown
    targetDetails.classList.toggle("active");

    // Rotate button based on state
    if (targetDetails.classList.contains("active")) {
      button.style.transform = "rotate(180deg)";
    } else {
      button.style.transform = "rotate(0deg)";
    }
  });
});

// Interactive Demo Button (Color Change)
const colorChangeBtn = document.getElementById("color-change-btn");

// Add some extra interactivity - Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Optional: Add typing effect to hero title when page loads
document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    // Uncomment the line below if you want the typing effect
    // typeWriter(heroTitle, originalText, 100);
  }
});

// Mobile menu functionality (if you want to implement mobile navigation)
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

if (mobileMenu) {
  mobileMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });
}

// Add smooth transitions to all elements when dark mode is toggled
body.addEventListener("transitionend", (e) => {
  if (e.propertyName === "background-color") {
    // Add any additional effects after dark mode transition completes
    console.log("Theme transition completed");
  }
});

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  // ESC key closes all dropdowns
  if (e.key === "Escape") {
    document.querySelectorAll(".project-details.active").forEach((details) => {
      details.classList.remove("active");
      const button = document.querySelector(`[data-target="${details.id}"]`);
      if (button) {
        button.style.transform = "rotate(0deg)";
      }
    });
  }

  // Spacebar toggles dark mode when theme button is focused
  if (e.key === " " && document.activeElement === themeToggle) {
    e.preventDefault();
    themeToggle.click();
  }
});

// Add loading animation completion
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Trigger fade-in animations for elements already in view
  document.querySelectorAll(".fade-in").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("visible");
    }
  });
});
