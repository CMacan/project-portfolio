<template>
  <router-view />
  <div class="resume-page">
    <!-- Resume PDF Section -->
    <section class="resume-section">
      <div class="section-header">
        <span class="dash"></span>
        <h1>MY RESUME</h1>
      </div>
      
      <div class="pdf-container">
        <iframe 
          src="/Resume.pdf" 
          class="resume-pdf"
          title="Resume PDF"
        ></iframe>
        
        <div class="pdf-actions">
          <button @click="downloadResume" class="download-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7,10 12,15 17,10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Resume
          </button>
          
          <button @click="openFullscreen" class="fullscreen-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
            View Fullscreen
          </button>
        </div>
      </div>
    </section>

    <!-- Languages I Know Section -->
    <section class="skills-section">
      <div class="section-header">
        <span class="dash"></span>
        <h2>MY SKILLS</h2>
      </div>
      <h3>Languages I Know</h3>
      
      <div class="skills-grid">
        <div 
          v-for="skill in knownLanguages" 
          :key="skill.name"
          class="skill-card known-skill"
          :title="skill.name"
        >
          <div class="skill-icon">
            <img :src="skill.icon" :alt="skill.name" />
          </div>
        </div>
      </div>
    </section>

    <!-- Currently Learning Section -->
    <section class="learning-section">
      <div class="section-header">
        <span class="dash"></span>
        <h2>STUDYING</h2>
      </div>
      <h3>Currently Learning</h3>
      
      <div class="learning-grid">
        <div 
          v-for="tech in currentlyLearning" 
          :key="tech.name"
          class="skill-card learning-skill"
          :title="tech.name"
        >
          <div class="skill-icon">
            <img :src="tech.icon" :alt="tech.name" />
          </div>
        </div>
      </div>
    </section>

    <!-- Fullscreen Modal -->
    <div v-if="showFullscreen" class="fullscreen-modal" @click="closeFullscreen">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeFullscreen">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <iframe 
          src="/Resume.pdf" 
          class="fullscreen-pdf"
          title="Resume PDF Fullscreen"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
export default {
  name: 'MyResume',
  data() {
    return {
      showFullscreen: false,
      knownLanguages: [
        {
          name: 'C++',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg'
        },
        {
          name: 'Java',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
        },
        {
          name: 'Python',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
        },
        {
          name: 'Visual Studio',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg'
        },
        {
          name: 'Laravel',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg'
        },
        {
          name: 'HTML5',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
        },
        {
          name: 'CSS3',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
        },
        {
          name: 'JavaScript',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
        }
      ],
      currentlyLearning: [
        {
          name: 'JavaScript Advanced',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
        },
        {
          name: 'React',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
        },
        {
          name: 'Firebase',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg'
        }
      ]
    }
  },
  methods: {
    downloadResume() {
      const link = document.createElement('a');
      link.href = '/Resume.pdf';
      link.download = 'Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    
    openFullscreen() {
      this.showFullscreen = true;
      document.body.style.overflow = 'hidden';
    },
    
    closeFullscreen() {
      this.showFullscreen = false;
      document.body.style.overflow = 'auto';
    }
  },
  
  beforeUnmount() {
    // Cleanup when component is destroyed
    document.body.style.overflow = 'auto';
  }
}
</script>

<style scoped>
.resume-page {
  min-height: 100vh;
  background: #0a0a0a;
  color: #ffffff;
  padding: 40px 20px;
}

/* Section Headers */
.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.dash {
  width: 40px;
  height: 3px;
  background: #00ff88;
  margin-right: 15px;
}

.section-header h1,
.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  letter-spacing: 2px;
}

.section-header h2 {
  font-size: 2rem;
}

h3 {
  font-size: 2rem;
  font-weight: 300;
  color: #ffffff;
  margin-bottom: 40px;
  text-align: left;
}

/* Resume PDF Section */
.resume-section {
  max-width: 1200px;
  margin: 0 auto 80px;
}

.pdf-container {
  position: relative;
  background: #1a1a1a;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.resume-pdf {
  width: 100%;
  height: 800px;
  border: none;
  display: block;
}

.pdf-actions {
  display: flex;
  gap: 15px;
  padding: 20px;
  background: #1a1a1a;
  border-top: 1px solid #333;
}

.download-btn,
.fullscreen-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.download-btn {
  background: #00ff88;
  color: #000;
}

.download-btn:hover {
  background: #00cc6a;
  transform: translateY(-2px);
}

.fullscreen-btn {
  background: transparent;
  color: #fff;
  border: 2px solid #333;
}

.fullscreen-btn:hover {
  border-color: #00ff88;
  color: #00ff88;
}

/* Skills Sections */
.skills-section,
.learning-section {
  max-width: 1200px;
  margin: 0 auto 80px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 60px;
}

.learning-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 800px;
}

/* Skill Cards */
.skill-card {
  background: #1a1a1a;
  border: 2px solid #333;
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.skill-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  transition: all 0.3s ease;
}

.known-skill::after {
  background: #00ff88;
}

.learning-skill::after {
  background: #ff4757;
}

.skill-card:hover {
  transform: translateY(-5px);
  border-color: #00ff88;
  box-shadow: 0 10px 30px rgba(0, 255, 136, 0.2);
}

.learning-skill:hover {
  border-color: #ff4757;
  box-shadow: 0 10px 30px rgba(255, 71, 87, 0.2);
}

.skill-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skill-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: brightness(1.1);
}

/* Fullscreen Modal */
.fullscreen-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  position: relative;
  width: 95%;
  height: 95%;
  background: #1a1a1a;
  border-radius: 15px;
  overflow: hidden;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: #ff4757;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #ff3742;
  transform: scale(1.1);
}

.fullscreen-pdf {
  width: 100%;
  height: 100%;
  border: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .resume-page {
    padding: 20px 10px;
  }
  
  .section-header h1,
  .section-header h2 {
    font-size: 1.8rem;
  }
  
  h3 {
    font-size: 1.5rem;
  }
  
  .resume-pdf {
    height: 600px;
  }
  
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
  }
  
  .learning-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .skill-card {
    padding: 30px 15px;
  }
  
  .skill-icon {
    width: 60px;
    height: 60px;
  }
  
  .pdf-actions {
    flex-direction: column;
    gap: 10px;
  }
  
  .modal-content {
    width: 98%;
    height: 98%;
  }
}

@media (max-width: 480px) {
  .section-header h1,
  .section-header h2 {
    font-size: 1.5rem;
  }
  
  .resume-pdf {
    height: 500px;
  }
  
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .skill-icon {
    width: 50px;
    height: 50px;
  }
}
</style>