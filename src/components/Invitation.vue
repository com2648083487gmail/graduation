<template>
  <div class="wedding-invitation" :class="{ 'invitation-bounce':canOpen }">
    <audio ref="bgm" :src="musicSrc" autoplay muted loop hidden></audio>

    <div class="music-control" @click="toggleMusic">
      <img :src="isPlaying ? require('../images/music-on.png') : require('../images/music-off.png')" alt="music toggle" />
    </div>
    <div class="invitation-container" :class="{ 'invitation-down':isOpening }">
      <div class="invitation-cover">
        <div class="cover-content" :class="{'invitation-up':isOpening}">
          <div class="content-inside">
            <div class="carousel">
              <img :src="carouselImages[currentImage]" class="content-inside-photo" />
            </div>
            <p>我们毕业啦！</p>
            <br>
            <p><strong>毕业聚餐</strong></p>
            <p><b>电商21-2 students & teachers</b></p>
            <br>
            <p>时间：2025年5月7日18:30</p>
            <p>地点：<b>龙泉菜馆·阳光花园餐厅·社区下饭菜(龙泉路店)</b></p>
            <div class="content-inside-bless">
              <input
                placeholder="写下你的祝福" 
                @keyup.enter="sendBarrage"
                @focus="isFocused = true"
                @blur="isFocused = false, hasEntered = false"
                v-model="wish"
                ref="wishInput"
              >
              <p v-if="!wish && isFocused && hasEntered">请输入祝福哦</p>
              <div>
                <button @click="sendBarrage">发送祝福弹幕</button>
                <button @click="closeInvitation">关闭</button>
              </div>
            </div>
          </div>
        </div>
        <div class="cover-inside-left" :class="{'opening':isOpening}"></div>
        <div class="cover-inside-right" :class="{'opening':isOpening}"></div>
        <img class="cover-inside-seal" src="../images/seal.png" @click="openInvitation" :class="{'invitation-flight':isOpening}">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['canOpen'],
  data() {
    return {
      isOpening: false,
      wish: '',
      isFocused: false,
      hasEntered: false,
      currentImage: 0,
      carouselImages: [
        require('../images/photo1.jpg'),
        require('../images/photo2.jpg'),
        require('../images/photo3.jpg'),
        require('../images/photo4.jpg'),
        require('../images/photo5.jpg'),
        require('../images/photo6.jpg'),
        require('../images/photo7.jpg'),
        require('../images/photo8.jpg'),
        require('../images/photo9.jpg'),
        require('../images/photo10.jpg'),
        require('../images/photo11.jpg'),
        require('../images/photo12.jpg'),
        require('../images/photo13.jpg'),
        require('../images/photo14.jpg'),
        require('../images/photo15.jpg'),
        require('../images/photo16.jpg'),
        require('../images/photo17.jpg'),
        require('../images/photo18.jpg'),
        require('../images/photo19.jpg'),
        require('../images/photo20.jpg'),
        require('../images/photo21.jpg'),
        require('../images/photo22.jpg'),
        require('../images/photo23.jpg'),
        require('../images/photo24.jpg'),
        require('../images/photo25.jpg'),
        require('../images/photo26.jpg'),
        require('../images/photo27.jpg'),
        require('../images/photo28.jpg'),
        require('../images/photo29.jpg'),
        require('../images/photo30.jpg'),
        require('../images/photo31.jpg'),
        require('../images/photo32.jpg'),
        require('../images/photo33.jpg'),
        require('../images/photo34.jpg'),
        require('../images/photo35.jpg'),
        require('../images/photo36.jpg'),
        require('../images/photo37.jpg'),
        require('../images/photo38.jpg'),
        require('../images/photo39.jpg'),
        require('../images/photo40.jpg'),
        require('../images/photo41.jpg'),
        require('../images/photo42.jpg'),
        require('../images/photo43.jpg'),
        require('../images/photo44.jpg'),
        require('../images/photo45.jpg'),
        require('../images/photo46.jpg'),
        require('../images/photo47.jpg'),
        require('../images/photo48.jpg'),
        require('../images/photo49.jpg'),
        require('../images/photo50.jpg'),
        require('../images/photo51.jpg'),
        require('../images/photo52.jpg'),
        require('../images/photo53.jpg'),
        require('../images/photo54.jpg'),
        require('../images/photo55.jpg'),
        require('../images/photo56.jpg'),
        require('../images/photo57.jpg'),
        require('../images/photo58.jpg'),
        require('../images/photo59.jpg'),
        require('../images/photo60.jpg'),
        require('../images/photo61.jpg'),
        require('../images/photo62.jpg'),
        require('../images/photo63.jpg'),
        require('../images/photo64.jpg'),
        require('../images/photo65.jpg'),
        require('../images/photo66.jpg'),
        require('../images/photo67.jpg'),
        require('../images/photo68.jpg'),
        require('../images/photo69.jpg'),
        require('../images/photo70.jpg'),
        require('../images/photo71.jpg'),
        require('../images/photo72.jpg'),
        require('../images/photo73.jpg'),
        require('../images/photo74.jpg'),
        require('../images/photo75.jpg'),
        require('../images/photo76.jpg'),
        require('../images/photo77.jpg'),
        require('../images/photo78.jpg')
      ],
      carouselInterval: null,
      musicSrc: require('../audio/music.mp3'),
      isPlaying: true
    }
  },
  mounted() {
    this.startCarousel();
    const audio = this.$refs.bgm;
    audio.play().catch(() => {
      this.isPlaying = false;
    });
  },
  beforeDestroy() {
    clearInterval(this.carouselInterval);
  },
  methods: {
    toggleMusic() {
      const bgm = this.$refs.bgm;
      if (this.isPlaying) {
        bgm.pause();
      } else {
        bgm.play();
      }
      this.isPlaying = !this.isPlaying;
    },

    startCarousel() {
      this.carouselInterval = setInterval(() => {
        this.currentImage = (this.currentImage + 1) % this.carouselImages.length;
      }, 1000); // 每1秒切换一次
    },

    // 打开邀请函
    openInvitation() {
      this.isOpening = true;
      const audio = this.$refs.bgm;
      audio.muted = false; // 手动取消静音
      audio.play().catch(() => {
        this.isPlaying = false;
      });
    },

    closeInvitation() {
      this.isOpening = false;
      setTimeout(() => {
        this.$emit('onClose');
      }, 660);
    },

    // 发送弹幕
    sendBarrage() {
      this.$nextTick(() => {
        this.hasEntered = true;
        if (!this.wish) {
          return;
        }
        this.isOpening = false;
        this.$refs.wishInput.blur();
        setTimeout(() => {
          this.$emit('sendBarrage', this.wish);
        }, 660);
      });
    }
  }
}
</script>

<style lang="less">
  .wedding-invitation{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 30px 20px;
    padding-top: 60px;
    z-index: 4;
    transform: scale(0.05);
    -webkit-transform: scale(0.05);
    opacity: 0;
    transition: transform 0.8s cubic-bezier(.26,1.84,.39,.61), opacity 0.5s linear;
    -webkit-transition: -webkit-transform 0.8s cubic-bezier(.26,1.84,.39,.61), opacity 0.5s linear;
    background-size: 100%;
    overflow: hidden;
    &.invitation-bounce{
      opacity: 1;
      transform: scale(1);
      -webkit-transform: scale(1);
    }
    .invitation-container{
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.6s cubic-bezier(0.4, 0, 1, 1);
      -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.4, 0, 1, 1);
      &.invitation-down{
        transform: translateY(20px);
        -webkit-transform: translateY(20px);
      }
      .invitation-cover{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #D65047;
        border-radius: 10px;
        perspective: 400px;
        box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.15);
        .cover-content{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 10px 20px;
          transition: transform 0.6s cubic-bezier(0.4, 0, 1, 1);
          -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.4, 0, 1, 1);
          &.invitation-up{
            transform: translateY(-60px);
            -webkit-transform: translateY(-60px);
          }
          .content-inside{
            height: 100%;
            padding: 20px;
            color: #a9895d;
            background-color: #FFF1DE;
            text-align: center;
            overflow: auto;
            .content-inside-photo{
              width: 100%;
              margin-bottom: 10px;
              padding: 5px;
              border: 1px solid #f7debb;
            }
            .carousel {
              position: relative;
              width: 100%;
              height: 400px; // 固定高度，根据需要调整
              overflow: hidden;
              padding: 0 0 10px 0;

              .content-inside-photo {
                width: 100%;
                height: 100%;
                object-fit: cover; // 或 contain，取决于是否想裁剪
                display: block;
              }
            }
            p{
              margin-top: 0;
              margin-bottom: 5px;
              font-size: 20px;
              font-family: "KaiTi", "楷体", "STKaiti", serif;
            }
            .content-inside-bless{
              input{
                width: 100%;
                height: 35px;
                margin-bottom: 10px;
                outline: none;
                border: none;
                border-bottom: 1px solid #f7debb;
                color: #a9895d;
                background: transparent;
                font-size: 16px;
                &::-webkit-input-placeholder { color: #E8D1B1;font-size: 12px; }
                &::-moz-placeholder { color: #E8D1B1;font-size: 12px; }
                &:-ms-input-placeholder { color: #E8D1B1;font-size: 12px; }
                &:-moz-placeholder { color: #E8D1B1;font-size: 12px; }
              }
              >div{
                display: flex;
                button{
                  width: 100%;
                  height: 35px;
                  color: #a9895d;
                  background: #f7debb;
                  border: none;
                  outline: none;
                  &:disabled{
                    opacity: 0.8;
                  }
                  &:first-child{
                    margin-right: 10px;
                    flex: 1;
                  }
                  &:last-child{
                    width: 60px;
                    border: 1px solid #f7debb;
                    background: transparent;
                  }
                }
              }
            }
          }
        }
        .cover-inside-left{
          position: absolute;
          left: 0;
          top: 0;
          width: 70%;
          height: 100%;
          border-radius: 10px;
          background-color: #D65047;
          box-shadow: 5px 0 10px rgba(0,0,0,0.2);
          z-index: 6;
          transition: transform 0.5s;
          -webkit-transition: -webkit-transform 0.5s;
          transform-origin: 0 50%;
          -webkit-transform-origin: 0 50%;
          &.opening{
            transform: rotate3d(0,1,0,-140deg);
            -webkit-transform: rotate3d(0,1,0,-140deg);
          }
        }
        .cover-inside-right{
          position: absolute;
          right: 0;
          top: 0;
          width: 40%;
          height: 100%;
          border-radius: 10px;
          background-color: #D65047;
          box-shadow: -5px 0 10px rgba(0,0,0,0.2);
          z-index: 5;
          transition: transform 0.5s;
          -webkit-transition: -webkit-transform 0.5s;
          transform-origin: 100% 50%;
          -webkit-transform-origin: 100% 50%;
          &.opening{
            transform: rotate3d(0,1,0,140deg);
            -webkit-transform: rotate3d(0,1,0,140deg);
          }
        }
        .cover-inside-seal{
          position: absolute;
          left: 70%;
          bottom: 100px;
          width: 80px;
          height: 80px;
          margin-left: -40px;
          z-index: 7;
          transform-origin: 50% 50%;
          -webkit-transform-origin: 50% 50%;
          transition: all 0.8s cubic-bezier(0.4, 0, 1, 1);
          -webkit-transition: all 0.8s cubic-bezier(0.4, 0, 1, 1);
          &.invitation-flight{
            opacity: 0;
          }
        }
      }
    }
  }
  .music-control {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 100;
    width: 40px;
    height: 40px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
