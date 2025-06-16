
const Button_Component = ({ type, className, onClick, value ,style,text}) =>{
    return(
        <>
        <button type={type} value={value}  className={className} onClick={(e)=>onClick(e)} style={style}>
            {text}
            </button>
        </>
    )
}

export default Button_Component