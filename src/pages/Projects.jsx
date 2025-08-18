function Projects() {
  const projects = [
    {
      name: 'LURNZY',
      role: 'Backend Developer',
      duration: 'Mar 2025 - Apr 2025',
      description: 'A comprehensive learning management system with course and batch management capabilities.',
      responsibilities: [
        ' Designed and optimized RESTful APIs using Node.js and MongoDB for course and batchmanagement, reducing DB load by 30%.',
        ' Developed and integrated intelligent dropdowns powered by dynamic query parameters, in collaboration with UI/UX teams, to align the backend logic with intuitive front-end interfaces - reducing the completion time of admin tasks by 35% anddecreasing data entry errors by 25%, resulting in faster and more accurate workflows.'
        ],
      techStack: ['Angular 18', 'Node.js 18', 'MongoDB 10', 'REST APIs','Bootstrap']
    },
    {
      name: 'SWMS',
      role: 'Frontend Developer',
      duration: 'Feb 2025 - Mar 2025',
      description: 'A web application with optimized user interface and experience.',
      responsibilities: [
        'Built dynamic, responsive UI components in Angular using lazy loading and optimized change detection — reduced page load time by 25% and improved performance for smoother user experiences.',
        'Refactored and modernized legacy codebase, removing redundant logic and applying best practices — resolved 50+ critical bugs, boosting stability by 40% and cutting production incidents by 30%.',
        ' Implemented Angular services, optimized routing, and applied two-way data binding — increased user interaction speed by 20% and improved application responsiveness.'
      ],
      techStack: ['Angular 9', 'Node.js 14', 'MySQL', 'Bootstrap']
    }
  ]

  return (
    <div id="projects" className="page">
      <h2 className="fw-bold mb-4 text-center">Projects</h2>
      <div className="row g-4 justify-content-center">
        {projects.map((project, index) => (
          <div className="col-12 col-lg-10" key={index}>
            <div className="card h-100 shadow-sm p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h3 className="fw-bold mb-1">{project.name}</h3>
                  <p className="text-muted mb-2">{project.role} • {project.duration}</p>
                </div>
                <span className="badge bg-primary">{project.techStack[0]}</span>
              </div>
              <p className="mb-3">{project.description}</p>
              <h6 className="fw-semibold mb-2">Key Responsibilities:</h6>
              <ul className="mb-3">
                {project.responsibilities.map((item, i) => (
                  <li key={i} className="mb-1">{item}</li>
                ))}
              </ul>
              <div className="mt-2">
                <h6 className="fw-semibold d-inline me-2">Tech Stack:</h6>
                {project.techStack.map((tech, i) => (
                  <span key={i} className="badge bg-secondary me-2 mb-2">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects