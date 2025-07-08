import profilePic from '../assets/profile.jpg'
import { FaCode, FaGraduationCap, FaLaptopCode, FaTools } from 'react-icons/fa';

function Home() {
  return (
    <div className="page">
      <div className="container py-5">
        <div className="row align-items-center mb-5">
          <div className="col-lg-4 text-center mb-4 mb-lg-0">
            <img 
              src={profilePic} 
              alt="Siva Surya P" 
              className="rounded-circle shadow mb-3" 
              style={{ 
                width: '200px', 
                height: '200px', 
                objectFit: 'cover', 
                border: '5px solid var(--primary)' 
              }} 
            />
            <h1 className="fw-bold mb-2">Siva Surya P</h1>
            <p className="lead text-muted mb-4">Software Developer | Learned and worked in a Start-Up | AI Enthusiast</p>
            {/* Download button temporarily hidden
            <a 
              href="/assets/SivaSurya_Resume_July2025.pdf"
              download="SivaSurya_Resume.pdf"
              className="btn btn-primary btn-lg fw-semibold px-4"
              target="_blank"
              rel="noopener noreferrer nofollow"
              style={{display: 'none'}}
            >
              Download Resume
            </a>
            */}
          </div>
          
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 rounded-3 h-100">
              <div className="card-body p-4 p-lg-5">
                <h2 className="fw-bold mb-4">About Me</h2>
                <p className="lead mb-4">
                  I'm a passionate and hardworking software developer with a background in Mechanical Engineering.
                  My journey into software development began with a strong curiosity for technology and programming,
                  which led me to transition into full-stack development.
                </p>
                
                <div className="row g-4 mt-4">
                  <div className="col-md-6">
                    <div className="d-flex">
                      <div className="me-3 text-primary">
                        <FaGraduationCap size={24} />
                      </div>
                      <div>
                        <h5 className="fw-bold mb-2">Education</h5>
                        <p className="mb-0">B.E. in Mechanical Engineering (2024)</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="d-flex">
                      <div className="me-3 text-primary">
                        <FaLaptopCode size={24} />
                      </div>
                      <div>
                        <h5 className="fw-bold mb-2">Experience</h5>
                        <p className="mb-0">Junior Software Developer at Start-Up</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-5">
                  <h4 className="fw-bold mb-4">Technical Skills</h4>
                  <div className="row g-3">
                    <div className="col-6 col-md-4">
                      <div className="p-3 bg-light rounded-3 h-100">
                        <h6 className="fw-bold mb-2">Frontend</h6>
                        <p className="mb-0 small">HTML, CSS, JavaScript, Angular</p>
                      </div>
                    </div>
                    <div className="col-6 col-md-4">
                      <div className="p-3 bg-light rounded-3 h-100">
                        <h6 className="fw-bold mb-2">Backend</h6>
                        <p className="mb-0 small">Node.js, Express.js, REST APIs</p>
                      </div>
                    </div>
                    <div className="col-6 col-md-4">
                      <div className="p-3 bg-light rounded-3 h-100">
                        <h6 className="fw-bold mb-2">Databases</h6>
                        <p className="mb-0 small">MongoDB, MySQL</p>
                      </div>
                    </div>
                    <div className="col-6 col-md-4">
                      <div className="p-3 bg-light rounded-3 h-100">
                        <h6 className="fw-bold mb-2">Learning</h6>
                        <p className="mb-0 small">React, Java, Data Structures, System Design</p>
                      </div>
                    </div>
                    <div className="col-6 col-md-4">
                      <div className="p-3 bg-light rounded-3 h-100">
                        <h6 className="fw-bold mb-2">Tools</h6>
                        <p className="mb-0 small">Git, VS Code, Postman</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-5">
                  <h4 className="fw-bold mb-4">What I Do</h4>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="p-4 border rounded-3 h-100">
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-primary bg-opacity-10 p-3 rounded-3 me-3">
                            <FaCode className="text-primary" size={20} />
                          </div>
                          <h5 className="mb-0 fw-bold">Web Development</h5>
                        </div>
                        <p className="mb-0">
                          I build responsive and user-friendly web applications using modern technologies,
                          focusing on clean code and best practices.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="p-4 border rounded-3 h-100">
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-primary bg-opacity-10 p-3 rounded-3 me-3">
                            <FaTools className="text-primary" size={20} />
                          </div>
                          <h5 className="mb-0 fw-bold">Problem Solving</h5>
                        </div>
                        <p className="mb-0">
                          I enjoy tackling complex problems and finding efficient solutions through
                          algorithms and data structures.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home