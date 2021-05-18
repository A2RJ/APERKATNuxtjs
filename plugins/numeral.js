import Vue from 'vue'
import numeral from 'numeral';
import numFormat from 'vue-filter-number-format';
// import VueFileAgent from 'vue-file-agent';
// import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';

// Vue.use(VueFileAgent);
Vue.filter('numFormat', numFormat(numeral));