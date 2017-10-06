/**
 * Tthe Watch Tasks for SASS,
 * JADE, JS and activate BrowserSync
 */

import kc from '../../config.json'
import gulp from 'gulp'
import watch from 'gulp-watch'
import templateFiles from '../lib/templateFiles'
import path from 'path'

const watchTask = () => {
  // Watch the Structure
  gulp.watch([templateFiles()], ['compiler:html'])
}

gulp.task('watch', watchTask)
module.exports = watchTask
