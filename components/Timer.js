export default ({lastUpdate, light}) => {
    return (
        <div className={light ? 'light' : ''}>
            {format(new Date(lastUpdate))}
            <style jsx>{`
                div {
                  padding: 5px 0;
                  display: inline-block;
                  color: #919aa1;
                  font: 14px;
                }
        
                .light {
                  color: #f0ad4e;
                  background-color: #fff;
                }
            `}</style>
        </div>
    )
}


const format = t => t.toJSON().slice(11, 19) // cut off except hh:mm:ss
