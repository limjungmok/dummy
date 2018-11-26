import React, { Component } from 'react';
import MusicList from '../components/MusicList';
import MusicPlayer from '../components/MusicPlayer';
import MUSIC_DATA from '../../database/musicList.json';
import util from '../../utils/util';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicList: [],
      playerStatus: {
        isPlaying: false,
        id: 'm001'
      }
    };
    this.onHandleClick = this.onHandleClick.bind(this);
    this.onHandlePlayPause = this.onHandlePlayPause.bind(this);
    this.onHandleStop = this.onHandleStop.bind(this);
    this.onHandlePrev = this.onHandlePrev.bind(this);
    this.onHandleNext = this.onHandleNext.bind(this);
  };

  async componentDidMount() {
    const musicList = await MUSIC_DATA
    musicList.map((music) => music.playtime = util.getConvertedNumberedTime(music.playtime));
    this.setState({
      musicList
    });
  }

  onHandleClick(e) {
    const target = e.target.closest('.music_item');

    this.setState(prevState => ({
      playerStatus: {
        ...prevState.playerStatus,
        id: target.dataset.id
      }
    }));
  }
  onHandlePlayPause() {
    this.setState(prevState => ({
      playerStatus: {
        ...prevState.playerStatus,
        isPlaying: !prevState.playerStatus.isPlaying
      }
    }));
  }
  onHandleStop() {
    this.setState(prevState => ({
      playerStatus: {
        ...prevState.playerStatus,
        isPlaying: false
      }
    }));
  }
  onHandlePrev() {
    console.log('prev');
    const currentIndex = this.state.musicList.findIndex(music => {
      return music.id === this.state.playerStatus.id
    });
    const prevIndex = util.getPrevIndex(currentIndex, this.state.musicList.length);
    console.log(prevIndex);
  }
  onHandleNext() {
    console.log('next');
    const currentIndex = this.state.musicList.findIndex(music => {
      return music.id === this.state.playerStatus.id
    });
    const nextIndex = util.getNextIndex(currentIndex, this.state.musicList.length);
    console.log(nextIndex)
  }

  render() {
    const { musicList, playerStatus } = this.state;
    return (
      <div className="container">
        { musicList.length > 0 && (
          <MusicPlayer
            music = { musicList.filter(music => music.id === playerStatus.id)[0] }
            isPlaying = { playerStatus.isPlaying }
            onHandlePlayPause = { this.onHandlePlayPause }
            onHandleStop = { this.onHandleStop }
            onHandlePrev = { this.onHandlePrev }
            onHandleNext = { this.onHandleNext }
          />)}
        <MusicList 
          musicList = { musicList }
          onHandleClick = { this.onHandleClick }
        />
      </div>
    );
  }
};

export default App;
