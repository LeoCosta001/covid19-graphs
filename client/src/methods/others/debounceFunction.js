/* eslint-disable */
module.exports = {
  /* Método debounce do Loadesh, possibilita definir um delay para que a mesma função seja executada novamente.
   * OBS: Não alterar! */
  use(func, wait, immediate) {
    let timeout;
    return function(...args) {
      const context = this;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
};
