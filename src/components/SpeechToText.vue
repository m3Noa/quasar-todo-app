<template>
  <v-btn>
    <v-icon
      @click.stop="toggle ? endSpeechRecognition() : startSpeechRecognition()"
      >{{ toggle ? 'mic_off' : 'mic' }}</v-icon
    >
  </v-btn>
</template>

<script>
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : false;

export default {
  props: {
    lang: {
      type: String,
      default: 'en-US'
    },
    text: {
      type: [String, null],
      required: true
    }
  },
  data() {
    return {
      error: false,
      speaking: false,
      toggle: false,
      runtimeTranscription: '',
      sentences: []
    };
  },
  methods: {
    checkCompatibility() {
      if (!recognition) {
        this.error =
          'Speech Recognition is not available on this browser. Please use Chrome or Firefox';
      }
    },
    endSpeechRecognition() {
      recognition.stop();
      this.toggle = false;
      this.$emit('speechend', {
        sentences: this.sentences,
        text: this.sentences.join('. ')
      });
    },
    startSpeechRecognition() {
      if (!recognition) {
        this.error =
          'Speech Recognition is not available on this browser. Please use Chrome or Firefox';
        return false;
      }
      this.toggle = true;
      recognition.lang = this.lang;
      recognition.interimResults = true;

      recognition.addEventListener('speechstart', event => {
        this.speaking = true;
      });

      recognition.addEventListener('speechend', event => {
        this.speaking = false;
      });

      recognition.addEventListener('result', event => {
        const text = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        this.runtimeTranscription = text;
      });

      recognition.addEventListener('end', () => {
        if (this.runtimeTranscription !== '') {
          this.sentences.push(
            this.capitalizeFirstLetter(this.runtimeTranscription)
          );
          this.$emit(
            'update:text',
            `${this.text}${this.sentences.slice(-1)[0]}. `
          );
        }
        this.runtimeTranscription = '';
        recognition.stop();
        if (this.toggle) {
          // keep it going.
          recognition.start();
        }
      });
      recognition.start();
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  },
  mounted() {
    this.checkCompatibility();
  }
};
</script>

<style></style>
