import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Button,
  Input
} from '@material-ui/core';
import Header from '../Header';
import { Redirect, Link } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Field, reduxForm } from 'redux-form';
import { userActions } from '../../store/actions';

class Workplaces extends Component {
  renderInput = ({ input, type, placeholder }) => {
    return (
      <Input
        {...input}
        type={type}
        placeholder={placeholder}
        size="small"
        style={{ marginBottom: '2px' }}
      />
    );
  };
  onSubmit(formValues) {
    formValues.createdBy = this.props.user._id;
    this.props.createWorkspaceRequest(formValues);
    return this.props.reset('createWorkspace');
  }
  render() {
    const { user } = this.props;
    if (!window.localStorage.getItem('token')) return <Redirect to="/signin" />;
    return (
      <div>
        <Header />
        <Box p={4}>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5">I want a new project</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={2}
                style={{ width: '100%' }}
              >
                <form
                  noValidate
                  autoComplete="off"
                  onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}
                >
                  <Field
                    name="name"
                    component={this.renderInput}
                    type="text"
                    placeholder="Workspace name"
                  />
                  <Button type="submit" variant="outlined" size="small">
                    Create
                  </Button>
                </form>
              </Box>
            </AccordionDetails>
          </Accordion>
          {user._id
            ? user.workspaces.map(workspace => {
                return (
                  <Accordion key={workspace._id}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>{workspace.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <Link to={'/workspace/' + workspace._id}>
                          Go to workspace
                        </Link>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })
            : null}
        </Box>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispathToProps = dispatch => {
  return {
    createWorkspaceRequest: workspace =>
      dispatch(userActions.createWorkspaceRequest(workspace))
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(
  reduxForm({
    form: 'createWorkspace',
    destroyOnUnmount: false
  })(Workplaces)
);
