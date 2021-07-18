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

Vue.use({
    install(Vue, options) {
        Vue.prototype.$formatRupiah = (params) => {
            if (params !== null && params !== undefined) {
                var number_string = params.replace(/[^,\d]/g, "").toString(),
                    split = number_string.split(","),
                    sisa = split[0].length % 3,
                    rupiah = split[0].substr(0, sisa),
                    ribuan = split[0].substr(sisa).match(/\d{1,3}/gi),
                    separator = null;
                if (ribuan) {
                    separator = sisa ? "." : "";
                    rupiah += separator + ribuan.join(".");
                }
                rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
                return rupiah;
            }
        }
    },
})