export default function Modules() {
  return (
    <div>
      <div className="button-container">
        <button onClick={() => alert("Button 1 Clicked!")} type="button">
          Collapse
        </button>
        <button onClick={() => alert("Button 2 Clicked!")} type="button">
          View Progress
        </button>
        <button onClick={() => alert("Button 3 Clicked!")} type="button">
          Publish All
        </button>
      </div>

      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
