// Animation utilities for scroll effects and interactions

export const observeElementsOnScroll = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  // Observe elements with animation classes
  const animatedElements = document.querySelectorAll('.freebie-item, .value-card, .article-card, .faq-item, .topic-card, .approach-item');
  animatedElements.forEach(el => observer.observe(el));

  return observer;
};

export const smoothScrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

export const addScrollEffectToHeader = () => {
  const header = document.querySelector('.header');
  
  const handleScroll = () => {
    if (window.scrollY > 100) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
};

export const addParallaxEffect = () => {
  const handleScroll = () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      const yPos = -(scrolled * speed);
      (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
    });
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
};

export const typeWriter = (element: HTMLElement, text: string, speed: number = 50) => {
  element.innerHTML = '';
  let i = 0;
  
  const timer = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
  
  return timer;
};

export const countUp = (element: HTMLElement, start: number, end: number, duration: number = 2000) => {
  const startTime = performance.now();
  
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const current = Math.floor(start + (end - start) * progress);
    element.textContent = current.toString();
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  
  requestAnimationFrame(animate);
};