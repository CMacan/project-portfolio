<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import './assets/home.css'
import { useRouter, useRoute } from 'vue-router'
import { nextTick } from 'vue'

// Reactive state
const $route = useRoute()
const router = useRouter()
const route = useRoute()
const menuOpen = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)

function goToProjects() {
  if (route.path === '/') {
    // Already on home, scroll directly
    scrollToSection('projects', 187)
  } else {
    // Navigate to home, then scroll after DOM updates
    router.push('/').then(() => {
      nextTick(() => {
        scrollToSection('project-content')
      })
    })
  }
}

function goToSocial() {
  if (route.path === '/') {
    // Already on home, scroll directly
    scrollToSection('social', 10)
  } else {
    // Navigate to home, then scroll after DOM updates
    router.push('/').then(() => {
      nextTick(() => {
        scrollToSection('social')
      })
    })
  }
}

// Refs to DOM elements
const leftEye = ref<HTMLElement | null>(null)
const rightEye = ref<HTMLElement | null>(null)
const leftPupil = ref<HTMLElement | null>(null)
const rightPupil = ref<HTMLElement | null>(null)
const isExpanded = ref(false)
const isPlaying = ref(false)
const audioRef = ref<HTMLAudioElement | null>(null)
const trackUrl = 'Cali.mp3'
const bar1 = ref<HTMLElement | null>(null)
const bar2 = ref<HTMLElement | null>(null)
const bar3 = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)
const toggleRef = ref<HTMLElement | null>(null)


function scrollToSection(id: string, offset = 0): void {
  const element = document.getElementById(id)
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset + offset
    window.scrollTo({ top: y, behavior: 'smooth' })
  } else {
    console.warn(`Element with id "${id}" not found.`)
  }

  closeMenu?.() // optional chaining to avoid error if undefined
}


const togglePlayer = () => {
  isExpanded.value = !isExpanded.value
}

const togglePlay = () => {
  const audio = audioRef.value
  if (!audio) return

  audio.loop = true

  if (isPlaying.value) {
    audio.pause()
  } else {
    audio.play()
  }
  isPlaying.value = !isPlaying.value
}

let isAnimating = false 
let animationFrame: number | null = null

const animateBars = () => {
  if (!isPlaying.value || isAnimating) return
  isAnimating = true
  const bars = [bar1.value, bar2.value, bar3.value]
  bars.forEach(bar => {
    if (bar) {
      const newHeight = Math.floor(Math.random() * 20) + 5 // 5px to 25px
      bar.style.height = `${newHeight}px`
    }
  })
  animationFrame = requestAnimationFrame(() => {
    setTimeout(animateBars, 300) 
    isAnimating = false
  })
}

const stopAnimatingBars = () => {
  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
  isAnimating = false
  const bars = [bar1.value, bar2.value, bar3.value]
  bars.forEach(bar => {
    if (bar) bar.style.height = '5px'
  })
}

watch(isPlaying, (playing) => {
  if (playing) {
    animateBars()
  } else {
    stopAnimatingBars()
  }
})

function handleClickOutside(event: MouseEvent) {
  const target = event.target as Node

  const clickedInsideMenu = menuRef.value?.contains(target)
  const clickedToggle = toggleRef.value?.contains(target)

  if (menuOpen.value && !clickedInsideMenu && !clickedToggle) {
    menuOpen.value = false
  }
}


watch(menuOpen, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    }, 0)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})


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

const roles = [
  {
    title: "Full Stack Developer",
    gradient: "linear-gradient(90deg, #00c6ff, #0072ff)" 
  },
  {
    title: "Cybersecurity Analyst",
    gradient: "linear-gradient(90deg, #f9d423, #ff4e50)" 
  },
  {
    title: "AI/ML Engineer",
    gradient: "linear-gradient(90deg, #ff7300, #f83600)" 
  },
  {
    title: "Software Engineer",
    gradient: "linear-gradient(90deg, #ff6ec7, #ffc3a0)" 
  }
]
const currentRole = ref(roles[0].title)
const currentGradient = ref(roles[0].gradient)
let roleInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  // const logoImg = new Image()
  // logoImg.src = `${import.meta.env.BASE_URL}src/images/Logo.png`
  // logoImg.onerror = () => console.error('Logo image failed to load')

  document.addEventListener('mousemove', (e) => {
    trackMouse(e)
  })
  let index = 0
    roleInterval = setInterval(() => {
      index = (index + 1) % roles.length
      currentRole.value = roles[index].title
      currentGradient.value = roles[index].gradient
    }, 2000)

    animate()
})


onBeforeUnmount(() => {
  document.removeEventListener('mousemove', trackMouse)
  if (roleInterval) {
    clearInterval(roleInterval);
  }
  if (animationId) cancelAnimationFrame(animationId)
})

const certificateList = [
  'udemy-vue.png',
  'udemy-python.png',
  'cisco-data-science.png',
  'cisco-py-essentials.png',
  'simplilearn-proj-mgmt.png',
  'simplilearn-php.png',
  'simplilearn-sql.png',
  'simplilearn-js.png',
  'simplilearn-data-analytics.png',
  'simplilearn-ai.png',
]
const repeatedCertificates = [...certificateList, ...certificateList]

const track = ref<HTMLElement | null>(null)
let animationId: number | null = null

// for movement
let posX = 0
let isDragging = false
let startX = 0
let dragStartPosX = 0
const scrollSpeed = 1

const animate = () => {
  if (!isDragging && track.value) {
    posX -= scrollSpeed
    if (Math.abs(posX) >= track.value.scrollWidth / 2) {
      posX = 0
    }
    track.value.style.transform = `translateX(${posX}px)`
  }
  animationId = requestAnimationFrame(animate)
}

const startDrag = (e: MouseEvent | TouchEvent) => {
  isDragging = true
  startX = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX
  dragStartPosX = posX
}

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging || !track.value) return
  const currentX = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX
  const movement = currentX - startX
  posX = dragStartPosX + movement
  track.value.style.transform = `translateX(${posX}px)`
}

const endDrag = () => {
  isDragging = false
}

</script>


<template>
  <audio ref="audioRef" :src="trackUrl" />
   <!-- Header with logo, eyes, and hamburger menu -->
  <header>
      <div class="logo" @click="scrollToTop">
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

      <div class="menu-toggle" @click="toggleMenu" ref="toggleRef">
        <div class="hamburger" :class="{ 'active': menuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="navigation" :class="{ 'active': menuOpen }" ref="menuRef">
        <ul>
          <li><a href="#" @click="$router.push('/')">Home</a></li>
          <li><a href="#" @click="$router.push('/MyResume')">About</a></li>
          <li><a href="#" @click.prevent=goToProjects>Projects</a></li>
          <li><a href="#" @click.prevent=goToSocial>Contact</a></li>
        </ul>
      </div>
  </header>
  <div v-if="$route.path === '/'" class="portfolio">
    <!-- Main content -->
    <main>
      
      <!-- Introduction section -->
      <section class="intro">
        <h1>
          Hey! I am Charles.<br />
          I am a BSIT student that<br />
          wants to be a <span class="highlight rotating-text" :style="{
            backgroundImage: currentGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }">{{ currentRole }}</span>
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
          <a href="https://github.com/CMacan/BMIS_Copy" target="_blank" rel="noopener" class="project-card" style="background: linear-gradient(to bottom right, #ffe4c4, #ffdab9);">
            <div class="project-content">
              <h4>Barangay Management Information System.</h4>
              <div class="tech-stack">PHP, Laravel, PostgreSQL, Inertia, HTML, CSS, JS</div>
            </div>
          </a>

          <!-- Project 2 -->
          <a href="https://github.com/CMacan/LLC-Tourism-Web-App" target="_blank" rel="noopener" class="project-card" style="background: linear-gradient(to bottom right, #add8e6, #d8bfd8);">
            <div class="project-content">
              <h4>Lapu-Lapu Tourism Web Application.</h4>
              <div class="tech-stack">Python, Django, MongoDB, JS</div>
            </div>
          </a>

          <!-- Project 3 -->
          <a href="https://github.com/CMacan/MCAV-desktop-app" target="_blank" rel="noopener" class="project-card" style="background: linear-gradient(to bottom right, #ffb6c1, #ffc0cb);">
            <div class="project-content">
              <h4>MCAV Printing Services Inventory Management System.</h4>
              <div class="tech-stack">Python, Django, SQL, JS</div>
            </div>
          </a>

          <!-- Project 4 -->
          <a href="https://github.com/CMacan/yummify-food-app" target="_blank" rel="noopener" class="project-card" style="background: linear-gradient(to bottom right, #ffb6c1, #9370db);">
            <div class="project-content">
              <h4>Yummify Food Ordering System Mobile.</h4>
              <div class="tech-stack">Expo, TypeScript</div>
            </div>
          </a>

          <!-- Project 5 -->
          <a href="https://github.com/CMacan/yeti-login" target="_blank" rel="noopener" class="project-card" style="background: linear-gradient(to bottom right, #add8e6, #b0e0e6);">
            <div class="project-content">
              <h4>Yeti Login.</h4>
              <div class="tech-stack">HTML, CSS, JS</div>
            </div>
          </a>

          <!-- Project 6 -->
          <a href="https://github.com/CMacan/Shrouded-Playground-Game" target="_blank" rel="noopener" class="project-card" style="background: linear-gradient(to bottom right, #e9967a, #deb887);">
            <div class="project-content">
              <h4>Shrouded Playground.</h4>
              <div class="tech-stack">GDevelop 5</div>
            </div>
          </a>
        </div>
      </section>

      <!-- Certificates Carousel -->
      <section class="certificates">
        <div class="section-header">
          <span class="dash"></span>
          <h2>CERTIFICATES</h2>
        </div>

        <div
          class="rolling-carousel"
          ref="carousel"
          @mousedown="startDrag"
          @mousemove="onDrag"
          @mouseup="endDrag"
          @mouseleave="endDrag"
          @touchstart="startDrag"
          @touchmove="onDrag"
          @touchend="endDrag"
        >
          <div class="carousel-track" ref="track">
            <div
              class="certificate-img"
              v-for="(cert, index) in repeatedCertificates"
              :key="index"
            >
              <img :src="cert" alt="Certificate" />
            </div>
          </div>
        </div>
      </section>



      <!-- Social Media section -->
      <section id="social" class="social">
        <div class="section-header">
          <span class="dash"></span>
          <h2>FOLLOW ME</h2>
        </div>
        <h3>On The Web</h3>

        <div class="social-grid">
          <a href="https://github.com/CMacan" target="_blank" class="social-link github">
            <span>Github</span>
            <svg class="icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            fill="currentColor"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/macan-charles-jayson-m-2338ba36a/" target="_blank" class="social-link linkedin">
            <span>Linkedin</span>
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
              <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"
              fill="currentColor"></path>
            </svg>
          </a>
          <a href="https://www.facebook.com/Charles.Macan" target="_blank" class="social-link facebook">
            <span>Facebook</span>
            <svg class="icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
            fill="currentColor"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/macan.charles/"  target="_blank" class="social-link instagram">
            <span>Instagram</span>
            <svg class="icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"
            fill="currentColor"/>
          </svg>
          </a>
          <a href="https://discord.com/users/609498395656060929" target="_blank" class="social-link discord">
            <span>Discord</span>
            <svg class="icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Discord</title><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
            fill="currentColor"/>
          </svg>
          </a>
          <a href="https://youtube.com/@macancharlesjaysonm.9181?si=S5yWWX4tEn8Qizg1" target="_blank" class="social-link youtube">
            <span>Youtube</span>
            <svg class="icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>YouTube</title><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
            fill="currentColor"/>
          </svg>
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
    <footer style="position: relative;">
      <p>Developed by <span class="developer-name">Charles Jayson M. Macan</span></p>

      <button class="scroll-to-top" @click="scrollToTop">
        <span class="arrow-up"></span>
      </button>
    </footer>

    <!-- Sticky music player -->

    <img class="djcat" src="/djcat.gif" alt="DJ Cat" @click="togglePlayer" />
    <div
      class="music-player"
      :class="{ expanded: isExpanded }"
      @click="togglePlayer"
    >
      <div v-if="isExpanded" class="info" @click.stop>
        <span class="music-bars" :class="{ animated: isPlaying }">
          <span class="bar" ref="bar1"></span>
          <span class="bar" ref="bar2"></span>
          <span class="bar" ref="bar3"></span>
        </span>
        <p class="title">
          CALI
        </p>
        <p class="artist">WATABOI</p>
        <div class="controls">
          <button @click="togglePlay">
            {{ isPlaying ? '⏸️' : '▶️' }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <router-view v-else />
</template>
