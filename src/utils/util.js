const Util = {
  // [59:59] -> 3599 seconds
  getConvertedNumberedTime: function(playtime) {
    let temp = playtime.slice(1, playtime.length-1);
    let minute = temp.split(':')[0];
    let second = temp.split(':')[1];
    let result = (Number(minute) * 60) + (Number(second));

    return result;
  },
  // 3599 -> [59:59]
  getConvertedStringifiedTime: function(time) {
    let minutes = Math.floor(time / 60);
    let seconds = parseInt((time - (minutes * 60)) % 60, 10);

    return `[${(minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)}]`;
  },
  getPrevIndex: function(index, length) { 
    let resultIndex = index;
    resultIndex--;
    if(resultIndex < 0) {
      return resultIndex = length - 1;
    } else {
      return resultIndex;
    }
  },
  getNextIndex: function(index, length) { 
    let resultIndex = index;
    resultIndex++;
    if(resultIndex > length-1) {
      return resultIndex = 0;
    } else {
      return resultIndex;
    }
  }
}

export default Util;
