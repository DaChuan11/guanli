<template>
  <div class="pdf" style="width:35%;float:left;marginTop:-10px;margin-left: 115px;">
    <pdf :src="pdfUrl"></pdf>
  </div>
</template>
 
<script>
// import srco from '../assets/name1.pdf'
import pdf from "vue-pdf";
export default {
  name: "pdfshow",
  components: { pdf },
  props: ["posturl"],
  data() {
    return {
      pdfUrl: "",
      src: "",
      numPages: 0,
    };
  },
  mounted() {
    this.save1();
    this.loadPdf();
    this.temp();
  },
  methods: {
    loadPdf() {
      //src为你存放pdf的路径
      this.pdfUrl = pdf.createLoadingTask(this.src);
    },
    temp() {
      console.log(this.posturl);
    },
    save1() {
      this.src = this.posturl;
    },
  },
  watch: {
    posturl: {
      handler() {
        console.log(11);
        this.src = this.posturl;
        this.pdfUrl = pdf.createLoadingTask(this.src);
      },
    },
  },
};
</script>
 
<style lang="scss" scoped>
</style>