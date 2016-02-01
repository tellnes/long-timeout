
var TIMEOUT_MAX = 2147483647; // 2^31-1

exports.setTimeout = function(listener, after) {
  return new Timeout(listener, after)
}
exports.setInterval = function(listener, after) {
  return new Interval(listener, after)
}
exports.clearTimeout = function(timer) {
  if (timer) timer.close()
}
exports.clearInterval = exports.clearTimeout

exports.Timeout = Timeout
exports.Interval = Interval

function Timeout(listener, after) {
  this.listener = listener
  this.after = after
  this.start()
}

Timeout.prototype.start = function() {
  if (this.after <= TIMEOUT_MAX) {
    this.timeout = setTimeout(this.listener, this.after)
  } else {
    var self = this
    this.timeout = setTimeout(function() {
      self.after -= TIMEOUT_MAX
      self.start()
    }, TIMEOUT_MAX)
  }
}

Timeout.prototype.close = function() {
  clearTimeout(this.timeout)
}

function Interval(listener, after) {
  this.listener = listener
  this.after = this.timeLeft = after
  this.start()
}

Interval.prototype.start = function() {
  var self = this

  if (this.timeLeft <= TIMEOUT_MAX) {
    this.timeout = setTimeout(function() {
      self.listener()
      self.timeLeft = self.after
      self.start()
    }, this.timeLeft)
  } else {
    this.timeout = setTimeout(function() {
      self.timeLeft -= TIMEOUT_MAX
      self.start()
    }, TIMEOUT_MAX)
  }
}

Interval.prototype.close = function() {
  Timeout.prototype.close.apply(this, arguments);
}
