<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" class="logo">
    <div class="hello">
    <h1>xX_youtubeDead_Xx</h1>
    <input type="text" v-model="d.url"  placeholder="Video or Playlist URL"><br>
    <select>
      <option value="" disabled selected>OUTPUT TYPE</option>
      <option>FLAC</option>
      <option>MP3</option>
      <option>WAV</option>
    </select>
    <div class="btn straight grey" @click="selectDir()">DIR</div>
    <br><br>
    <div v-if="!s.downloading" class="btn" @click="download()">DOWNLOAD</div>
    <div v-if="s.downloading" class="btn inactive" @click="download()">DOWNLOADING...</div>
  </div>
  </div>
</template>

<script>
const { ipcRenderer } = window.require('electron');

export default {
  name: 'App',
  components: {
    
  },
  data: function(){
    return{
      s:{
        downloading: false
      },
      d:{
        url: 'https://youtu.be/YddwkMJG1Jo',
        dl_path: '~\\Downloads',//H:\\MusicRips\\test
      }
    }
  },
  methods:{
    download(){
      if(this.s.downloading){
        return;
      }
      else{
        this.s.downloading = true;
        if(this.d.dl_path === '~\\Downloads'){
          alert('You have not specified a download path. Your files will be downloaded to your "Downloads" directory.');
        }
        
        // Async message handler
         ipcRenderer.on('download-reply', (event, arg) => {
            console.log(arg);
            this.s.downloading = false;
         })

         // Async message sender
        ipcRenderer.send('download', this.d);
        //console.log(res);
        
      }
    },
    async selectDir(){
      const dir = await ipcRenderer.sendSync('dir-select', 'x');
      console.log('DIR: '+dir);
      this.d.dl_path = dir.filePaths;
    }
  }
}
</script>

<style>
:root{
  --bg:rgb(22, 22, 22);
  --highlight: #e01a1a;
  --highlight-dark: #a71d1d;
  --highlight-darker: #7c1a1a;
  --font: #ffffff;
}
body{
  background:var(--bg);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--font);
  margin-top: 2.5rem;
  
}
a {
  color: var(--highlight);
  text-decoration: none;
}
.logo{
  max-width:15rem;
}
input[type="text"]{
  width:88vw;
  font-size:1.2rem;
  padding:0.5rem;
  border-radius:3rem;
}
select{
  background:var(--bg);
  color:var(--font);
  font-size:1.1rem;
  padding:0.25rem;
}
.btn{
  background:var(--highlight);
  color:var(--font);
  display:inline-block;
  padding:0.5rem;
  border-radius:0.5rem;
  cursor: pointer;
}
.btn:hover{
  background:var(--highlight-dark);
}
.btn:active{
  background:var(--highlight-darker);
}
.inactive{
  xbackground:var(--highlight-darker)!important;
  animation: download 2s infinite;
}
.straight{
  border-radius:0;
}
.grey{
  background:grey;
}
@keyframes download {
  from {background: var(--highlight)}
  to {background: var(--highlight-darker)}
}
</style>
