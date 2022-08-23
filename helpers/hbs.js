const moment = require('moment')

module.exports = {
    formatDate: function (date, format) {
        return moment(date).format(format)
    },
    truncate: function (str, len){
        if(str.length > len && str.length > 0){
            let newStr = str + ' '
            newStr = str.substr(0, len)
            newStr = str.substr(0, newStr.lastIndexOf(' '))
            newStr = newStr.length > 0 ? newStr : str.substr(0, len)
            return newStr + '...'
        }
        return str
    },
    stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '')
    },
    editIcon: function (notesUser, loggedUser, noteId, floating = true) {
        if (notesUser._id.toString() == loggedUser._id.toString()) {
          if (floating) {
            return `<a href="/stories/edit/${noteId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
          } else {
            return `<a href="/stories/edit/${noteId}"><i class="fas fa-edit"></i></a>`
          }
        } else {
          return ''
        }
    },
}