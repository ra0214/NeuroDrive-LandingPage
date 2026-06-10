const fabBtn = document.getElementById('accessibility-fab');
const sidebar = document.getElementById('accessibility-sidebar');
const closeBtn = document.getElementById('accessibility-close');

fabBtn.addEventListener('click', () => sidebar.classList.add('open'));
closeBtn.addEventListener('click', () => sidebar.classList.remove('open'));

const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);

themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = (theme === 'dark') ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

const fontSizes = ['small', 'medium', 'large', 'xlarge'];
let currentSizeIndex = 1;

document.getElementById('size-increase').addEventListener('click', () => {
    if (currentSizeIndex < fontSizes.length - 1) {
        currentSizeIndex++;
        document.documentElement.setAttribute('data-fontsize', fontSizes[currentSizeIndex]);
    }
});

document.getElementById('size-decrease').addEventListener('click', () => {
    if (currentSizeIndex > 0) {
        currentSizeIndex--;
        document.documentElement.setAttribute('data-fontsize', fontSizes[currentSizeIndex]);
    }
});

document.querySelectorAll('.daltonism-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode');
        document.documentElement.setAttribute('data-accessibility', mode);
    });
});

document.getElementById('daltonism-reset').addEventListener('click', () => {
    document.documentElement.setAttribute('data-accessibility', 'none');
});

let ttsSpeaking = false;
const ttsBtn = document.getElementById('tts-toggle');

ttsBtn.addEventListener('click', () => {
    if (ttsSpeaking) {
        window.speechSynthesis.cancel();
        ttsSpeaking = false;
        ttsBtn.innerText = 'Leer pantalla completa';
    } else {
        const textToRead = document.body.innerText;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'es-MX';
        
        utterance.onend = () => {
            ttsSpeaking = false;
            ttsBtn.innerText = 'Leer pantalla completa';
        };

        window.speechSynthesis.speak(utterance);
        ttsSpeaking = true;
        ttsBtn.innerText = 'Detener lectura';
    }
});

const observerOptions = { threshold: 0.05, rootMargin: "0px 0px -20px 0px" };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .feature-item, .stack-box').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.4s ease-out";
    observer.observe(el);
});