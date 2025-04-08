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
  
  // Check for saved theme preference, time-based setting, or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Function to check if it's nighttime (between 7 PM and 7 AM)
  function isNightTime() {
    const currentHour = new Date().getHours();
    return currentHour >= 19 || currentHour < 7;
  }
  
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
  
  // Function to set theme based on time of day
  function setThemeByTime() {
    if (isNightTime()) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }
  
  // Set initial theme
  if (savedTheme && localStorage.getItem('themeMode') === 'manual') {
    // User has manually set a preference, use that
    setTheme(savedTheme);
  } else if (localStorage.getItem('themeMode') === 'auto' || !localStorage.getItem('themeMode')) {
    // Auto mode is enabled or no mode set, set theme based on time
    localStorage.setItem('themeMode', 'auto'); // Set auto as default
    setThemeByTime();
  } else if (prefersDarkScheme.matches) {
    // Use system preference if no saved theme
    setTheme('dark');
  } else {
    // Default to light mode
    setTheme('light');
  }
  
  // Toggle theme when button is clicked
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      if (document.body.classList.contains('dark-mode')) {
        setTheme('light');
        localStorage.setItem('themeMode', 'manual'); // User manually selected a theme
      } else {
        setTheme('dark');
        localStorage.setItem('themeMode', 'manual'); // User manually selected a theme
      }
    });
    
    // Add long-press functionality to enable auto mode
    let pressTimer;
    darkModeToggle.addEventListener('mousedown', function() {
      pressTimer = window.setTimeout(function() {
        localStorage.setItem('themeMode', 'auto');
        setThemeByTime();
        alert('Auto theme mode enabled! Theme will change based on time of day.');
      }, 1500); // 1.5 seconds long press
    });
    
    darkModeToggle.addEventListener('mouseup', function() {
      clearTimeout(pressTimer);
    });
    
    darkModeToggle.addEventListener('mouseleave', function() {
      clearTimeout(pressTimer);
    });
  }
  
  // Listen for changes in color scheme preference
  prefersDarkScheme.addEventListener('change', function(e) {
    // Only apply system preference changes if not in manual mode
    if (localStorage.getItem('themeMode') !== 'manual') {
      if (e.matches) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    }
  });
  
  // Check time every hour to update theme if in auto mode
  setInterval(function() {
    if (localStorage.getItem('themeMode') === 'auto') {
      setThemeByTime();
    }
  }, 60 * 60 * 1000); // Check every hour
  
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
