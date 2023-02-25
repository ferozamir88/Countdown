(function () {
  var Countdown = function (element, options) {
    this.element = element;
    this.options = options || {};

    this.countdownDate =
      this.options.countdownDate ||
      new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // Default is 30 days from now
    this.countdownText = this.options.countdownText || 'Coming Soon';
    this.interval = this.options.interval || 1000;

    this.init();
  };

  Countdown.prototype.init = function () {
    this.render();
    this.start();
  };

  Countdown.prototype.render = function () {
    var html =
      '<div class="countdown-timer">' +
      '<div class="countdown-text">' +
      this.countdownText +
      '</div>' +
      '<div class="countdown-digits">' +
      '<span class="countdown-digit countdown-days">00</span>:' +
      '<span class="countdown-digit countdown-hours">00</span>:' +
      '<span class="countdown-digit countdown-minutes">00</span>:' +
      '<span class="countdown-digit countdown-seconds">00</span>' +
      '</div>' +
      '</div>';

    this.element.innerHTML = html;

    this.daysElement = this.element.querySelector('.countdown-days');
    this.hoursElement = this.element.querySelector('.countdown-hours');
    this.minutesElement = this.element.querySelector('.countdown-minutes');
    this.secondsElement = this.element.querySelector('.countdown-seconds');
  };

  Countdown.prototype.start = function () {
    var self = this;
    var intervalId = setInterval(function () {
      var remainingTime = self.countdownDate - new Date().getTime();

      if (remainingTime <= 0) {
        clearInterval(intervalId);
        self.daysElement.innerText = '00';
        self.hoursElement.innerText = '00';
        self.minutesElement.innerText = '00';
        self.secondsElement.innerText = '00';
        return;
      }

      var remainingSeconds = Math.floor(remainingTime / 1000);
      var remainingMinutes = Math.floor(remainingSeconds / 60);
      var remainingHours = Math.floor(remainingMinutes / 60);
      var remainingDays = Math.floor(remainingHours / 24);

      remainingHours = remainingHours % 24;
      remainingMinutes = remainingMinutes % 60;
      remainingSeconds = remainingSeconds % 60;

      self.daysElement.innerText =
        remainingDays < 10 ? '0' + remainingDays : remainingDays;
      self.hoursElement.innerText =
        remainingHours < 10 ? '0' + remainingHours : remainingHours;
      self.minutesElement.innerText =
        remainingMinutes < 10 ? '0' + remainingMinutes : remainingMinutes;
      self.secondsElement.innerText =
        remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    }, this.interval);
  };

  window.Countdown = Countdown;
})();

var countdownElement = document.getElementById('countdown');
var countdown = new Countdown(countdownElement, {
  countdownDate: new Date('2023-03-31').getTime(), // Date to countdown to
  countdownText: 'Our Launch', // Text to display above the countdown
  interval: 500, // Update interval in milliseconds
});
