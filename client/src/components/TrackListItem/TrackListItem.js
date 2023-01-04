import './TrackListItem.css'

const TrackListItem = ({ name, author, description, distance, time, minElevation, maxElevation, difficulty, tags, onClick }) => {
    return (
        <div className="track-list-item">
            <h4 className="track-list-item__name">{name}</h4>
            <div className="track-list-item__author">{author}</div>
            <div className="track-list-item__description">{description} - {author} </div>

            <div className='flex-table-colomn box-background'>
                <div className='flex-table-row'>
                    <div className="flex-table-row__item">
                        <span className="tooltip-icon">
                            <input type="checkbox" id="distance-icon" className="tooltip-image tooltip-icon native-hidden" />
                            <div className="tooltip-text small"><span>Distance</span></div>
                        </span>
                        <span className='track-list-item__distance'>{distance} km</span>
                    </div>

                    <div className="flex-table-row__item">
                        <span className="tooltip-image tooltip-icon">
                            <input type="checkbox" id="time-icon" className="tooltip-image tooltip-icon native-hidden" />
                            <div className="tooltip-text small"><span>Time</span></div>
                        </span>
                        <span className='track-list-item__time'>{time}</span>
                    </div>
                </div>

                <div className='flex-table-row'>
                    <div className="flex-table-row__item">
                        <span className="tooltip-image tooltip-icon">
                            <input type="checkbox" id="trend-up-icon" className="tooltip-image tooltip-icon native-hidden" />
                            <div className="tooltip-text small"><span>Uphill</span></div>
                        </span>
                        <span className='track-list-item__minElevation'>{minElevation}</span>
                    </div>

                    <div className="flex-table-row__item">
                        <span className="tooltip-image tooltip-icon">
                            <input type="checkbox" id="trend-down-icon" className="tooltip-image tooltip-icon native-hidden" />
                            <div className="tooltip-text small"><span>Downhill</span></div>
                        </span>
                        <span className='track-list-item__maxElevation'>{maxElevation}</span>
                    </div>

                    {/* <div className="flex-table-row__item">
                        <span className="tooltip-image tooltip-icon">
                            <input type="checkbox" id="difficulty-icon" className="tooltip-image tooltip-icon native-hidden" />
                            <div className="tooltip-text small"><span>Difficulty</span></div>
                        </span>
                        <span className={`difficulty-flag ${difficulty}`}></span>
                    </div> */}
                </div>
            </div>

            <div>Tags:
                {tags.map((tag, index) => {
                    return (
                        <span
                            className={`tag  tag--unclickable ${index === 0 ? `tag-difficulty-color` : ''} ${difficulty}`}
                            key={index}
                        >
                            {tag}
                        </span>
                    )
                })}
            </div>
            {onClick && <button onClick={onClick} className="big button">Remove</button>}
        </div>
    );
}

export default TrackListItem;
