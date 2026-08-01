let introEjecutada = false;

function iniciarExperiencia() {
    if (introEjecutada) return;
    
    const contenedorIntro = document.getElementById('contenedor-intro');
    const videoIntro = document.getElementById('video-intro');
    const botonIntro = document.getElementById('capa-boton-intro');
    const contenidoWeb = document.getElementById('contenido-web');
    const videoPortadaLoop = document.getElementById('video-portada-loop');
    const musicPlayer = document.getElementById('music-player');
    const audio = document.getElementById('bg-audio');
    const playPauseBtn = document.getElementById('play-pause-btn');

    introEjecutada = true;

    // Revelar la web principal inmediatamente debajo de la animación
    if (contenidoWeb) {
        contenidoWeb.classList.remove('web-oculta');
        contenidoWeb.classList.add('web-visible');
    }

    if (videoPortadaLoop) {
        videoPortadaLoop.play().catch(e => console.log("Carga diferida de portada", e));
    }

    if (botonIntro) {
        botonIntro.style.transition = "opacity 0.3s";
        botonIntro.style.opacity = "0";
        setTimeout(() => botonIntro.style.display = 'none', 300);
    }

    // Reproducción de audio con manejo de permisos del navegador
    if (audio) {
        audio.volume = 0.5;
        audio.play().then(() => {
            if (playPauseBtn) playPauseBtn.classList.add('playing');
        }).catch(e => {
            console.log("Autoplay restringido por el navegador:", e);
        });
    }

    if (videoIntro) {
        videoIntro.muted = false;
        videoIntro.play().then(() => {
            setTimeout(() => {
                hacerFadeOut();
            }, 1200);
        }).catch(error => {
            hacerFadeOut();
        });

        videoIntro.onended = function() { hacerFadeOut(); };
        videoIntro.onerror = function() { hacerFadeOut(); };
    } else {
        hacerFadeOut();
    }

    function hacerFadeOut() {
        if (contenedorIntro) {
            contenedorIntro.classList.add('desvanecer-intro');
        }
        
        if (musicPlayer) {
            setTimeout(() => { musicPlayer.classList.remove('hidden-player'); }, 600);
        }

        setTimeout(() => {
            if (contenedorIntro) contenedorIntro.style.display = 'none';
        }, 800);
    }
}

/* REPRODUCTOR DE MÚSICA */
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bg-audio');
    const playPauseBtn = document.getElementById('play-pause-btn');

    if (playPauseBtn && audio) {
        playPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (audio.paused) {
                audio.play();
                playPauseBtn.classList.add('playing');
            } else {
                audio.pause();
                playPauseBtn.classList.remove('playing');
            }
        });
    }
});

/* REVELAR SECCIONES AL HACER SCROLL */
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal-section');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 70;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    setTimeout(revealOnScroll, 800); 
});

/* INTERACCIÓN VINILOS DE LA FECHA */
document.addEventListener('DOMContentLoaded', () => {
    const circles = document.querySelectorAll('.vinyl-disc-btn');
    const finalCard = document.getElementById('final-date-card');
    const txtInstruccion = document.getElementById('instruccion-fecha');
    let revealedCount = 0;

    circles.forEach(circle => {
        circle.addEventListener('click', () => {
            if (!circle.classList.contains('flipped')) {
                circle.classList.add('flipped');
                revealedCount++;

                if (txtInstruccion) {
                    txtInstruccion.style.opacity = '0';
                    setTimeout(() => { txtInstruccion.style.display = 'none'; }, 300);
                }

                if (revealedCount === 3 && finalCard) {
                    setTimeout(() => {
                        finalCard.classList.add('show');
                    }, 400);
                }
            }
        });
    });
});

/* CUENTA REGRESIVA */
document.addEventListener('DOMContentLoaded', () => {
    const targetDate = new Date('August 21, 2026 21:00:00').getTime();
    const countdownGrid = document.getElementById('countdown-timer');
    const tonightMsg = document.getElementById('tonight-msg');

    function actualizarContador() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            if (countdownGrid) countdownGrid.style.display = 'none';
            if (tonightMsg) {
                tonightMsg.style.display = 'block';
                tonightMsg.classList.add('fade-in-up');
            }
            return;
        }

        const dias = Math.floor(distance / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distance % (1000 * 60)) / 1000);

        if (document.getElementById('dias')) document.getElementById('dias').innerText = dias < 10 ? `0${dias}` : dias;
        if (document.getElementById('horas')) document.getElementById('horas').innerText = horas < 10 ? `0${horas}` : horas;
        if (document.getElementById('minutos')) document.getElementById('minutos').innerText = minutos < 10 ? `0${minutos}` : minutos;
        if (document.getElementById('segundos')) document.getElementById('segundos').innerText = segundos < 10 ? `0${segundos}` : segundos;
    }

    actualizarContador();
    setInterval(actualizarContador, 1000);
});