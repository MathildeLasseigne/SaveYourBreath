import './TrackListItem.css'

// TODO TRACKS: improve style
const TrackListItem = ({ name, author, description, distance, time, minElevation, maxElevation, tags, onClick }) => {
    return (
        <div className="track-list-item">
            <h4 className="track-list-item__name">{name}</h4>
            <div className="track-list-item__author">{author}</div>
            <div className="track-list-item__description">{description} - {author} </div>
            <div className="track-list-item__distance">{distance} km</div>
            <div className="track-list-item__time">{time}</div>
            <div className="track-list-item__minElevation">{minElevation}</div>
            <div className="track-list-item__maxElevation">{maxElevation}</div>
            <div>Tags:
                {tags.map((tag, index) => {
                    return (
                        <span
                            key={index}
                            className={"tag tag--unclickable"}
                        >
                            {tag}
                        </span>
                    )
                })}
            </div>
            {onClick && <button onClick={onClick}>Remove</button>}
        </div>
    );
}

export default TrackListItem;
