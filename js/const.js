//TODO remove before deploy, FenghuangConst.hostAjax
let FenghuangConst = {
  hostAjax: "http://139.224.133.133:8088",
  teacherHomePagePath: function () {
    return (
      "http://" +
      location.host +
      "/" +
      location.href
        .substr(location.href.indexOf(location.host) + location.host.length + 1)
        .substr(
          0,
          location.href
            .substr(
              location.href.indexOf(location.host) + location.host.length + 1
            )
            .indexOf("/")
        ) +
      "/Tindex.html"
    );
  },
  //主页页面名称
  courseDetailPage: "Tindex.html",
  //localstorage里存储的查看课堂表现选中的日期
  KeTangBiaoXianChaKanRiQiKey: "KeTangBiaoXianChaKanRiQiKey",
};

// let FenghuangConst = {
//     hostAjax: "http://139.224.133.133:8088",
// }
