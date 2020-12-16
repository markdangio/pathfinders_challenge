<template>
  <div class="row">
    <div class="col-md-6 mt-5 mx-auto">
      <form v-on:submit.prevent="predict">
        <div class="form-group">
          <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
              <input
                type="text"
                v-model="ticket_number"
                class="form-control"
                name="ticket_number"
                placeholder="Enter a ticket number here"
              />
            </div>
            <div class="col-md-6 mt-5 mx-auto">
              <textarea
                type="text"
                v-model="data_to_predict"
                class="form-control"
                name="data_to_predict"
                placeholder="Enter customer comment here"
              />
            </div>
          </div>
        </div>
        <button
          v-if="this.ticket_number && this.data_to_predict"
          type="submit"
          class="btn btn-lg btn-primary btn-block"
        >
          Predict
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DataInput',
  data() {
    return {
      ticket_number: '',
      data_to_predict: '',
    };
  },
  methods: {
    async predict() {
      try {
        const res = await axios.get(
          'https://us-central1-capable-asset-297615.cloudfunctions.net/predictSentiment',
          {
            params: {
              content: this.data_to_predict,
            },
          },
        );
        this.$router.push({
          name: 'Results',
          params: {
            number: this.ticket_number,
            comment: this.data_to_predict,
            value: res.data[0].predicted_sentiment_score,
          },
        });
        this.data_to_predict = '';
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
