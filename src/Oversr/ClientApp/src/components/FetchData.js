import React, { Component } from 'react';

export class FetchData extends Component {
  displayName = FetchData.name

  constructor(props) {
    super(props);
    this.state = { data: [], loading: true };

    fetch('api/Data/Index')
      .then(response => response.json())
      .then(x => {
        this.setState({ data: x, loading: false });
      });
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
        : <div>{this.state.data}</div>;

    return (
      <div>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }
}
