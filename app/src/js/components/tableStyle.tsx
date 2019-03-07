import createStyles from '@material-ui/core/styles/createStyles';

const tableStyles: any = (theme: any) =>  createStyles({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'
    },
    table: {
        minWidth: 700
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default
        }
    }
});

export default tableStyles;
