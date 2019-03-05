import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider} from '@material-ui/core/styles';


// icons
import SvgIcon from '@material-ui/core/SvgIcon';
// table
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
// color
import grey from '@material-ui/core/colors/grey';

/** ********/
/* Styles */
/** ********/

const drawerWidth = 285;

const styles : any = (theme: any) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    backgroundColor: '#333',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

/**
 * This is Dashboard component that displays
 * the everything post in the dashboard.
 * @param {object} props
 * @return {jsx} component
 */
function Dashboard(props: any) {
    const {classes} = props;
    /**
     * render function
     * @return {jsx} component
     */
    return (
      <div className={classes.root}>
        <CssBaseline />
          <AppBar
            position="absolute"
            className={classNames(classes.appBar)}
          >
            <Toolbar className={classes.toolbar}>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Scalabel Worker Dashboard
              </Typography>
                <IconButton
                    className={classNames(classes.logout)}
                    onClick={logout}
                >
                  <SvgIcon >
                    <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67
                    11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2
                    2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9
                    2-2V5c0-1.1-.9-2-2-2z" fill="#ffffff"/>
                  </SvgIcon>
                </IconButton>
            </Toolbar>
          </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h6" gutterBottom component="h2">
            Projects
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <ProjectTableDisplay classes = {tableStyles}/>
          </Typography>
        </main>
      </div>
    );
  }

/** **************/
/* AJAX request */
/** **************/
// post Ajax request for projects
let xhrproj = new XMLHttpRequest();
let projectsToExpress: {
  map: (arg0: (row: any, i: any) => JSX.Element) => React.ReactNode;
};
xhrproj.onreadystatechange = function() {
  if (xhrproj.readyState == 4 && xhrproj.status == 200) {
    projectsToExpress = JSON.parse(xhrproj.responseText);
  }
};
xhrproj.open('get', './postProjectNames', false);
xhrproj.send(null);


const CustomTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#333',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import { Palette } from "@material-ui/core/styles/createPalette";
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createMuiTheme from "@material-ui/core/es/styles/createMuiTheme";

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        palette: Palette
    }
    interface ThemeOptions {
        palette?: PaletteOptions
    }
}


// @ts-ignore
const theme = createMuiTheme({ palette: {common: {grey:"#616161"},},});

const tableStyles : any = (
    theme: {
      spacing: { unit: number; }; palette: { background: { default: any; }; };
    }
    ) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

/**
 * This is projectTable component that displays
 * all the information about projects
 * @param {object} props
 * @return {jsx} component
 */
let ProjectTable = function(props: { classes: any; }) {
  const {classes} = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <MuiThemeProvider theme={theme}>
          <TableHead >
            <TableRow>
              <CustomTableCell>Projects</CustomTableCell>
            </TableRow>
          </TableHead>
        </MuiThemeProvider>
        <TableBody>
          {projectsToExpress.map((row: any, i: any) => (
            <TableRow className={classes.row} key={i}>
              <CustomTableCell onClick={() => {
                toProject(row);
                }} component="th" scope="row">
                {row}
              </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

let ProjectTableDisplay = withStyles(tableStyles)(ProjectTable);

/**
 * Redirect user to logOut page
 */
function logout(): void {
  window.location.href = '/logOut';
}

/**
 * Redirect user(either admin or worker) to the project's dashboard
 * @param {string} projectName - the values to convert.
 */
function toProject(projectName: string): void{
  window.location.href = '/dashboard?project_name=' + projectName;
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
