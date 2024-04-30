import PropTypes from 'prop-types';

Dot.propTypes = {
    color: PropTypes.string.isRequired,
};
export default function Dot({color}) {
    const style = {
        backgroundColor: color
    };
    return (
        <div className="w-2 h-2 rounded-full" style={style} ></div>
    )
}