import {  useAtom } from 'jotai';
import {SecondryColorSeclectorAtom} from "./LandingPage";

const Setting = ()=>{
    const[TextColorchange] = useAtom(SecondryColorSeclectorAtom)
    return(
        <>
        <h3 class="TopHaddings" style={{color:TextColorchange}}>This is Setting page</h3>
        </>
    )
}
export default Setting