import Vue from 'vue'
import numeral from 'numeral';
import currency from 'vue-filter-number-format';

Vue.filter('currency', currency(numeral));

Vue.filter('capitalize', value => {
    if (!value) {
        return "";
    }
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('convertDate', value => {
    if (!value) {
        return "";
    }
    return new Date(`${value}`).toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
});