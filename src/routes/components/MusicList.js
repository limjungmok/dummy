import React from 'react'

const MusicList = (props) => {
  function onHandleClick(e) {
    const target = e.target.closest('.music_item')
    const music_list = e.currentTarget.querySelectorAll('.music_item')
    for(let i = 0; i < music_list.length; i++) {
      music_list[i].removeAttribute('aria-current')
    }
    target.setAttribute('aria-current', 'true')
    props.onHandleClick(e)
  }

  return (
    <div className="music_list" onClick={onHandleClick.bind(this)}>
      {props.musicList.map((music, index) => {
        return (
          <a key={index} data-id={music.id} className="music_item">
            <div className="thumbnail">
              <img src={music.thumbnail} alt="" className="img" />
            </div>
            <div className="details">
              <div className="row">
                <i className="playtime">{`[${music.playtime}]`}</i>
                <i className="title">{music.title}</i>
              </div>
              <i className="artist">{music.artist}</i>
            </div>
          </a>
        )
      })}
    </div>
  )
}

export default MusicList;
