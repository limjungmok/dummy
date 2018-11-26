import React from 'react'

const MusicPlayer = (props) => {
  return (
    <div className="music_player">
      <div className="thumbnail">
        <img src={props.music.thumbnail} alt="" className="img" />
      </div>
      <div className="details">
        <div className="row">
          <i className="playtime">{`[${props.music.playtime}]`}</i>
          <i className="title">{props.music.title}</i>
        </div>
        <i className="artist">{props.music.artist}</i>
        <div className="music_buttons">
          <button type="button" className="btn_prev" onClick={props.onHandlePrev}>이전</button>
          <button type="button" className="btn_next" onClick={props.onHandleNext}>다음</button>
          <button type="button" className="btn_play_pause" onClick={props.onHandlePlayPause}>재생</button>
          <button type="button" className="btn_stop" onClick={props.onHandleStop}>정지</button>
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer
