import { FaJs, FaPython, FaHtml5, FaCss3Alt, FaNodeJs, FaDatabase, FaBootstrap, FaGitAlt, FaJava } from 'react-icons/fa'
import { SiMongodb, SiLeetcode, SiAndroid, SiPostman } from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'

const skills = [
  { name: 'JavaScript', icon: <FaJs color="#f7df1e" />, level: 70 },
  { name: 'Python', icon: <FaPython color="#3776ab" />, level: 70 },
  { name: 'HTML5', icon: <FaHtml5 color="#e34c26" />, level: 70 },
  { name: 'CSS3', icon: <FaCss3Alt color="#1572b6" />, level: 70 },
  { name: 'Node.js', icon: <FaNodeJs color="#68a063" />, level: 70 },
  { name: 'MongoDB', icon: <SiMongodb color="#47a248" />, level: 70 },
  { name: 'MySQL', icon: <FaDatabase color="#00758f" />, level: 70 },
  { name: 'Bootstrap', icon: <FaBootstrap color="#563d7c" />, level: 70 },
  { name: 'Git', icon: <FaGitAlt color="#f34f29" />, level: 70 },
  { name: 'Postman', icon: <SiPostman color="#ff6c37" />, level: 70 },
  { name: 'Java', icon: <FaJava color="#007396" />, level: 70 },
  { name: 'VS Code', icon: <VscCode color="#007acc" />, level: 70 },
]

const learning = [
  { name: 'Java', icon: <FaJava color="#007396" /> },
  { name: 'Spring Boot', icon: <FaJava color="#6DB33F" /> },
  { name: 'React JS', icon: <FaJs color="#61DAFB" /> },
  { name: 'System Design', icon: <FaDatabase color="#00758f" /> },
  { name: 'Data Structures', icon: <FaDatabase color="#00758f" /> },
]

function Skills() {
  return (
    <div className="page">
      <h2 className="fw-bold mb-4 text-center">Skills</h2>
      <div className="row g-4 mb-5">
        {skills.map((skill) => (
          <div className="col-12 col-sm-6 col-md-4" key={skill.name}>
            <div className="card shadow-sm p-3 text-center h-100">
              <div className="mb-2" style={{ fontSize: 40 }}>{skill.icon}</div>
              <h5 className="fw-semibold mb-2">{skill.name}</h5>
              <div className="progress mb-2" style={{ height: 8 }}>
                <div className="progress-bar" role="progressbar" style={{ width: `${skill.level}%` }} aria-valuenow={skill.level} aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <span className="small">{skill.level}%</span>
            </div>
          </div>
        ))}
      </div>
      <h3 className="fw-bold mb-3 text-center">Currently Learning</h3>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {learning.map((tech) => (
          <div key={tech.name} className="card p-3 text-center shadow-sm">
            <div style={{ fontSize: 32 }}>{tech.icon}</div>
            <div className="fw-semibold mt-2">{tech.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills 