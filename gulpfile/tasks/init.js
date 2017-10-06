/**
 * Starting Task for the first Build off the Project Structure
 */

import gulp from 'gulp'
import runSequence from 'run-sequence'

const initTask = (cb) => {

  // Overwrite the Changed Check
  global.checkChanged = false

  runSequence(
    [
      'compiler:html'
    ],
    cb)
}

gulp.task('init', initTask)
module.exports = initTask
