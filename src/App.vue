<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import './assets/home.css'

// Reactive state
const menuOpen = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)

// Refs to DOM elements
const leftEye = ref<HTMLElement | null>(null)
const rightEye = ref<HTMLElement | null>(null)
const leftPupil = ref<HTMLElement | null>(null)
const rightPupil = ref<HTMLElement | null>(null)

// Toggle navigation menu
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  document.body.classList.toggle('menu-open', menuOpen.value)
}

const closeMenu = () => {
  menuOpen.value = false
  document.body.classList.remove('menu-open')
}

// Track mouse for eye movement
const trackMouse = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY

  const updatePupil = (eye: HTMLElement | null, pupil: HTMLElement | null) => {
    if (!eye || !pupil) return

    const rect = eye.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const angle = Math.atan2(mouseY.value - centerY, mouseX.value - centerX)
    const distance = Math.min(Math.hypot(mouseX.value - centerX, mouseY.value - centerY) / 20, 3)
    const x = Math.cos(angle) * distance
    const y = Math.sin(angle) * distance
    pupil.style.transform = `translate(${x}px, ${y}px)`
  }

  updatePupil(leftEye.value, leftPupil.value)
  updatePupil(rightEye.value, rightPupil.value)
}

// Scroll to top
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Lifecycle
onMounted(() => {
  document.addEventListener('mousemove', trackMouse)

  const logoImg = new Image()
  logoImg.src = '/src/images/Logo.png'
  logoImg.onerror = () => console.error('Logo image failed to load')
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', trackMouse)
})
</script>


<template>
  <div class="portfolio">
    <!-- Header with logo, eyes, and hamburger menu -->
    <header>
      <div class="logo">
        <img src="/src/images/Logo.png" alt="CJM Logo" />
      </div>

      <div class="eyes" ref="eyesContainer">
        <div class="eye" ref="leftEye">
          <div class="pupil" ref="leftPupil"></div>
        </div>
        <div class="eye" ref="rightEye">
          <div class="pupil" ref="rightPupil"></div>
        </div>
      </div>

      <div class="menu-toggle" @click="toggleMenu">
        <div class="hamburger" :class="{ 'active': menuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="navigation" :class="{ 'active': menuOpen }">
        <ul>
          <li><a href="#" @click="closeMenu">Home</a></li>
          <li><a href="#about" @click="closeMenu">About</a></li>
          <li><a href="#projects" @click="closeMenu">Projects</a></li>
          <li><a href="#contact" @click="closeMenu">Contact</a></li>
        </ul>
      </div>
    </header>

    <!-- Main content -->
    <main>
      <!-- Introduction section -->
      <section class="intro">
        <h1>
          Hey! I am Charles.<br />
          I am a BSIT student that<br />
          wants to be a <span class="highlight">Data Scientist</span>
        </h1>

        <!-- Decorative elements -->
        <div class="decorative-elements">
          <div class="square orange"></div>
          <div class="square pink"></div>
          <div class="square yellow"></div>
          <div class="square teal"></div>
        </div>
      </section>

      <!-- Projects section -->
      <section id="projects" class="projects">
        <div class="section-header">
          <span class="dash"></span>
          <h2>FEATURED PROJECTS</h2>
        </div>
        <h3>Stuff I've Worked On</h3>

        <div class="project-grid">
          <!-- Project 1 -->
          <div class="project-card" style="background: linear-gradient(to bottom right, #ffe4c4, #ffdab9);">
            <div class="project-content">
              <h4>Inches and Pixels.</h4>
              <div class="tech-stack">VB.NET,SQL,HTML,CSS,JS</div>
            </div>
          </div>

          <!-- Project 2 -->
          <div class="project-card" style="background: linear-gradient(to bottom right, #add8e6, #d8bfd8);">
            <div class="project-content">
              <h4>Java Programs.</h4>
              <div class="tech-stack">Java</div>
            </div>
          </div>

          <!-- Project 3 -->
          <div class="project-card" style="background: linear-gradient(to bottom right, #ffb6c1, #ffc0cb);">
            <div class="project-content">
              <h4>Link Saver Extension.</h4>
              <div class="tech-stack">HTML CSS JS JSON</div>
            </div>
          </div>

          <!-- Project 4 -->
          <div class="project-card" style="background: linear-gradient(to bottom right, #ffb6c1, #9370db);">
            <div class="project-content">
              <h4>Beshywap.</h4>
              <div class="tech-stack">HTML,CSS,BOOTSTRAP,JS</div>
            </div>
          </div>

          <!-- Project 5 -->
          <div class="project-card" style="background: linear-gradient(to bottom right, #add8e6, #b0e0e6);">
            <div class="project-content">
              <h4>Python Programs.</h4>
              <div class="tech-stack">PYTHON</div>
            </div>
          </div>

          <!-- Project 6 -->
          <div class="project-card" style="background: linear-gradient(to bottom right, #e9967a, #deb887);">
            <div class="project-content">
              <h4>WebDev Experiments.</h4>
              <div class="tech-stack">HTML CSS JS JQUERY</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Social Media section -->
      <section class="social">
        <div class="section-header">
          <span class="dash"></span>
          <h2>FOLLOW ME</h2>
        </div>
        <h3>On The Web</h3>

        <div class="social-grid">
          <a href="#" class="social-link github">
            <span>Github</span>
            <img src="@/components/icons/github.svg" class="icon github-icon" />
          </a>
          <a href="#" class="social-link linkedin">
            <span>Linkedin</span>
            <img src="@/components/icons/linkedin.svg" class="icon linkedin-icon" />
          </a>
          <a href="#" class="social-link facebook">
            <span>Facebook</span>
            <img src="@/components/icons/facebook.svg" class="icon facebook-icon" />
          </a>
          <a href="#" class="social-link instagram">
            <span>Instagram</span>
            <img src="@/components/icons/instagram.svg" class="icon instagram-icon" />
          </a>
          <a href="#" class="social-link discord">
            <span>Discord</span>
            <img src="@/components/icons/discord.svg" class="icon discord-icon" />
          </a>
          <a href="#" class="social-link youtube">
            <span>Youtube</span>
            <img src="@/components/icons/youtube.svg" class="icon youtube-icon" />
          </a>
        </div>
      </section>

      <!-- Contact section -->
      <section id="contact" class="contact">
        <div class="section-header">
          <span class="dash"></span>
          <h2>CONTACT</h2>
        </div>
        <h3>Talk To Me</h3>

        <div class="contact-info">
          <div class="contact-item">
            <h4>EMAIL</h4>
            <p>macancharles0@gmail.com</p>
          </div>
          <div class="contact-item">
            <h4>PHONE</h4>
            <p>0943 483 6409</p>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer>
      <p>Developed by <a href="#">Charles Jayson M. Macan</a></p>
      <button class="scroll-to-top" @click="scrollToTop">
        <span class="arrow-up"></span>
      </button>
    </footer>
  </div>
</template>
