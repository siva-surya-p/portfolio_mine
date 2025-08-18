import { useEffect, useState } from 'react';
import { FaGithub, FaCode } from 'react-icons/fa';
import GitHubCalendar from 'react-github-calendar';

// Simple GitHub Profile Component
function GitHubProfile() {
  const [githubStats, setGithubStats] = useState({
    publicRepos: 0,
    followers: 0,
    following: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    document.title = "GitHub Profile | Siva Surya P";
    fetchGithubStats();
  }, []);

  const fetchGithubStats = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/siva-surya-p`);
      if (response.ok) {
        const data = await response.json();
        setGithubStats({
          publicRepos: data.public_repos || 0,
          followers: data.followers || 0,
          following: data.following || 0,
          loading: false,
          error: null
        });
      } else {
        throw new Error('Failed to fetch GitHub stats');
      }
    } catch (error) {
      console.error('GitHub stats error:', error);
      setGithubStats(prev => ({ ...prev, loading: false, error: error.message }));
    }
  };
  
  return (
    <div className="page mt-0 pt-4">
      <div className="text-center mb-4">
        <FaGithub size={40} className="mb-2" />
        <h2 className="fw-bold mb-1">GitHub Profile</h2>
        <p className="text-muted mb-3">My open-source contributions and repositories</p>
        {githubStats.error && (
          <div className="alert alert-warning mb-3">
            {githubStats.error}
          </div>
        )}
      </div>
      
      <div className="card shadow-sm mb-3">
        <div className="card-body text-center p-4">
          <div className="d-flex justify-content-center gap-4 mb-4">
            <div className="text-center">
              <div className="h4 fw-bold">{githubStats.publicRepos}</div>
              <div className="text-muted">Repositories</div>
            </div>
            <div className="text-center">
              <div className="h4 fw-bold">{githubStats.followers}</div>
              <div className="text-muted">Followers</div>
            </div>
            <div className="text-center">
              <div className="h4 fw-bold">{githubStats.following}</div>
              <div className="text-muted">Following</div>
            </div>
          </div>
          
          <a 
            href="https://github.com/siva-surya-p" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-dark mb-4"
          >
            <FaGithub className="me-2" /> View on GitHub
          </a>
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-4">Contribution Activity</h5>
          <div className="d-flex justify-content-center">
            {githubStats.loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2 mb-0">Loading contribution data...</p>
              </div>
            ) : (
              <GitHubCalendar 
                username="siva-surya-p"
                transformData={data => {
                  // Filter to only include the last 365 days
                  const oneYearAgo = new Date();
                  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
                  return data.filter(day => new Date(day.date) >= oneYearAgo);
                }}
                fontSize={12}
                blockSize={12}
                blockMargin={4}
                blockRadius={4}
                colorScheme="light"
              />
            )}
          </div>
        </div>
      </div>

      <div className="card shadow-sm mt-3">
        <div className="card-body">
          <h5 className="card-title mb-4">Featured Repositories</h5>
          <div className="text-center py-4">
            <p>Coming soon! Featured repositories will be displayed here.</p>
            <a 
              href="https://github.com/siva-surya-p?tab=repositories" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-outline-dark"
            >
              <FaCode className="me-2" /> View All Repositories
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GitHubProfile;
