// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const burger = document.querySelector('.burger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (burger && navMenu) {
    burger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      burger.classList.toggle('active');
    });
  }
  
  // Dark mode toggle
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  
  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem('theme');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Function to set the theme
  function setTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      if (darkModeToggle) {
        darkModeToggle.innerHTML = '☀️'; // Sun icon for light mode toggle
        darkModeToggle.setAttribute('aria-label', 'Switch to light mode');
      }
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      if (darkModeToggle) {
        darkModeToggle.innerHTML = '🌙'; // Moon icon for dark mode toggle
        darkModeToggle.setAttribute('aria-label', 'Switch to dark mode');
      }
    }
  }
  
  // Set initial theme
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (prefersDarkScheme.matches) {
    setTheme('dark');
  } else {
    setTheme('light');
  }
  
  // Toggle theme when button is clicked
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      if (document.body.classList.contains('dark-mode')) {
        setTheme('light');
      } else {
        setTheme('dark');
      }
    });
  }
  
  // Listen for changes in color scheme preference
  prefersDarkScheme.addEventListener('change', function(e) {
    if (e.matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
          const headerOffset = 100; // Adjust based on your header height
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            burger.classList.remove('active');
          }
        }
      }
    });
  });
});
