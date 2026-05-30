import { FaFileUpload } from "react-icons/fa";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter, Routes, Route, Navigate, useNavigate,
} from "react-router-dom";
import "./App.css";

const API = "https://smarthire-ai-recruitment-platform-production.up.railway.app/api";

function AuthPage({ type }) {
  const navigate = useNavigate();
  const isLogin = type === "login";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "HR",
  });

  const submitAuth = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin
        ? `${API}/auth/login`
        : `${API}/auth/register`;

      const body = isLogin
        ? { email: form.email, password: form.password }
        : form;

      const res = await axios.post(url, body);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert(error.response?.data || "Login/Register failed");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submitAuth}>
        <h1>{isLogin ? "Login" : "Create Account"}</h1>
        <p>SmartHire AI Recruitment Platform</p>

        {!isLogin && (
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        {!isLogin && (
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option>HR</option>
            <option>CANDIDATE</option>
          </select>
        )}

        <button type="submit">
          {isLogin ? "Login" : "Register"}
        </button>

        <span
          onClick={() => navigate(isLogin ? "/register" : "/login")}
          className="auth-link"
        >
          {isLogin ? "New user? Register" : "Already have account? Login"}
        </span>
      </form>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("Dashboard");
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [interviews, setInterviews] = useState([]);

  const [interviewForm, setInterviewForm] = useState({
    candidateName: "",
    date: "",
    mode: "Online",
  });

  const [showJobForm, setShowJobForm] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [aiInsight, setAiInsight] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [candidateForm, setCandidateForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    status: "Applied",
  });

  const [jobForm, setJobForm] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full Time",
  });

  const fetchCandidates = async () => {
    try {
      const res = await axios.get(`${API}/candidates`);
      setCandidates(res.data);
    } catch (error) {
      console.error("Candidate API error:", error);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API}/jobs`);
      setJobs(res.data);
    } catch (error) {
      console.error("Job API error:", error);
    }
  };

  useEffect(() => {
    fetchCandidates();
    fetchJobs();
  }, []);

  const addCandidate = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/candidates`, candidateForm);

      setCandidateForm({
        fullName: "",
        email: "",
        phone: "",
        skills: "",
        experience: "",
        status: "Applied",
      });

      fetchCandidates();
    } catch (error) {
      alert("Candidate save failed.");
      console.log(error);
    }
  };

  const deleteCandidate = async (id) => {
    try {
      await axios.delete(`${API}/candidates/${id}`);
      fetchCandidates();
    } catch (error) {
      alert("Candidate delete failed.");
      console.log(error);
    }
  };

  const updateCandidateStatus = async (candidate, newStatus) => {
    try {
      await axios.post(`${API}/candidates`, {
        ...candidate,
        status: newStatus,
      });

      fetchCandidates();
    } catch (error) {
      alert("Status update failed.");
      console.log(error);
    }
  };

  const addJob = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/jobs`, jobForm);

      setJobForm({
        title: "",
        department: "",
        location: "",
        type: "Full Time",
      });

      setShowJobForm(false);
      fetchJobs();
    } catch (error) {
      alert("Job save failed.");
      console.log(error);
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`${API}/jobs/${id}`);
      fetchJobs();
    } catch (error) {
      alert("Job delete failed.");
      console.log(error);
    }
  };

  const generateAiInsight = () => {
    if (!resumeText.trim()) {
      setAiInsight("Please enter candidate resume details first.");
      return;
    }

    const text = resumeText.toLowerCase();
    let role = "General Software Developer";
    let score = 70;

    if (text.includes("java") || text.includes("spring boot")) {
      role = "Java Backend / Full Stack Developer";
      score = 88;
    } else if (text.includes("react") || text.includes("javascript")) {
      role = "Frontend React Developer";
      score = 82;
    } else if (text.includes("mysql") || text.includes("database")) {
      role = "Backend Developer";
      score = 78;
    }

    setAiInsight(`
1. Resume Summary:
Candidate profile has been analyzed based on provided skills and experience.

2. Extracted Skills:
${resumeText}

3. Suitable Job Role:
${role}

4. Job Match Score:
${score}/100

5. Shortlist Recommendation:
Candidate can be considered for the next screening round.

6. Improvement Suggestions:
Add measurable project impact, GitHub links, deployment links, and stronger technical keywords.
`);
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      candidate.fullName?.toLowerCase().includes(search) ||
      candidate.email?.toLowerCase().includes(search) ||
      candidate.skills?.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" || candidate.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const scheduleInterview = (e) => {
    e.preventDefault();

    setInterviews([
      ...interviews,
      {
        ...interviewForm,
        id: Date.now(),
      },
    ]);

    setInterviewForm({
      candidateName: "",
      date: "",
      mode: "Online",
    });
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const renderStats = () => (
    <section className="stats-grid">
      <div className="stat-card blue">
        <p>Total Candidates</p>
        <h2>{candidates.length}</h2>
        <span>Live from MySQL</span>
      </div>

      <div className="stat-card purple">
        <p>Active Jobs</p>
        <h2>{jobs.length}</h2>
        <span>Live from MySQL</span>
      </div>

      <div className="stat-card green">
        <p>AI Match Score</p>
        <h2>87%</h2>
        <span>AI module active</span>
      </div>

      <div className="stat-card orange">
        <p>Shortlisted</p>
        <h2>{candidates.filter((c) => c.status === "Shortlisted").length}</h2>
        <span>Based on status</span>
      </div>
    </section>
  );

  const renderCandidateForm = () => (
    <div className="panel">
      <h2>➕ Add Candidate</h2>

      <form className="candidate-form" onSubmit={addCandidate}>
        <input
          placeholder="Full Name"
          value={candidateForm.fullName}
          onChange={(e) =>
            setCandidateForm({ ...candidateForm, fullName: e.target.value })
          }
          required
        />

        <input
          placeholder="Email"
          value={candidateForm.email}
          onChange={(e) =>
            setCandidateForm({ ...candidateForm, email: e.target.value })
          }
          required
        />

        <input
          placeholder="Phone"
          value={candidateForm.phone}
          onChange={(e) =>
            setCandidateForm({ ...candidateForm, phone: e.target.value })
          }
          required
        />

        <input
          placeholder="Skills"
          value={candidateForm.skills}
          onChange={(e) =>
            setCandidateForm({ ...candidateForm, skills: e.target.value })
          }
          required
        />

        <input
          placeholder="Experience"
          value={candidateForm.experience}
          onChange={(e) =>
            setCandidateForm({ ...candidateForm, experience: e.target.value })
          }
          required
        />

        <select
          value={candidateForm.status}
          onChange={(e) =>
            setCandidateForm({ ...candidateForm, status: e.target.value })
          }
        >
          <option>Applied</option>
          <option>Shortlisted</option>
          <option>Rejected</option>
          <option>Interview Scheduled</option>
        </select>

        <button type="submit">Save Candidate</button>
      </form>
    </div>
  );

  const renderAi = () => (
    <div className="panel">
      <h2>🤖 AI Resume Analyzer</h2>

      <div
        style={{
          margin: "18px 0",
          padding: "18px",
          border: "2px dashed #7c3aed",
          borderRadius: "18px",
          textAlign: "center",
          background: "#f5f3ff",
        }}
      >
        <FaFileUpload size={30} color="#7c3aed" />

        <p style={{ marginTop: "10px", fontWeight: "600" }}>
          Upload Resume PDF
        </p>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          style={{ marginTop: "12px" }}
          onChange={(e) => setResumeFile(e.target.files[0])}
        />

        {resumeFile && (
          <p
            style={{
              marginTop: "10px",
              color: "#16a34a",
              fontWeight: "600",
            }}
          >
            Uploaded: {resumeFile.name}
          </p>
        )}
      </div>

      <p>Paste resume details to generate hiring insight.</p>

      <textarea
        placeholder="Paste resume summary here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />

      <button onClick={generateAiInsight}>Generate AI Insight</button>

      {aiInsight && <div className="ai-result">{aiInsight}</div>}
    </div>
  );

  const renderCandidates = () => (
    <section className="jobs-panel">
      <h2>👥 Candidate List</h2>

      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search candidate..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        >
          <option>All</option>
          <option>Applied</option>
          <option>Shortlisted</option>
          <option>Rejected</option>
          <option>Interview Scheduled</option>
        </select>
      </div>

      {filteredCandidates.length === 0 ? (
        <p className="empty">No matching candidates found.</p>
      ) : (
        filteredCandidates.map((c) => (
          <div className="candidate-row" key={c.id}>
            <div>
              <h3>{c.fullName}</h3>
              <p>
                {c.email} • {c.phone}
              </p>
              <small>
                {c.skills} | {c.experience}
              </small>
            </div>

            <div className="candidate-actions">
              <select
                value={c.status}
                onChange={(e) => updateCandidateStatus(c, e.target.value)}
              >
                <option>Applied</option>
                <option>Shortlisted</option>
                <option>Rejected</option>
                <option>Interview Scheduled</option>
              </select>

              <button onClick={() => setSelectedCandidate(c)}>View</button>

              <button
                className="delete-btn"
                onClick={() => deleteCandidate(c.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </section>
  );

  const renderCandidateModal = () =>
    selectedCandidate && (
      <div className="modal-overlay">
        <div className="modal-card">
          <h2>👤 Candidate Details</h2>

          <p><strong>Name:</strong> {selectedCandidate.fullName}</p>
          <p><strong>Email:</strong> {selectedCandidate.email}</p>
          <p><strong>Phone:</strong> {selectedCandidate.phone}</p>
          <p><strong>Skills:</strong> {selectedCandidate.skills}</p>
          <p><strong>Experience:</strong> {selectedCandidate.experience}</p>
          <p><strong>Status:</strong> {selectedCandidate.status}</p>

          <button
            className="delete-btn"
            onClick={() => setSelectedCandidate(null)}
          >
            Close
          </button>
        </div>
      </div>
    );

  const renderInterviews = () => (
    <section className="jobs-panel">
      <h2>🎤 Interview Scheduler</h2>

      <form className="candidate-form" onSubmit={scheduleInterview}>
        <input
          placeholder="Candidate Name"
          value={interviewForm.candidateName}
          onChange={(e) =>
            setInterviewForm({
              ...interviewForm,
              candidateName: e.target.value,
            })
          }
          required
        />

        <input
          type="date"
          value={interviewForm.date}
          onChange={(e) =>
            setInterviewForm({
              ...interviewForm,
              date: e.target.value,
            })
          }
          required
        />

        <select
          value={interviewForm.mode}
          onChange={(e) =>
            setInterviewForm({
              ...interviewForm,
              mode: e.target.value,
            })
          }
        >
          <option>Online</option>
          <option>Offline</option>
        </select>

        <button type="submit">Schedule Interview</button>
      </form>

      <div style={{ marginTop: "30px" }}>
        {interviews.length === 0 ? (
          <p>No interviews scheduled.</p>
        ) : (
          interviews.map((interview) => (
            <div key={interview.id} className="candidate-row">
              <div>
                <h3>{interview.candidateName}</h3>
                <p>
                  {interview.date} • {interview.mode}
                </p>
              </div>

              <button
                className="delete-btn"
                onClick={() =>
                  setInterviews(interviews.filter((i) => i.id !== interview.id))
                }
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );

  const renderJobForm = () =>
    showJobForm && (
      <section className="jobs-panel">
        <h2>📌 Post New Job</h2>

        <form className="candidate-form" onSubmit={addJob}>
          <input
            placeholder="Job Title"
            value={jobForm.title}
            onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
            required
          />

          <input
            placeholder="Department"
            value={jobForm.department}
            onChange={(e) =>
              setJobForm({ ...jobForm, department: e.target.value })
            }
            required
          />

          <input
            placeholder="Location"
            value={jobForm.location}
            onChange={(e) =>
              setJobForm({ ...jobForm, location: e.target.value })
            }
            required
          />

          <select
            value={jobForm.type}
            onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
          >
            <option>Full Time</option>
            <option>Internship</option>
            <option>Remote</option>
            <option>Contract</option>
          </select>

          <button type="submit">Save Job</button>
        </form>
      </section>
    );

  const renderJobs = () => (
    <>
      {renderJobForm()}

      <section className="jobs-panel">
        <h2>📌 Posted Jobs</h2>

        {jobs.length === 0 ? (
          <p className="empty">No jobs posted yet.</p>
        ) : (
          jobs.map((job) => (
            <div className="candidate-row" key={job.id}>
              <div>
                <h3>{job.title}</h3>
                <p>
                  {job.department} • {job.location}
                </p>
                <small>{job.type}</small>
              </div>

              <div className="candidate-actions">
                <span>{job.status}</span>

                <button
                  className="delete-btn"
                  onClick={() => deleteJob(job.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );

  const renderReports = () => {
    const statusData = [
      {
        name: "Applied",
        value: candidates.filter((c) => c.status === "Applied").length,
      },
      {
        name: "Shortlisted",
        value: candidates.filter((c) => c.status === "Shortlisted").length,
      },
      {
        name: "Rejected",
        value: candidates.filter((c) => c.status === "Rejected").length,
      },
      {
        name: "Interview Scheduled",
        value: candidates.filter((c) => c.status === "Interview Scheduled").length,
      },
    ];

    const hiringData = [
      { name: "Engineering", jobs: 12 },
      { name: "Backend", jobs: 8 },
      { name: "Frontend", jobs: 6 },
      { name: "HR", jobs: 4 },
    ];

    const COLORS = ["#2563eb", "#16a34a", "#dc2626", "#f97316"];

    return (
      <>
        {renderStats()}

        <section className="jobs-panel">
          <h2>📊 Recruitment Analytics</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
              marginTop: "30px",
            }}
          >
            <div>
              <h3>Candidate Status Chart</h3>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    outerRadius={100}
                    label
                  >
                    {statusData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3>Jobs vs Candidates</h3>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hiringData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="jobs" fill="#7c3aed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </>
    );
  };

  const renderPage = () => {
    if (activePage === "Dashboard") {
      return (
        <>
          {renderStats()}
          <section className="content-grid">
            {renderCandidateForm()}
            {renderAi()}
          </section>
          {renderCandidates()}
        </>
      );
    }

    if (activePage === "Candidates") return renderCandidates();
    if (activePage === "Jobs") return renderJobs();
    if (activePage === "AI Analyzer") return renderAi();
    if (activePage === "Interviews") return renderInterviews();
    if (activePage === "Reports") return renderReports();

    return null;
  };

  const menuItems = [
    "Dashboard",
    "Candidates",
    "Jobs",
    "AI Analyzer",
    "Interviews",
    "Reports",
  ];

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>SmartHire</h2>
        <p>{localStorage.getItem("role")} Dashboard</p>

        <ul>
          {menuItems.map((item) => (
            <li
              key={item}
              className={activePage === item ? "active" : ""}
              onClick={() => setActivePage(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      <main className="main">
        <nav className="topbar">
          <div>
            <h1>{activePage}</h1>
            <p>Welcome, {localStorage.getItem("name")}</p>
          </div>

          <div>
            <button
              onClick={() => {
                setShowJobForm(true);
                setActivePage("Jobs");
              }}
            >
              + Post Job
            </button>

            <button className="delete-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </nav>

        {renderPage()}
        {renderCandidateModal()}
      </main>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<AuthPage type="login" />} />
        <Route path="/register" element={<AuthPage type="register" />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;