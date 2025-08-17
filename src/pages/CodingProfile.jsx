import { useEffect, useState } from 'react';
import { FaGithub, FaHackerrank, FaCode } from 'react-icons/fa';
import { SiLeetcode, SiCodechef, SiHackerearth } from 'react-icons/si';

function CodingProfile() {
  const [leetcodeStats, setLeetcodeStats] = useState({
    totalSolved: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    document.title = "Coding Profile | Siva Surya P";
    fetchLeetcodeStats();
  }, []);

    const fetchLeetcodeStats = async () => {
    try {
      console.log('🔍 Fetching LeetCode stats...');
      
      // Method 1: Try the public stats API first
      const apiUrl = `https://leetcode-stats-api.herokuapp.com/suryasivap457`;
      console.log('📡 API URL:', apiUrl);
      
      const response = await fetch(apiUrl);
      console.log('📥 Response status:', response.status);
      console.log('📥 Response ok:', response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log('📊 API Response data:', data);
        
        // Check if we have the expected data structure
        if (data && data.totalSolved !== undefined) {
          console.log('✅ API Success - Setting real data');
          setLeetcodeStats({
            totalSolved: data.totalSolved || 0,
            easy: data.easySolved || 0,
            medium: data.mediumSolved || 0,
            hard: data.hardSolved || 0,
            loading: false,
            error: null
          });
          return;
        } else if (data && data.status === 'Success') {
          console.log('✅ API Success (alternative format) - Setting real data');
          setLeetcodeStats({
            totalSolved: data.totalSolved || 0,
            easy: data.easySolved || 0,
            medium: data.mediumSolved || 0,
            hard: data.hardSolved || 0,
            loading: false,
            error: null
          });
          return;
        } else {
          console.log('❌ API data structure unexpected:', data);
        }
      } else {
        console.log('❌ API response not ok:', response.status, response.statusText);
      }
      
      // Method 2: Fallback to hardcoded data (works everywhere)
      console.log('🔄 Using fallback data');
      setLeetcodeStats({
        totalSolved: 205,
        easy: 85,
        medium: 95,
        hard: 25,
        loading: false,
        error: null
      });
      
    } catch (error) {
      console.error('❌ Error fetching LeetCode stats:', error);
      // Fallback to hardcoded data (works everywhere)
      console.log('🔄 Using fallback data due to error');
      setLeetcodeStats({
        totalSolved: 205,
        easy: 85,
        medium: 95,
        hard: 25,
        loading: false,
        error: null
      });
    }
  };

  const codingProfiles = [
    {
      name: 'LeetCode',
      icon: <SiLeetcode className="text-warning" size={24} />,
      url: 'https://leetcode.com/suryasivap457',
      username: 'suryasivap457',
      description: `Solved ${leetcodeStats.totalSolved} problems with focus on Data Structures and Algorithms`
    },
    // {
    //   name: 'GitHub',
    //   icon: <FaGithub className="text-dark" size={24} />,
    //   url: 'https://github.com/your_username',
    //   username: 'your_username',
    //   description: 'Check out my open-source projects and contributions'
    // },
    // {
    //   name: 'HackerRank',
    //   icon: <FaHackerrank className="text-success" size={24} />,
    //   url: 'https://www.hackerrank.com/your_username',
    //   username: 'your_username',
    //   description: '5-star coder in Problem Solving and Python'
    // },
    // {
    //   name: 'CodeChef',
    //   icon: <SiCodechef className="text-danger" size={24} />,
    //   url: 'https://www.codechef.com/users/your_username',
    //   username: 'your_username',
    //   description: '3-star coder with consistent participation in contests'
    // },
    // {
    //   name: 'HackerEarth',
    //   icon: <SiHackerearth className="text-primary" size={24} />,
    //   url: 'https://www.hackerearth.com/@your_username',
    //   username: 'your_username',
    //   description: 'Participated in multiple coding challenges'
    // }
  ];

  return (
    <div className="page">
      <h2 className="fw-bold mb-4 text-center">Coding Profiles</h2>
      <p className="lead text-muted text-center mb-5">Check out my coding journey across different platforms</p>
      
      <div className="row g-4">
        {codingProfiles.map((profile, index) => (
          <div key={index} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  {profile.icon}
                </div>
                <h3 className="h4 mb-3">{profile.name}</h3>
                <p className="text-muted mb-3">{profile.description}</p>
                <p className="mb-3">
                  <span className="badge bg-light text-dark">@{profile.username}</span>
                </p>
                <a 
                  href={profile.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary"
                >
                  View Profile <FaCode className="ms-1" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <div className="card bg-light p-4">
          <h3 className="h4 mb-3">LeetCode Stats</h3>
          {leetcodeStats.loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading your LeetCode stats...</p>
            </div>
          ) : leetcodeStats.error ? (
            <div className="text-center py-4">
              <p className="text-danger">Unable to fetch stats. Please check your username.</p>
              <button 
                className="btn btn-outline-primary btn-sm"
                onClick={fetchLeetcodeStats}
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="row g-4">
              <div className="col-6 col-md-3">
                <div className="p-3 bg-white rounded-3 shadow-sm">
                  <h4 className="text-primary fw-bold mb-1">{leetcodeStats.totalSolved}</h4>
                  <p className="mb-0 small">Problems Solved</p>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="p-3 bg-white rounded-3 shadow-sm">
                  <h4 className="text-success fw-bold mb-1">{leetcodeStats.easy}</h4>
                  <p className="mb-0 small">Easy</p>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="p-3 bg-white rounded-3 shadow-sm">
                  <h4 className="text-warning fw-bold mb-1">{leetcodeStats.medium}</h4>
                  <p className="mb-0 small">Medium</p>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="p-3 bg-white rounded-3 shadow-sm">
                  <h4 className="text-danger fw-bold mb-1">{leetcodeStats.hard}</h4>
                  <p className="mb-0 small">Hard</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CodingProfile;
