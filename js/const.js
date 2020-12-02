//TODO remove before deploy, FenghuangConst.hostAjax
let FenghuangConst = {
    hostAjax: "http://139.224.133.133:8088",
    teacherHomePagePath: function() {
        return "http://" + location.host + "/" + location.href.substr(location.href.indexOf(location.host) + location.host.length + 1).substr(0, location.href.substr(location.href.indexOf(location.host) + location.host.length + 1).indexOf("/")) + "/Tindex.html"
    }
}

// let FenghuangConst = {
//     hostAjax: "http://139.224.133.133:8088",
// }