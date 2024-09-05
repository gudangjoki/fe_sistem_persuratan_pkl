/* eslint-disable react/prop-types */
export default function SingleButton(props) {
    const {name, property, content} = props;
    const buttonClass = `inline-flex items-center px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none ${property}`;
    
    return (
        <button type="button" name={name} className={buttonClass}>
            {content}
        </button>
    );
}