import DeskBoard from "./DeskBoard"
import MobileBoard from "./MobileBoard"
import SelectBoard from "./SelectBoard"

export default function Scholarships({ width, scholarship, setIsSelected, isSelected }) {

    const isDesktop = width >= 1023
    const isMobile = width < 1023
    const hasData = Boolean(scholarship)

    if (isDesktop && hasData) {
        return (<DeskBoard
            scholarship={ scholarship }
        />)
    } 
    
    if (isMobile && hasData) {
        return (<MobileBoard
            scholarship={ scholarship }
            isSelected={ isSelected }
            setIsSelected={ setIsSelected }
        />)
    } 
    
    if (isDesktop && !hasData) {
        return (<SelectBoard />)
    } 

    return null
}