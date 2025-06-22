import { FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const experiences = [
  {
    id: 2,
    company: 'Start-Up',
    position: 'Junior Software Developer',
    duration: 'Feb 2025 - Apr 2025',
    location: 'Rajapalayam, India',
    responsibilities: [
      'Worked on multiple projects, gaining hands-on experience in full-stack development',
      'Collaborated with team members to develop and maintain web applications',
      'Implemented new features and fixed bugs in existing applications',
      'Participated in code reviews and team meetings'
    ],
    technologies: ['Angular', 'Node.js', 'MongoDB', 'REST APIs', 'Bootstrap'],
    showProjects: true
  },
  {
    id: 1,
    company: 'Start-Up',
    position: 'Software Trainee',
    duration: 'July 2024 - Jan 2025',
    location: 'Rajapalayam, India',
    responsibilities: [
      'Gained fundamental understanding of web applications and learned HTML, CSS, and JavaScript',
      'Learned to handle JSON format in APIs and worked with frameworks like jQuery, Bootstrap, and AJAX',
      'Acquired knowledge of database management including MySQL and MongoDB',
      'Developed a full-fledged library management project',
      'Progressed to intermediate-level proficiency in Angular with hands-on experience in building SPAs'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'JSON', 'jQuery', 'MySQL', 'MongoDB', 'Node.js', 'Angular'],
    showProjects: false
  }
];

function Experience() {
  return (
    <div className="page">
      <h2 className="fw-bold mb-4 text-center">Work Experience</h2>
      <div className="timeline">
        {experiences.map((exp) => (
          <div key={exp.id} className="timeline-item">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h4 className="card-title fw-bold mb-1">{exp.position}</h4>
                    <h5 className="text-primary mb-2">{exp.company}</h5>
                  </div>
                  <div className="text-end">
                    <div className="text-muted">{exp.duration}</div>
                    <div className="small text-muted">
                      <FaMapMarkerAlt className="me-1" /> {exp.location}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <h6 className="fw-semibold mb-2">Key Responsibilities:</h6>
                  <ul className="mb-3">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="mb-1">{resp}</li>
                    ))}
                  </ul>
                  
                  <div className="mb-3">
                    <h6 className="fw-semibold d-inline me-2">Technologies:</h6>
                    {exp.technologies.map((tech, idx) => (
                      <span key={idx} className="badge bg-secondary me-2 mb-2">{tech}</span>
                    ))}
                  </div>
                  
                  {exp.showProjects && (
                    <Link 
                      to="/projects" 
                      className="btn btn-outline-primary btn-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      View Projects <FaExternalLinkAlt className="ms-1" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;