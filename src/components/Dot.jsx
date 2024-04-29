import PropTypes from 'prop-types';

Dot.propTypes = {
    color: PropTypes.string.isRequired,
};
export default function Dot({color}) {
    const classes = `w-2 h-2 bg-[${color}] rounded-full`;
    return (
        <div className={classes}></div>
    )
}