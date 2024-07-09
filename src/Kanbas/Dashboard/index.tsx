export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} />
          <div>
            <a className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/1234/Home">
              CS1234 React JS
            </a>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <a href="#/Kanbas/Courses/1234/Home"> Go </a>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} />
          <div>
            <a className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/5008/Home">
              CS5008 Data Structures
            </a>
            <p className="wd-dashboard-course-title">
              Algos Comp Systems Merged
            </p>
            <a href="#/Kanbas/Courses/5008/Home"> Go </a>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} />
          <div>
            <a className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/5002/Home">
              CS5002 Discrete Structures
            </a>
            <p className="wd-dashboard-course-title">
              Mathematical Structures and Methods
            </p>
            <a href="#/Kanbas/Courses/5002/Home"> Go </a>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} />
          <div>
            <a className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/5004/Home">
              CS5004 OOD
            </a>
            <p className="wd-dashboard-course-title">
              Object Oriented Design
            </p>
            <a href="#/Kanbas/Courses/5004/Home"> Go </a>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} />
          <div>
            <a className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/5200/Home">
              CS5200 Database Management Systems
            </a>
            <p className="wd-dashboard-course-title">
              Software System
            </p>
            <a href="#/Kanbas/Courses/5200/Home"> Go </a>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} />
          <div>
            <a className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/5800/Home">
              CS5800 Algorithms
            </a>
            <p className="wd-dashboard-course-title">
              Mathematical Tech
            </p>
            <a href="#/Kanbas/Courses/5800/Home"> Go </a>
          </div>
        </div>

        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} />
          <div>
            <a className="wd-dashboard-course-link"
              href="#/Kanbas/Courses/5001/Home">
              CS5001 Intensive Fundations of CS
            </a>
            <p className="wd-dashboard-course-title">
              Programming
            </p>
            <a href="#/Kanbas/Courses/5001/Home"> Go </a>
          </div>
        </div>
        
      </div>
    </div>
);}
