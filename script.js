window.onload = function() {
    
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('loader-hidden');
        loader.addEventListener('transitionend', () => {
            if (loader) {
                loader.style.display = 'none';
            }
        });
    }

    document.body.classList.add('loaded');

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('overlay-active');
        });
    }

    const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
    const dropdownMenu = document.querySelector('.nav-dropdown-menu');

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropdownToggle.classList.toggle('active');
            dropdownMenu.classList.toggle('active');
        });
    }

    document.addEventListener('click', function(e) {
        if (dropdownToggle && dropdownMenu && !dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownToggle.classList.remove('active');
            dropdownMenu.classList.remove('active');
        }
    });
    
    const mobileToggle = document.querySelector('.mobile-nav-dropdown-toggle');
    const mobileSubmenu = document.querySelector('.mobile-nav-submenu');

    if (mobileToggle && mobileSubmenu) {
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileToggle.classList.toggle('active');
            
            if (mobileSubmenu.style.display === 'block') {
                mobileSubmenu.style.display = 'none';
            } else {
                mobileSubmenu.style.display = 'block';
            }
        });
    }

    const allLinks = document.querySelectorAll('nav .nav-center a, .mobile-nav .nav-links a');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            
            if (link.classList.contains('nav-dropdown-toggle') || link.classList.contains('mobile-nav-dropdown-toggle')) {
                return;
            }

            const href = this.getAttribute('href');
            const targetId = this.getAttribute('data-scroll-to');

            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('overlay-active');
            }
            
            if (targetId && (href === '#' || href.startsWith('#'))) {
                e.preventDefault(); 
                
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 50,
                        behavior: 'smooth'
                    });
                }
            }
            
        });
    });
};