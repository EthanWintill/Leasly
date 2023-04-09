import './AptmntSubleaseBoard.css'


const AptmntSubleaseBoard = ({listings}) =>{
    
    return(
        
        <div className="bountyContainer">
            <p className="bountyTitle">Subleases Available</p>
                <div className="bountyView">
                {/* uncomment the following comments when backend is online, will instantly populate with correct data for each listing
                {listings.map((sublet) =>*/}
                    <div className="bountyCards">
                        <img className="bountyImage"></img>
                        <div className="bountyGeneral">
                            <p> Floor Plan </p>
                            <p> Price</p>
                            <p> Duration</p>
                        </div>
                        <div className="bountyDescription">
                            {/*<p> {sublet.description}</p>*/}
                            <p> Lorem ipsum dolor sit amet, consectetur 
                                adipiscing elit. Nunc maximus, nulla ut commodo sagittis, 
                                sapien dui mattis dui, non pulvinar lorem felis nec erat
                                r sit amet, consectetur 
                                adipiscing elit. Nunc maximus, nulla ut commodo sagittis, 
                                sapien dui mattis dui, non pulvinar lorem felis nec erat</p>
                            <button> Message </button>
                        </div>
                        
                    </div>
                {/*)}*/}
                </div>
        </div>
    )
}

export default AptmntSubleaseBoard