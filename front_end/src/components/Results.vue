<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Ticket Number</th>
        <th scope="col">Comment</th>
        <th scope="col">Sentiment</th>
        <th scope="col">Recommendation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ this.$route.params.number }}</td>
        <td>{{ this.$route.params.comment }}</td>
        <td>{{ this.sentimentString }}</td>
        <td v-if="this.sentimentString == 'Unsatisfied' && !this.confirmed">
          <button @click="upgradeTicket" type="submit" class="btn btn-sm btn-danger btn-block">
          Upgrade Ticket Priority
        </button>
        </td>
        <td v-if="this.sentimentString == 'Satisfied' || this.confirmed">
          <button disabled class="btn btn-sm btn-success btn-block">
          No action at this time
        </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Result',
  data() {
    return {
      sentimentString: '',
      confirmed: false,
    };
  },
  mounted() {
    if (parseInt(this.$route.params.value, 10) === 0) {
      this.sentimentString = 'Unsatisfied';
    } else {
      this.sentimentString = 'Satisfied';
    }
  },
  methods: {
    async upgradeTicket() {
      const url = `https://cors-anywhere.herokuapp.com/https://dev32013.service-now.com/api/now/table/sc_req_item/${this.$route.params.number}`;
      try {
        const res = await axios.put(url, {
          priority: 2,
          watch_list: '6816f79cc0a8016401c5a33be04be441',
        }, {
          auth: {
            username: 'mark.dangio',
            password: 'TiddlyWinks11!!',
          },
        });
        if (res.status === 200) {
          this.confirmed = true;
        }
        alert('Successfully upgraded ticket priority and added Manager to the watchlist.');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
