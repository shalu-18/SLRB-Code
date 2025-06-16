import { useState } from "react"

const TabDynamicCom = ({ allTabs, handleTabChange, spanclassName, divClssName, backgroundColor }) => {
    const [selectedTab, setSelectedTab] = useState("Pending")
    return (
        <>
            <div className={`text-center ${divClssName}`} style={{ width: "20rem" }}>
                {
                    allTabs?.length > 0 && allTabs.map((item, index, arr) => {
                        return (
                            <p className={`border border-1 ${spanclassName} p-2 `}
                                style={selectedTab === item.key ? { width: "20rem", backgroundColor: backgroundColor, color: 'white' } : { width: "20rem", backgroundColor: '#DADADA', color: 'black' }}
                                onClick={() => (handleTabChange(item.key), setSelectedTab(item.key))}>
                                <span style={{ width: "20rem" }}>{item.title}</span>
                            </p>
                        )
                    })
                }
            </div>
        </>
    )
}

export default TabDynamicCom;
