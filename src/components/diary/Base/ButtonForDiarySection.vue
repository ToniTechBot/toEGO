<template>
  <div class="col-auto text-right q-pl-lg">
    <q-btn padding="none"
      flat
      :color="textColor"
      :icon="icon"
      :label="getLabel(label)"
      @click="clickButton(label)"
      :style="style"
      :size="size">
      <slot name="tooltip">
      </slot>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: "ButtonForDiarySection",
  emits: ["click-button"],
  props: {
    textColor: String,
    icon: String,
    label: String,
    style: Object,
    size: {
      type: String,
      default: "10px"
    },
    isShowingLabel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    };
  },
  methods: {
    clickButton() {
      this.$emit("click-button", this.label);
    },
    getLabel(labelname) {
      if (this.isShowingLabel) {
        return labelname;
      } else {
        return "";
      }
    },
  },
};
</script>

<style >

</style>
