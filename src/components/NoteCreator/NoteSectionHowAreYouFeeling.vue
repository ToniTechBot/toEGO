<template>
  <!-- How are you feeling? -->
  <p class="col-10 text-center q-mt-lg"
    :style="styleForTitle">
    How are you feeling?
  </p>
  <!-- Mood Selection -->
  <div class="col-12">
    <q-btn-toggle v-model="moodModel"
      class="col-12 q-mb-md"
      toggle-color="accent"
      padding="none"
      :color="getTextColor"
      flat
      :options="[
        { value: 'las la-angry', slot: 'angry' },
        { value: 'las la-sad-tear', slot: 'sad' },
        { value: 'las la-meh', slot: 'meh' },
        { value: 'las la-smile', slot: 'content' },
        { value: 'las la-grin-alt', slot: 'happy' },
      ]">
      <template v-slot:angry>
        <q-btn padding="xs"
          :style="moodModel === 'las la-angry' ? styleForActiveEmojiButton : styleForEmojiButton"
          flat
          size="15px"
          icon="las la-angry" />
      </template>

      <template v-slot:sad>
        <q-btn padding="xs"
          :style="moodModel === 'las la-sad-tear' ? styleForActiveEmojiButton : styleForEmojiButton"
          flat
          size="15px"
          icon="las la-sad-tear" />
      </template>

      <template v-slot:meh>
        <q-btn padding="xs"
          :style="moodModel === 'las la-meh' ? styleForActiveEmojiButton : styleForEmojiButton"
          flat
          size="15px"
          icon="las la-meh" />
      </template>

      <template v-slot:content>
        <q-btn padding="xs"
          :style="moodModel === 'las la-smile' ? styleForActiveEmojiButton : styleForEmojiButton"
          flat
          size="15px"
          icon="las la-smile" />
      </template>

      <template v-slot:happy>
        <q-btn padding="xs"
          :style="moodModel === 'las la-grin-alt' ? styleForActiveEmojiButton : styleForEmojiButton"
          flat
          size="15px"
          icon="las la-grin-alt" />
      </template>
    </q-btn-toggle>
  </div>

</template>


<script>

export default {
  name: "NoteSectionHowAreYouFeeling",
  emits: ["set-mood"],
  components: {},
  props: {
    mood: String,
  },
  data() {
    return {
    };
  },
  computed: {
    styleForEmojiButton() {
      let style = {};
      style["box-shadow"] = "none";
      style["background-color"] = "transparent";
      style["text-shadow"] = this.$store.getters["layout/getTextColorForEvent"]["text-shadow"];

      style["color"] = this.$store.getters["layout/getTextColorForEvent"]["color"];
      return style;
    },
    styleForActiveEmojiButton() {
      let style = {};
      style["box-shadow"] = "none";
      style["background-color"] = "transparent";
      style["text-shadow"] = "2px 2px 3px " + this.$store.state.layout.accent2 + this.$store.state.layout.lowOpacity;
      style["color"] = this.$store.state.layout.accent;
      return style;
    },
    styleForTitle() {
      return this.$store.getters["layout/getStyleForHeadline"];
    },
    moodModel: {
      get() {
        return this.mood;
      },
      set(value) {
        this.$emit("set-mood", value);
      }
    },
    getTextColor() {
      if (this.$store.getters["layout/getTextColorForEvent"]["color"] === "#000000" || 'black') {
        return "black";
      } else {
        return "white";
      }
    },
  }

};
</script>

<style scoped>

</style>
