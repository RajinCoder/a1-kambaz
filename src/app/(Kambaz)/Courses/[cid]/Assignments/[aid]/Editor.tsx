export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />{" "}
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assgn">Assignment Group</label>
            </td>
            <td>
              <select id="wd-assgn" name="selectedAssgn">
                <option value="option1">ASSIGNMENTS</option>
                <option value="option2">ASSIGNMENTS</option>
                <option value="option3">ASSIGNMENTS</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-grade">Display Grade as</label>
            </td>
            <td>
              <select id="wd-grade" name="selectedGrade">
                <option value="option1">Percentage</option>
                <option value="option2">Decimal</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-sub">Submission Type</label>
            </td>
            <td>
              <select id="wd-sub" name="selectedSub">
                <option value="option1">online</option>
                <option value="option2">in person</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <label id="wd-checkboxes">Online Entry Options</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-text" />
      <label htmlFor="wd-chkbox-text">Text Entry</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-web" />
      <label htmlFor="wd-chkbox-web">Website URL</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-media" />
      <label htmlFor="wd-chkbox-media">Media Recordings</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-student" />
      <label htmlFor="wd-chkbox-student">Student Annotation</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-file" />
      <label htmlFor="wd-chkbox-file">File Uploads</label>

      <br />
      <br />

      <label>Assign Assign to</label>
      <input type="text" />
      <br />
      <label>Due</label>
      <br />
      <input type="date" defaultValue="2024-05-13" id="wd-text-fields-dob" />
      <br />

      <label>Available from</label>
      <br />
      <input type="date" defaultValue="2024-05-06" id="wd-text-fields-dob" />

      <br />
      <label>Until</label>
      <br />
      <input type="date" defaultValue="2024-05-20" id="wd-text-fields-dob" />

      <button>save</button>
      <button>cancel</button>
    </div>
  );
}
