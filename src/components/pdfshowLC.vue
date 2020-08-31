<template>
  <div class="pdf" style="width:35%;float:left;marginTop:-10px;margin-left: 115px;">
    <pdf :src="posturl"></pdf>
  </div>
</template>
 
<script>
import pdf from "vue-pdf";
export default {
  name: "pdfshowLC",
  components: { pdf },
  props: ["posturl"],
  data() {
    return {
      pdfUrl: "",
      numPages: 0,
    };
  },
  mounted() {},
  methods: {},
};
</script>
 
<style lang="scss" scoped>
</style>