export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr><br />



        <label htmlFor="wd-group"> Assignment Group </label>
        <select id="wd-group">
          <option value="ASSIGNMENTS">ASSIGNMENTS</option>
          <option value="PROGECTS">PROGECTS</option>
        </select><br /><br />


        <label htmlFor="wd-display-grade-as"> Display Grade as </label>
        <select id="wd-display-grade-as">
          <option value="PERCENTAGE">percentage</option>
          <option value="LETTER">letter grade</option>
          <option value="PASS">pass/no pass</option>
        </select><br /><br />


        <label htmlFor="wd-submission-type"> Submission Type </label>
        <select id="wd-submission-type">
          <option value="ONLINE">online</option>
          <option value="PERSON">in person</option>
        </select><br /><br />


        <label htmlFor="wd-due-date"> Due </label><br />
        <input type="date"
          id="wd-due-date"
          value="2000-01-21" /><br /><br />

        <label htmlFor="wd-available-from"> Available from </label>
        <input type="date"
          id="wd-available-from"
          value="2000-01-21" />


        <label htmlFor="wd-available-until"> Until </label>
        <input type="date"
          id="wd-available-until"
          value="2000-01-21" /><br /><br />



      </table>
    </div>
  );
}
