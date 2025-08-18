import { FaJs, FaPython, FaHtml5, FaCss3Alt, FaNodeJs, FaDatabase, FaBootstrap, FaGitAlt, FaJava } from 'react-icons/fa'
import { SiMongodb, SiLeetcode, SiAndroid, SiPostman, SiOpenai } from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'

// AI Tool Icons
import cursorIcon from '../assets/cursor-icon.png'
import windsurfIcon from '../assets/windsurf-icon.png'
import copilotIcon from '../assets/copilot-icon.png'
import claudeIcon from '../assets/claude-icon.png'
import geminiIcon from '../assets/gemini-icon.png'

const skills = [
  { name: 'JavaScript', icon: <FaJs color="#f7df1e" /> },
  { name: 'Python', icon: <FaPython color="#3776ab" /> },
  { name: 'HTML5', icon: <FaHtml5 color="#e34c26" /> },
  { name: 'CSS3', icon: <FaCss3Alt color="#1572b6" /> },
  { name: 'Node.js', icon: <FaNodeJs color="#68a063" /> },
  { name: 'MongoDB', icon: <SiMongodb color="#47a248" /> },
  { name: 'MySQL', icon: <FaDatabase color="#00758f" /> },
  { name: 'Bootstrap', icon: <FaBootstrap color="#563d7c" /> },
  { name: 'Git', icon: <FaGitAlt color="#f34f29" /> },
  { name: 'Postman', icon: <SiPostman color="#ff6c37" /> },
  { name: 'Java', icon: <FaJava color="#007396" /> },
  { name: 'VS Code', icon: <VscCode color="#007acc" /> },
]

const learning = [
  { name: 'Java', icon: <FaJava color="#007396" /> },
  { name: 'Spring Boot', icon: <FaJava color="#6DB33F" /> },
  { name: 'React JS', icon: <FaJs color="#61DAFB" /> },
  { name: 'System Design', icon: <FaDatabase color="#00758f" /> },
  { name: 'Data Structures', icon: <FaDatabase color="#00758f" /> },
]

const aiTools = [
  { name: 'ChatGPT', icon: <SiOpenai color="#10a37f" /> },
  { name: 'Cursor', icon: <img src={cursorIcon} alt="Cursor" style={{ width: '24px', height: '24px' }} /> },
  { name: 'Windsurf', icon: <img src={windsurfIcon} alt="Windsurf" style={{ width: '24px', height: '24px' }} /> },
  { name: 'Microsoft Copilot', icon: <img src={copilotIcon} alt="Microsoft Copilot" style={{ width: '24px', height: '24px' }} /> },
  { name: 'Claude', icon: <img src={claudeIcon} alt="Claude" style={{ width: '24px', height: '24px' }} /> },
  { name: 'Gemini', icon: <img src={geminiIcon} alt="Gemini" style={{ width: '24px', height: '24px' }} /> },
]

function Skills() {
  return (
    <div className="page">
      <h2 className="fw-bold mb-4 text-center">Skills</h2>
      <div className="row g-3 mb-4">
        {skills.map((skill) => (
          <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={skill.name}>
            <div className="card shadow-sm p-2 text-center h-100 skill-tile">
              <div className="mb-1" style={{ fontSize: 28 }}>{skill.icon}</div>
              <h6 className="fw-semibold mb-0 small">{skill.name}</h6>
            </div>
          </div>
        ))}
      </div>
      <h3 className="fw-bold mb-3 text-center">Currently Learning</h3>
      <div className="row g-3 justify-content-center">
        {learning.map((tech) => (
          <div key={tech.name} className="col-6 col-sm-4 col-md-3 col-lg-2">
            <div className="card p-2 text-center shadow-sm learning-tile">
              <div style={{ fontSize: 24 }}>{tech.icon}</div>
              <div className="fw-semibold mt-1 small">{tech.name}</div>
            </div>
          </div>
        ))}
      </div>
      
      <h3 className="fw-bold mb-3 text-center mt-5">AI Tools & Assistants</h3>
      <div className="row g-3 justify-content-center">
        {aiTools.map((tool) => (
          <div key={tool.name} className="col-6 col-sm-4 col-md-3 col-lg-2">
            <div className="card p-2 text-center shadow-sm ai-tile">
              <div style={{ fontSize: 24 }}>{tool.icon}</div>
              <div className="fw-semibold mt-1 small">{tool.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills 