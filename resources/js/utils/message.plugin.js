export default {
  install: function (Vue) {
    Vue.prototype.$message = function (message) {
      M.toast({
        html: message,
        classes: 'teal '
      });
    };
    
    Vue.prototype.$error = function (error) {
      M.toast({
        html: error,
        classes: 'red darken-1'
      });
    };
  }
};