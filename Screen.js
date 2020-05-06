import React from "react";
class Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      endDate: "",
      startDate: "",
      taskName: "",
      error: ""
    };
  }
  componentDidMount() {
    this.setState({
      projects: [
        { id: "AFG", name: "Project 1" },
        { id: "ALA", name: "Project 2" },
        { id: "ALB", name: "Project 3" }
      ]
    });
  }
  onTaskEnter = event => {
    this.setState({
      taskName: event.target.value
    });
  };
  onStartDate = event => {
    this.setState({
      startDate: event.target.value
    });
  };
  onEnddate = event => {
    this.setState({
      endDate: event.target.value
    });
  };
  onProject = event => {
    this.setState({
      project: event.target.value
    });
  };
  onProjectCreation = () => {
    const { taskName, project, endDate, startDate, error } = this.state;

    this.setState({
      isLoading: true
    });

    fetch("/api/account/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        taskName: taskName,
        project: project,
        startDate: startDate,
        endDate: endDate,
        error: error
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          this.setState({
            error: json.message,
            isLoading: false,
            taskName: "",
            project: "",
            startDate: "",
            endDate: ""
          });
        } else {
          this.setState({
            error: json.message,
            isLoading: false
          });
        }
      });
  };
  render() {
    const { projects } = this.state;
    const { taskName, endDate, startDate, error } = this.state;
    let projectsList =
      projects.length > 0 &&
      projects.map((item, i) => {
        return (
          <option key={i} value={item.id}>
            {item.name}
          </option>
        );
      }, this);

    return (
      <div style={{width: "100%", margin: "auto"}}>
      <h1>Create Your Task</h1>
      <div style={{ width: "100%", margin: "auto" ,backgroundColor:'aliceblue'}}>
        <label htmlFor="task">Enter Task</label>
        <input
          type="text"
          id="task"
          value={taskName}
          onChange={this.onTaskEnter}
          style={{
            width: "50%",
            padding: "12px 20px",
            margin: "8px 0",
            display: "inline-block",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box"
          }}
        />
        <select
          onClick={this.onProject}
          style={{
            padding: "12px 20px",
            margin: "8px 0",
            display: "inline-block",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box"
          }}
        >
          {projectsList}
        </select>
        <br></br>
        <label htmlFor="birthday">Start Date:</label>
        <input
          type="date"
          id="birthday"
          name="birthday"
          onChange={this.onStartDate}
          style={{
            padding: "12px 20px",
            margin: "8px 0",
            display: "inline-block",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box"
          }}
        />
        <label htmlFor="birthday">End Date:</label>
        <input
          type="date"
          id="birthday"
          name="birthday"
          onChange={this.onEnddate}
          style={{
            padding: "12px 20px",
            margin: "8px 0",
            display: "inline-block",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box"
          }}
        />
        <button
          onClick={this.onProjectCreation}
          style={{
            padding: "12px 20px",
            margin: "8px 0",
            display: "inline-block",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box"
          }}
        >
          Create Task
        </button>
      </div>
      </div>
    );
  }
}
export default Screen;
