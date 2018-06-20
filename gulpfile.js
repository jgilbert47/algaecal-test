// Required node-modules
var gulp = require('gulp');
var sass = require('gulp-sass');

// Converts all Sass files to CSS 
gulp.task('sass', function(){
	// Retrieves source sass files from the scss directory
  	return gulp.src('scss/*.scss')
  		// Converts sass to css
    	.pipe(sass()) 
    	// Outputs css files to the css directory
    	.pipe(gulp.dest('css/'))
});

// Watches the scss directory for save events and runs the 'sass' task
gulp.task('watch', function(){	
	gulp.watch('scss/*.scss', ['sass'])
});