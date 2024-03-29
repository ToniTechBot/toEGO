<template>
  <BasePage titleOfPage="Note Creator"
    :mode="getEventMode"
    :backgroundColor="$store.getters['layout/getEventBackgroundColor']">
    <template v-slot:title-bar-icon>
      <div style="padding: 1.5px">
        <q-icon name="theater_comedy"
          size="24px" />
      </div>
    </template>
    <template v-slot:title-bar-controls>
      <div class="row justify-between items-center">
        <BaseButtonForTitleBar class="no-box-shadow q-mr-xs"
          icon="bi-x"
          size="10px"
          @click-button="leavePage">
        </BaseButtonForTitleBar>
      </div>
    </template>
    <template v-slot:content>
      <!-- Emoji-Selection, Title, What happened? -->
      <div class="row justify-center items-center text-center q-px-md">
        <NoteSectionHowAreYouFeeling :mood="mood"
          @set-mood="setMood"></NoteSectionHowAreYouFeeling>
        <NoteSectionInputTitle :title="title"
          :width="getWidthForInputFields"
          :layoutMode="getEventMode"
          @set-title="setTitle"></NoteSectionInputTitle>
        <NoteSectionInputEditor :editor="editor"
          :width="getWidthForInputFields"
          :layoutMode="getEventMode"
          @set-editor="setEditor"
          @save-changes="saveChanges"
          @show-template-creator="showTemplateCreator"
          @show-template-viewer="showTemplateViewer"
          @paste-template-from-favorites="pasteTemplateFromFavorites"></NoteSectionInputEditor>
      </div>
    </template>
    <template v-slot:footer>
      <BaseButtonForFooter buttonText="Discard"
        @click-button="leavePage">
      </BaseButtonForFooter>
      <BaseButtonForFooter :buttonText="textForRightButton"
        @click-button="saveChanges">
      </BaseButtonForFooter>
    </template>
  </BasePage>
</template>

<script>
import { date } from "quasar";
import BasePage from "src/components/common/BasePage.vue";
import BaseButtonForTitleBar from "src/components/common/BaseButtonForTitleBar.vue";
import BaseButtonForFooter from "src/components/common/BaseButtonForFooter.vue";
import NoteSectionHowAreYouFeeling from "src/components/NoteCreator/NoteSectionHowAreYouFeeling.vue";
import NoteSectionInputTitle from "src/components/NoteCreator/NoteSectionInputTitle.vue";
import NoteSectionInputEditor from "src/components/NoteCreator/NoteSectionInputEditor.vue";

export default {
  components: {
    BasePage,
    BaseButtonForTitleBar,
    BaseButtonForFooter,
    NoteSectionHowAreYouFeeling,
    NoteSectionInputTitle,
    NoteSectionInputEditor
  },
  data() {
    return {
      editor: "",
      title: "",
      mood: "",
    };
  },
  // gets called anytime this component is set to active
  activated() {
    this.$store.commit("diaryentries/updateExpanded", false);
    // if mode is set to editing mode, we fetch the updated eventData
    if (!this.$store.state.data.newEventIsInCreationMode) {
      this.setNote();
    } else {
      // applying default template
      let defaultTemplate =
        this.$store.getters["templates/getDefaultTemplate"]("EVENT");
      if (defaultTemplate != undefined) {
        this.editor = defaultTemplate;
      }
    }
  },
  watch: {
    pastedText(text) {
      if (this.$store.state.data.dialogTemplateViewerIsSetToDiaryMode === false && text != "") {
        if (this.editor != "") {
          this.editor = this.editor + "<br>" + text;
        } else {
          this.editor = text;
        }
        this.$store.commit("data/setPastedText", "");
      }
    }
  },
  methods: {
    setMood(value) {
      this.mood = value;
    },
    setTitle(value) {
      this.title = value;
    },
    setEditor(value) {
      this.editor = value;
    },
    setNote() {
      this.editor = this.$store.state.diaryentries.currentNote.editor;
      this.title = this.$store.state.diaryentries.currentNote.title;
      this.mood = this.$store.state.diaryentries.currentNote.mood;
    },
    resetNote() {
      this.$store.commit("diaryentries/resetCurrentNote");
      this.setNote();
    },
    updateNote() {
      this.$store.commit("diaryentries/updateEditor", this.editor);
      this.$store.commit("diaryentries/updateTitle", this.title);
      this.$store.commit("diaryentries/updateExpanded", false);
      this.$store.commit("diaryentries/updateMood", this.mood);
    },
    leavePage() {
      let lastPath = this.$router.options.history.state.back;
      lastPath = lastPath.substring(1);
      this.$router.push(lastPath);
      this.resetNote();
    },
    saveChanges() {
      if (this.mood === "") {
        this.mood = "las la-meh-blank";
      }
      // check wether a new event is created or an existing one is being edited
      if (this.$store.state.data.newEventIsInCreationMode) {
        let lastPath = this.$router.options.history.state.back;
        if (lastPath === "/diary") {
          this.updateNote();
          this.$store.dispatch(
            "diaryentries/addNote",
            this.$store.state.data.lastSelectedDate
          );
        } else {
          this.updateNote();
          // if we are at home, we want to use new Date
          this.$store.dispatch(
            "diaryentries/addNote", new Date());
        }
      } else {
        this.updateNote();
        this.$store.dispatch("diaryentries/saveChangesToEditedNote");
        this.$store.commit("data/setModeForNewEvent", "CREATE");
      }
      this.leavePage();
    },
    pasteTemplateFromFavorites(template) {
      if (this.editor != "") {
        this.editor = this.editor + "<br>" + template.text;
      } else {
        this.editor = template.text;
      }
    },
    showTemplateCreator() {
      this.$store.commit("templates/setEditorText", this.editor);
      let payload = {
        isVisible: true,
        isBackgroundVisible: true,
        nameOfCurrentDialog: "template-creator-for-event",
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },
    showTemplateViewer() {
      let payload = {
        isVisible: true,
        isBackgroundVisible: true,
        nameOfCurrentDialog: "template-viewer-for-notes-editor",
      };
      this.$store.commit("data/setDialogVisibility", payload);
    },

  },
  computed: {
    pastedText() {
      return this.$store.state.data.pastedText;
    },
    getEventMode() {
      return this.$store.state.layout.noteLayoutMode;
    },
    getWidthForInputFields() {
      return this.$store.state.layout.innerWidth * 0.8;
    },
    textForRightButton() {
      if (this.$store.state.data.newEventIsInCreationMode) {
        return "Create";
      } else {
        return "Save";
      }
    },
  },
};
</script>

<style scoped src="98.css">
.q-field__label,
.no-pointer-events {
  font-family: Tahoma !important;
  color: red !important;
}
</style>

<style scoped></style>
