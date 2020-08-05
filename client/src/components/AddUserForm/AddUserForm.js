import React from 'react';
import { Form, Field } from 'react-final-form';
import { Divider, Button, withStyles } from '@material-ui/core';
import styles from './styles';
import InputField from '../InputField/InputField';
import { validator } from './validator';
import Grid from '@material-ui/core/Grid';

const AddUserForm = ({ classes, onCancel, addUser }) => {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.flex1}>
          <Form
            onSubmit={(values) => {
              addUser(values);
            }}
            validate={validator}
            render={({ handleSubmit, pristine, invalid, values }) => (
              <form
                id="add-new-entry"
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <Grid
                  container
                  spacing={2}
                  className={classes.formContainer}
                  alignment={'center'}
                  justify="center"
                >
                  <Grid container item xs={6} lg={6} spacing={1}>
                    <Field
                      type={'text'}
                      label={'Username'}
                      name={'name'}
                      component={InputField}
                      fullWidth={false}
                    />
                  </Grid>
                  <Grid container item xs={6} lg={6} spacing={1}>
                    <Field
                      type={'text'}
                      label={'Village'}
                      name={'village'}
                      component={InputField}
                      fullWidth={false}
                    />
                  </Grid>
                  <Grid container item xs={6} lg={6} spacing={1}>
                    <Field
                      type={'text'}
                      label={'Tehsil'}
                      name={'tehsil'}
                      component={InputField}
                      fullWidth={false}
                    />
                  </Grid>
                  <Grid container item xs={6} lg={6} spacing={1}>
                    <Field
                      type={'number'}
                      label={'Mobile'}
                      name={'mobile'}
                      component={InputField}
                      fullWidth={false}
                    />
                  </Grid>
                </Grid>
              </form>
            )}
          />
        </div>
        <div>
          <Divider />
          <div className={classes.modalBodyBottomToolbar}>
            <Button
              variant="outlined"
              onClick={onCancel}
              className={classes.button}
            >
              Cancel
            </Button>
            <Button
              form="add-new-entry"
              variant="contained"
              type={'submit'}
              color="primary"
              className={classes.button}
            >
              {'Add User'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default withStyles(styles)(AddUserForm);
