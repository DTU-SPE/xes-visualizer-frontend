<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark" class="shadow">
      <b-navbar-brand href="#">
        <img src="@/assets/dtu.png" class="d-inline-block align-top" alt="DTU" height="30" />
        XES Visualizer
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="{ name: 'About' }">About</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container fluid>
      <b-row>
        <nav class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse border-right p-0">
          <div class="sidebar-sticky pt-3">
            <input
              @change="onFileSelected"
              accept=".xes.gz"
              ref="file"
              type="file" hidden>
            <b-button
              class="ml-3"
              variant="outline-secondary"
              @click="selectFile"
              v-show="!uploading"
              :disabled="this.systemStatus != 'online'">Upload a file</b-button>
            <b-button
              v-show="uploading"
              class="ml-3"
              variant="outline-secondary" disabled >
              Uploading file...</b-button>
            <p class="ml-3 mr-3 mt-2 mb-2 text-muted"><small><strong>Attention:</strong> Uploaded files will be publicly visible for a certain amount of time.</small></p>

            <h6
              class="sidebar-heading justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
              :class="Object.keys(this.logs).length > 0 ? 'd-flex' : 'd-none'">
              Log files available</h6>
            <LogsList v-bind:logs="logs" />
            <SystemStatus v-bind:systemStatus="systemStatus" />
          </div>
        </nav>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4 pt-3">
          <router-view :logs="logs" />
        </main>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LogsList from './components/widgets/LogsList.vue';
import SystemStatus from './components/widgets/SystemStatus.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    SystemStatus, LogsList
  },
  data() {
    return {
      logs: {},
      systemStatus: "booting",
      uploading: false
    }
  },
  methods: {
    checkStatus() {
        axios.get(this.$visualizerBackend.getUrlPing())
            .then(res => this.systemStatus = (res.data == 'pong' ? "online" : "offline"))
            .catch(err => {
              console.error(err);
              this.systemStatus = "offline"
            });
    },
    onFileSelected(event) {
      this.uploading = true;
      var selectedFileUpload = event.target.files[0];
      const payload = new FormData();
      payload.append("file", selectedFileUpload);
      axios
        .post(this.$visualizerBackend.getUrlUpload(), payload)
        .then((res) => {
          const newFile = {
            name: selectedFileUpload.name,
            attributes: res.data.validAttributes,
            percentages: res.data.percentages,
          };
          this.$set(this.logs, selectedFileUpload.name, newFile);
          this.uploading = false;
        });
    },
    selectFile(){
      let fileInputElement = this.$refs.file;
      fileInputElement.click();
    }
  },
  mounted() {
      this.checkStatus();
      setInterval(() => {
          this.checkStatus();
      }, 1000 * 15); // check again every few seconds
  }
}
</script>

<style>
.sidebar-sticky {
  height: calc(100vh - 56px);
}
</style>
