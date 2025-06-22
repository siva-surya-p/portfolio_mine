import profilePic from '../assets/profile.jpg'
import resumePDF from '../assets/resume.pdf'

function Home() {
  return (
    <div className="page d-flex flex-column align-items-center justify-content-center text-center">
      <div className="mb-4">
        <img src={profilePic} alt="Profile" className="rounded-circle shadow" style={{ width: 140, height: 140, objectFit: 'cover', border: '4px solid var(--primary)' }} />
      </div>
      <h1 className="fw-bold mb-2">Siva Surya P</h1>
      <p className="lead mb-4">Software Developer | Learned and worked in a Start-Up | AI Enthusiast</p>
      <a href={resumePDF} download className="btn btn-primary btn-lg fw-semibold">
        Download Resume
      </a>
    </div>
  )
}

export default Home 