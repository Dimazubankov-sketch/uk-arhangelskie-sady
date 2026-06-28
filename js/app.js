// Динамическая загрузка HTML-компонентов без синтаксических ошибок
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Загрузка Шапки сайта
    fetch('includes/header.html')
        .then(response => {
            if (!response.ok) throw new Error('Ошибка загрузки шапки');
            return response.text();
        })
        .then(html => {
            document.getElementById('header-container').innerHTML = html;
            initMobileMenu();
        })
        .catch(err => console.error(err));

    // 2. Загрузка Подвала сайта
    fetch('includes/footer.html')
        .then(response => {
            if (!response.ok) throw new Error('Ошибка загрузки подвала');
            return response.text();
        })
        .then(html => {
            document.getElementById('footer-container').innerHTML = html;
        })
        .catch(err => console.error(err));

    // 3. Загрузка Основного контента страницы
    fetch('pages/main.html')
        .then(response => {
            if (!response.ok) throw new Error('Ошибка загрузки контента');
            return response.text();
        })
        .then(html => {
            const mainContent = document.getElementById('main-content');
            mainContent.innerHTML = html;
            mainContent.classList.add('fade-in');
            initForms(); // Активируем формы после вставки HTML
        })
        .catch(err => {
            console.error(err);
            document.getElementById('main-content').innerHTML = `
                <div class="py-20 text-center">
                    <p class="text-red-600 font-bold">Не удалось загрузить pages/main.html.</p>
                    <p class="text-gray-500 text-sm mt-1">Проверьте, запущена ли папка проекта через Live Server.</p>
                </div>
            `;
        });
});

// Управление мобильным меню
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (mobileMenuBtn && mobileMenu && menuIcon) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.className = 'fa-solid fa-bars text-xl';
            } else {
                menuIcon.className = 'fa-solid fa-xmark text-xl';
            }
        });

        // Закрытие меню при клике по ссылкам
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.className = 'fa-solid fa-bars text-xl';
            });
        });
    }
}

// Инициализация отправки форм
function initForms() {
    const heroForm = document.getElementById('hero-mini-form');
    if (heroForm) {
        heroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            heroForm.classList.add('hidden');
            document.getElementById('hero-mini-success').classList.remove('hidden');
        });
    }

    const mainForm = document.getElementById('main-contact-form');
    if (mainForm) {
        mainForm.addEventListener('submit', (e) => {
            e.preventDefault();
            mainForm.classList.add('hidden');
            document.getElementById('main-form-success').classList.remove('hidden');
        });
    }
}

// Функция сброса формы обратной связи (глобальная для вызова из HTML)
window.resetMainForm = function() {
    const form = document.getElementById('main-contact-form');
    if (form) {
        form.reset();
        form.classList.remove('hidden');
        document.getElementById('main-form-success').classList.add('hidden');
    }
};

