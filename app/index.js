'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var fpilogo = require('fpilogo');
var _s = require('underscore.string');
var Path = require('path');
var fs = require('fs');


var extractGeneratorName = function (appname) {
  var slugged = _s.slugify(appname);
  var match = slugged.match(/^generator-(.+)/);

  if (match && match.length === 2) {
    return match[1].toLowerCase();
  }

  return slugged;
};

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: {
    askForModuleName: function() {
      var done = this.async();
      this.log(fpilogo.FpiLogo(this.pkg));
      this.log(chalk.green('Operation!'));

      var prompts = [{
        name: 'projectName',
        message: 'Project Name',
        default: Path.basename(process.cwd()),
      }];


      this.prompt(prompts, function (props) {
        this.projectName = props.projectName;

        done();
      }.bind(this));
    },
    askForAuthorName: function(){
      var done = this.async();
      var prompts = [{
        name: 'author',
        message: 'Author Name',
        default: 'fpi-inc'
      }];

      this.prompt(prompts, function(props){
        this.author = props.author;
        done();
      }.bind(this));
    }
  },
  setup: function () {
    var self = this;
    var d = new Date();
    var YMDHMS = d.getFullYear() + "-" +(d.getMonth()+1) + "-" + d.getDate() + " " + 
      d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    this.appname = this.projectName;
    var appauthor = this.author;
    this.dest.write('html/' + this.appname + '_home.html', [
      '\<\!Doctype html\>',
      '\<html\>',
      '\<head\>',
          '    \<meta charset=\"utf-8\"\>',
          '    \<title\>' + this.appname + '--' + appauthor + '\<\/title\>',
          '    \<link rel=\"stylesheet\" href=\"..\/assets\/css\/main.css\" media=\"screen\"\>',
      '\<\/head\>',
      '\<body\>',
      '    \<div\>' + this.appname + '\<\/div\>', 
      '\<\/body\>',
      '\<\/html\>'
    ].join('\n'));
    this.dest.write('less/' + this.appname + '_home.less', [
      '/**',
      ' * @project: ' + this.appname,
      ' * @author: ' + appauthor ,
      ' * @create: ' + YMDHMS ,
      ' */'
    ].join('\n'));
    this.src.recurse('.', function (path, root, subdir, filename) {
      self.template(path, subdir ? Path.resolve(subdir, filename) : filename);
    });
  },

  done: function () {
    this.log('done!');
  }
});
