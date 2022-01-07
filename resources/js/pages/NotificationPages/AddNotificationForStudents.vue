<template>
  <div class="row">
    <div class="col s12">
      <dialog-tree-select
        v-bind:tree="$store.getters.studentsTree"
        v-bind:load-tree="() => $store.dispatch('getStudentsTree')"
        v-bind:is-opened="isDialogTreeOpened"
        v-on:select="onTreeSelected"
      />
      <div class="card">
        <div class="card-content">
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">people</i>
              <div ref="chips" class="chips" v-on:click="openDialogTree">
                <input id="recipient" class="custom-class" />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">short_text</i>
              <input id="title" type="text" v-model="title" />
              <label for="title">{{
                'NOTIFICATION_LABEL_TITLE' | localize
              }}</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">mode_edit</i>
              <textarea
                id="message"
                class="materialize-textarea"
                v-model="message"
              />
              <label for="message">{{
                'NOTIFICATION_LABEL_MESSAGE' | localize
              }}</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <v-file-input
                small-chips
                multiple
                label="Добавьте файлы"
                dense
                v-on:change="onChangeFiles"
              />
            </div>
          </div>

          <div class="row">
            <button
              class="btn waves-effect waves-light right"
              type="submit"
              v-bind:class="{ disabled: isSendDisabled }"
              v-on:click="onSendNotification"
            >
              {{ 'NOTIFICATION_ADDNOTIFICATION_BUTTON_SEND' | localize }}
              <i class="material-icons right">send</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css';
import FileUploadForm from '@/components/Files/FileUploadForm';
import DialogTreeSelect from '@/components/DialogTreeSelect/DialogTreeSelect';
import FilesList from '@/components/Files/FilesList';

const context = 'students';

export default {
  name: 'AddNotificationPageForStudents',
  components: { FilesList, DialogTreeSelect, FileUploadForm },
  data: () => ({
    title: '',
    message: '',
    recipients: [],
    files: [],
    isDialogTreeOpened: false,
    isLoading: false,
  }),
  computed: {
    isSendDisabled() {
      return (
        this.recipients.length === 0 ||
        this.title.length === 0 ||
        (this.files.length === 0 && this.message.length === 0)
      );
    },
    isSendAnimated() {
      return this.isLoading;
    },
  },
  watch: {
    recipients: {
      handler: 'refreshChips',
      immediate: false,
    },
  },
  methods: {
    openDialogTree() {
      this.isDialogTreeOpened = true;
    },
    initChips() {
      this.$chips = M.Chips.init(this.$refs.chips, {
        data: [
          ...this.recipients.map((recipient) => ({ tag: recipient.name })),
        ],
        placeholder: 'Получатели',
      });
    },
    refreshChips() {
      if (this.$chips) {
        this.$chips.destroy();
      }
      this.initChips();
    },

    onChangeFiles(files) {
      this.files = files;
    },
    onTreeSelected(recipients) {
      this.isDialogTreeOpened = false;
      this.recipients = [...recipients];
    },
    onSendNotification() {
      this.isLoading = true;
      this.$store
        .dispatch('sendNotification', {
          context,
          notification: {
            title: this.title,
            message: this.message,
            recipients: this.recipients,
            files: this.files,
          },
        })
        .then(() => {
          this.title = '';
          this.message = '';
          this.files = [];
        })
        .catch((error) => {})
        .finally(() => {
          this.isLoading = false;
        });
    },
  },

  mounted() {
    this.initChips();
    M.updateTextFields();
  },
  beforeDestroy() {
    if (this.$chips && this.$chips.hasOwnProperty('destroy')) {
      this.$chips.destroy();
    }
  },
};
</script>

<style scoped></style>
