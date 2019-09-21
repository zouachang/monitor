import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    user: [],
    success: false,
    count: 0,
    error: null,
    intervalIsSet: false
  };

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 10000);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    fetch('http://3.14.88.154:3001/api/getUser')
      .then((data) => data.json())
      .then((res) => this.setState({ success: res.success, user: res.user, count: res.count }));
  };

  render() {
    const { user, count, success, error} = this.state;
    return (
      <div>
        <div className="App-error">{!success && !error ? error : ''}</div>
        <div>Total User: {count}</div>
        <ul>
          {user.length <= 0
            ? 'NO DB ENTRIES YET'
            : user.map((u, index) => (
              <li style={{ padding: '10px' }} key={u.userId}>
                <span>{index + 1}: </span>
                <span style={{ color: 'gray' }}> User ID: </span> {u.userId}
                <span style={{ color: 'gray' }}> Phone: </span> {u.phone}
                <span style={{ color: 'gray' }}> Email: </span> {u.mail}
                <span style={{ color: 'gray' }}> Time: </span> {u.createdAt}
              </li>
              ))}
        </ul>
      </div>
    );
  }
}

export default App;