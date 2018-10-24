import React, { Component } from "react";
import { fetchWithAuth } from "../fetch";
import { Button, Form, TextArea, Dimmer, Loader } from "semantic-ui-react";

class ArtistForm extends Component {
  constructor(props) {
    super(props);

    const loading = this.props.artistId ? true : false;

    this.name = "";
    this.detail = "";
    this.getArtist = this.getArtist.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDetailChange = this.handleDetailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { originalName: "", originalDetail: "", loading: loading };
  }

  componentDidMount() {
    if (this.props.artistId) {
      this.getArtist(this.props.artistId);
    }
  }

  getArtist(id) {
    fetchWithAuth(`/api/artists/${id}`).then(artist => {
      this.name = artist.name;
      this.detail = artist.detail;
      this.setState({
        originalName: artist.name,
        originalDetail: artist.detail,
        loading: false
      });
    });
  }

  handleNameChange(event) {
    this.name = event.target.value;
  }

  handleDetailChange(event) {
    this.detail = event.target.value;
  }

  handleSubmit() {
    const data = { name: this.name, detail: this.detail };
    this.props.onSubmit(data);
  }

  render() {
    return this.state.loading ? (
      <Dimmer active inverted>
        <Loader content="Loading" />
      </Dimmer>
    ) : (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field required>
          <label>Name</label>
          <input
            placeholder="Name"
            required
            onChange={this.handleNameChange}
            defaultValue={this.state.originalName}
          />
        </Form.Field>
        <Form.Field>
          <label>Detail</label>
          <TextArea
            placeholder="Detail"
            onChange={this.handleDetailChange}
            defaultValue={this.state.originalDetail}
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default ArtistForm;
