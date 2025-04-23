// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize Three.js Trophy
const initTrophy = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('trophy3D'),
        alpha: true,
        antialias: true
    });

    // Create a simple trophy geometry
    const geometry = new THREE.CylinderGeometry(1, 1.5, 4, 32);
    const material = new THREE.MeshPhongMaterial({
        color: 0xffd700,
        metalness: 0.7,
        roughness: 0.3,
    });
    const trophy = new THREE.Mesh(geometry, material);
    scene.add(trophy);

    // Add lights
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    camera.position.z = 8;

    // Animation
    const animate = () => {
        requestAnimationFrame(animate);
        trophy.rotation.y += 0.01;
        renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
};

// Initialize Three.js Stadium
const initStadium = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('stadium3D'),
        alpha: true,
        antialias: true
    });

    // Create stadium geometry
    const geometry = new THREE.BoxGeometry(10, 5, 15);
    const material = new THREE.MeshPhongMaterial({
        color: 0xcccccc,
        metalness: 0.2,
        roughness: 0.8,
    });
    const stadium = new THREE.Mesh(geometry, material);
    scene.add(stadium);

    // Add lights
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    camera.position.z = 20;
    camera.position.y = 5;

    // Animation
    const animate = () => {
        requestAnimationFrame(animate);
        stadium.rotation.y += 0.005;
        renderer.render(scene, camera);
    };

    animate();
};

// Initialize Vanilla Tilt
const initTilt = () => {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
    });
};

// Initialize Particles.js
const initParticles = () => {
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#1e40af" },
            shape: { type: "circle" },
            opacity: {
                value: 0.5,
                random: false,
                anim: { enable: false }
            },
            size: {
                value: 3,
                random: true,
                anim: { enable: false }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#1e40af",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            }
        },
        retina_detect: true
    });
};

// Initialize scroll animations
const initScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => observer.observe(element));

    // GSAP Animations
    gsap.from(".hero-text", {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".hero",
            start: "top center"
        }
    });

    gsap.from(".product-card", {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".product-grid",
            start: "top bottom"
        }
    });
};

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTrophy();
    initStadium();
    initTilt();
    initParticles();
    initScrollAnimations();
});
