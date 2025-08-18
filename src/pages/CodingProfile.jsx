import { useEffect, useState } from 'react';
import { FaHackerrank, FaCode } from 'react-icons/fa';
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si';

function CodingProfile() {
  const [leetcodeStats, setLeetcodeStats] = useState({
    totalSolved: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    loading: true,
    error: null
  });

  const [gfgStats, setGfgStats] = useState({
    totalSolved: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    school: 0,
    basic: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    document.title = "Coding Profile | Siva Surya P";
    fetchLeetcodeStats();
    fetchGfgStats();
  }, []);

    const fetchLeetcodeStats = async () => {
    try {
      // Method 1: Try the public stats API first
      const apiUrl = `https://leetcode-stats-api.herokuapp.com/suryasivap457`;
      const response = await fetch(apiUrl);
      
      if (response.ok) {
        const data = await response.json();
        
        // Check if we have the expected data structure
        if (data && data.totalSolved !== undefined) {
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
          setLeetcodeStats({
            totalSolved: data.totalSolved || 0,
            easy: data.easySolved || 0,
            medium: data.mediumSolved || 0,
            hard: data.hardSolved || 0,
            loading: false,
            error: null
          });
          return;
        }
      }
      
      // Method 2: Fallback to hardcoded data (works everywhere)
      setLeetcodeStats({
        totalSolved: 205,
        easy: 85,
        medium: 95,
        hard: 25,
        loading: false,
        error: null
      });
      
    } catch (error) {
      // Fallback to hardcoded data (works everywhere)
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

  const fetchGfgStats = async () => {
    try {
      const apiUrl = `https://geeks-for-geeks-stats-api.vercel.app/?raw=y&userName=suryasicwgu`;
      const response = await fetch(apiUrl);
      
      if (response.ok) {
        const data = await response.json();
        if (data && data.totalProblemsSolved !== undefined) {
          setGfgStats({
            totalSolved: data.totalProblemsSolved || 0,
            easy: data.Easy || 0,
            medium: data.Medium || 0,
            hard: data.Hard || 0,
            school: data.School || 0,
            basic: data.Basic || 0,
            loading: false,
            error: null
          });
          return;
        }
      }
      // Fallback to hardcoded data if API fails
      setGfgStats({ totalSolved: 0, easy: 0, medium: 0, hard: 0, school: 0, basic: 0, loading: false, error: 'Failed to fetch GFG stats' });
    } catch (error) {
      setGfgStats({ totalSolved: 0, easy: 0, medium: 0, hard: 0, school: 0, basic: 0, loading: false, error: 'Failed to fetch GFG stats' });
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
    {
      name: 'GeeksforGeeks',
      icon: <SiGeeksforgeeks className="text-success" size={24} />,
      url: 'https://www.geeksforgeeks.org/user/suryasicwgu/',
      username: 'suryasicwgu',
      description: `Solved ${gfgStats.totalSolved} problems across various difficulty levels`
    },
    // {
    //   name: 'HackerRank',
    //   icon: <FaHackerrank className="text-success" size={24} />,
    //   url: 'https://www.hackerrank.com/profile/suryasivap457',
    //   username: 'suryasivap457',
    //   description: '5-star coder in Problem Solving and Python'
    // }
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
          <div key={index} className={profile.name === 'GitHub' ? 'col-12' : 'col-md-6'}>
            <div className="card h-100 shadow-sm">
              <div className="card-body p-4">
                <div className="text-center">
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
                    className="btn btn-outline-primary mb-3"
                  >
                    View Profile <FaCode className="ms-1" />
                  </a>
                </div>
                
                {/* GFG Stats within the tile */}
                {profile.name === 'GeeksforGeeks' && (
                  <div className="mt-3 pt-3 border-top text-center">
                    <h6 className="fw-semibold mb-3">GFG Stats</h6>
                    <div className="d-flex justify-content-around align-items-center mb-3">
                      <div>
                        <h5 className="fw-bold mb-0">{gfgStats.totalSolved}</h5>
                        <small className="text-muted">Total Solved</small>
                      </div>
                    </div>
                    <div className="row g-2 text-center">
                      <div className="col-4">
                        <div className="p-2 bg-info bg-opacity-10 rounded">
                          <div className="fw-bold text-info">{gfgStats.school}</div>
                          <small className="text-muted">School</small>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="p-2 bg-primary bg-opacity-10 rounded">
                          <div className="fw-bold text-primary">{gfgStats.basic}</div>
                          <small className="text-muted">Basic</small>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="p-2 bg-success bg-opacity-10 rounded">
                          <div className="fw-bold text-success">{gfgStats.easy}</div>
                          <small className="text-muted">Easy</small>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="p-2 bg-warning bg-opacity-10 rounded">
                          <div className="fw-bold text-warning">{gfgStats.medium}</div>
                          <small className="text-muted">Medium</small>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="p-2 bg-danger bg-opacity-10 rounded">
                          <div className="fw-bold text-danger">{gfgStats.hard}</div>
                          <small className="text-muted">Hard</small>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* LeetCode Stats within the tile */}
                {profile.name === 'LeetCode' && (
                  <div className="mt-3 pt-3 border-top text-center">
                    <h6 className="fw-semibold mb-3">LeetCode Stats</h6>
                    <div className="d-flex justify-content-around align-items-center mb-3">
                      <div>
                        <h5 className="fw-bold mb-0">{leetcodeStats.totalSolved}</h5>
                        <small className="text-muted">Total Solved</small>
                      </div>
                    </div>
                    <div className="row g-2 text-center">
                      <div className="col-4">
                        <div className="p-2 bg-success bg-opacity-10 rounded">
                          <div className="fw-bold text-success">{leetcodeStats.easy}</div>
                          <small className="text-muted">Easy</small>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="p-2 bg-warning bg-opacity-10 rounded">
                          <div className="fw-bold text-warning">{leetcodeStats.medium}</div>
                          <small className="text-muted">Medium</small>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="p-2 bg-danger bg-opacity-10 rounded">
                          <div className="fw-bold text-danger">{leetcodeStats.hard}</div>
                          <small className="text-muted">Hard</small>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* GitHub Calendar */}
                {profile.extraContent && (
                  <div className="mt-4 pt-3 border-top">
                    {profile.extraContent}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default CodingProfile;
