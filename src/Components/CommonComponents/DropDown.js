
import '../Assets/Styles/Dropdown.css';
const DropDown_component = (props) => {

    return (
        <>
            <select class="form-select" name={props.name} value={props?.droplist[0]?.value} id={props.value} onChange={props.onChange}>
                {
                    props.droplist.map((listoptions) => {
                        return (
                            <>
                                <option class="droplist_value" value={listoptions.option}>{listoptions.option}</option>
                            </>
                        )
                    })
                }
            </select>
        </>
    )
}

export default DropDown_component;

