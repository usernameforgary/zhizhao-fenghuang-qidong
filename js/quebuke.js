var imgs = document.getElementsByClassName("xing");
var imgs1 = document.getElementsByClassName("xing1");
var imgs2 = document.getElementsByClassName("xing2");
var imgs3 = document.getElementsByClassName("xing3");
var imgs4 = document.getElementsByClassName("xing4");
for (var i = 0; i < imgs.length; i++) {
  imgs[i].setAttribute("score", i + 1); //设置分数
  imgs[i].onclick = function () { //点击时调用方法
    var srcEl = event.srcElement; //通过event来获取原元素
    var score = srcEl.getAttribute("score"); //获取分数
    for (var j = 0; j < score; j++) {
      imgs[j].src = "../../img/已评分.png";
    }
    for (var j = score; j < imgs.length; j++) {
      imgs[j].src = "../../img/未评分.png";
    }
  }
};
for (var i = 0; i < imgs1.length; i++) {
  imgs1[i].setAttribute("score", i + 1); //设置分数
  imgs1[i].onclick = function () { //点击时调用方法
    var srcEl = event.srcElement; //通过event来获取原元素
    var score = srcEl.getAttribute("score"); //获取分数
    for (var j = 0; j < score; j++) {
      imgs1[j].src = "../../img/已评分.png";
    }
    for (var j = score; j < imgs1.length; j++) {
      imgs1[j].src = "../../img/未评分.png";
    }
  }
};
for (var i = 0; i < imgs2.length; i++) {
  imgs2[i].setAttribute("score", i + 1); //设置分数
  imgs2[i].onclick = function () { //点击时调用方法
    var srcEl = event.srcElement; //通过event来获取原元素
    var score = srcEl.getAttribute("score"); //获取分数
    for (var j = 0; j < score; j++) {
      imgs2[j].src = "../../img/已评分.png";
    }
    for (var j = score; j < imgs2.length; j++) {
      imgs2[j].src = "../../img/未评分.png";
    }
  }
};
for (var i = 0; i < imgs3.length; i++) {
  imgs3[i].setAttribute("score", i + 1); //设置分数
  imgs3[i].onclick = function () { //点击时调用方法

    var srcEl = event.srcElement; //通过event来获取原元素

    var score = srcEl.getAttribute("score"); //获取分数
    for (var j = 0; j < score; j++) {
      imgs3[j].src = "../../img/已评分.png";
    }
    for (var j = score; j < imgs3.length; j++) {
      imgs3[j].src = "../../img/未评分.png";
    }
  }
};
for (var i = 0; i < imgs4.length; i++) {
  imgs4[i].setAttribute("score", i + 1); //设置分数
  imgs4[i].onclick = function () { //点击时调用方法

    var srcEl = event.srcElement; //通过event来获取原元素

    var score = srcEl.getAttribute("score"); //获取分数
    for (var j = 0; j < score; j++) {
      imgs4[j].src = "../../img/已评分.png";
    }
    for (var j = score; j < imgs4.length; j++) {
      imgs4[j].src = "../../img/未评分.png";
    }
  }
};
$('.teacher .tab li').click(function () {
  $('.teacher .tab li.active').removeClass('active')
  $(this).addClass('active')
  //下面需要修改 扇形表的数据
  if ($(this).text() == '待补课') {
    $('.main_q').show()
    $('#light-pagination').show()
    $('.main_b').hide()
    showQuekeTime()
  } else {
    $('.main_b').show()
    $('.main_q').hide()
    $('#light-pagination').hide()
    showBukeTime()
  }
})
$('.search img').click(function () {
  pageindex = 1
  showTime()
})
$('#search').bind('keyup', function (event) {
  if (event.keyCode == '13') {
    pageindex = 1
    //回车执行查询
    showTime()
  }
})
//	AJAX
var curriculumid,
  studentId,
  classImgLists = '' //课程ID/学生id
//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
var mySwiper;
// mySwiper = new Swiper('.swiper-container', {
//   autoplay: 5000, //可选选项，自动滑动
//   slidesPerView: 3,
//   spaceBetween: 25
// })
var BASE_URL = window.location.pathname
var uploader
uploaderInit()
function uploaderInit () {
  uploader = WebUploader.create({
    // 选完文件后，是否自动上传。
    auto: true,

    // swf文件路径
    swf: BASE_URL + '/css/webuploader/Uploader.swf',

    // 文件接收服务端。
    server: hostAjax + '/api/other/v1/PostFile',

    // 选择文件的按钮。可选。
    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
    pick: {
      id: '#modelImg',
      multiple: true
    },
    // 只允许选择图片文件。
    accept: {
      title: 'Images',
      extensions: '*',
      mimeTypes: 'image/*'
    }
  })
  /* 上传前判断 */
  uploader.on('beforeFileQueued', function (file) {
    progress = 0
    /* 图片 */
    if ('gif,jpg,jpeg,bmp,png'.indexOf(file.ext.toLowerCase()) == -1) {
      alert('请上传图片文件')
      return false
    } else {
      /* makeThumb方法生成缩略图获取图片base64 */
      uploader.makeThumb(
        file,
        function (error, src) {
          if (error) {
            alert('图片错误')
            return
          }
        },
        1,
        1
      ) /* 缩略图尺寸，大于1为px，0-1之间为百分比 */
    }
    /* 视频 */
    if (this.type == 'video') {
      if ('mp4,webm,m3u8,ogg'.indexOf(file.ext.toLowerCase()) == -1) {
        alert('请上传支持的视频文件')
        return false
      }
    }
    if (file.size > 3 * 1e8) {
      alert('文件大小不可超过300M')
      return false
    }

    return true
  })
  // 当有文件添加进来的时候
  uploader.on('uploadSuccess', function (file, response) {
    if (classImgLists.split('|').length > 9) {
      //超过之后的判断
      uploader.stop()
      ui.showToast('限制9张,已满！')
      return false
    }
    try {
      classImgLists += response.Data[0].f_url + '|'
    } catch (e) {
      //TODO handle the exception
    }

    if (classImgLists.split('|').length > 3) {
      $('.pre').show()
      $('.next').show()
    }
    if (classImgLists.split('|').length > 9) {
      $('#modelImg').hide()
    }
    var $li
    try {
      ; ($li = $(
        '<div class="swiper-slide file-item thumbnail"  ontouchstart="gtouchstart(this)" ontouchmove="gtouchmove(this)" ontouchend="gtouchend(this)" style="background-image: url(' +
        response.Data[0].f_url +
        ');">' +
        //              '<img  src="'+response.Data[0].f_url+'"/>' +
        '</div>'
      )),
        ($img = $li.find('img'))
    } catch (e) {
      //TODO handle the exception
    }

    // $list为容器jQuery实例
    $('.swiper-wrapper').append($li)
    mySwiper.update()
  })
  // 文件上传过程中创建进度条实时显示。
  uploader.on('uploadProgress', function (file, percentage) {
    var $li = $('#' + file.id),
      $percent = $li.find('.progress span')
    // 避免重复创建
    if (!$percent.length) {
      $percent = $('<p class="progress"><span></span></p>')
        .appendTo($li)
        .find('span')
    }

    $percent.css('width', percentage * 100 + '%')
    progress = parseInt(percentage * 100)
  })
}
//////////////////////////////////////////////------------------------------------
var timeOutEvent = 0 //定时器
//开始按
function gtouchstart (_this) {
  timeOutEvent = setTimeout(function () {
    longPress(_this)
  }, 1000) //这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适
  return false
}
//手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
function gtouchend (_this) {
  clearTimeout(timeOutEvent) //清除定时器
  if (timeOutEvent != 0) {
    //这里写要执行的内容（尤如onclick事件）
  }
  return false
}
//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
function gtouchmove (_this) {
  clearTimeout(timeOutEvent) //清除定时器
  timeOutEvent = 0
}

//真正长按后应该执行的内容
var splitStr = '',
  re,
  result,
  pageindex = 1
function longPress (_this) {
  timeOutEvent = 0
  splitStr = $(_this)
    .css('background-image')
    .split('url("')[1]
    .split('")')[0]
  splitStr += '\\|'

  console.log(splitStr)
  //执行长按要执行的内容，如弹出菜单
  ui.showAlert(
    '是否确认删除该图片',
    function () {
      //确认
      $(_this).remove()
      re = new RegExp(splitStr)
      classImgLists = classImgLists.replace(re, '')
      if (classImgLists.split('|').length <= 3) {
        $('.pre').hide()
        $('.next').hide()
      }
      if (classImgLists.split('|').length <= 9) {
        $('#modelImg').show()
      }
      mySwiper.update()
    },
    function () {
      //不是默认地址

      return false
    },
    '确定',
    '取消',
    '提示'
  )
}
$('.submit').click(function () {
  if (
    $('textarea')
      .val()
      .trim().length <= 8
  ) {
    ui.showToast('课堂表现的评语不能少于八个字~', 2000)
    return false
  }
  let type = $('.class_show').attr('data-source')
  let posturl = ''
  let data = {}
  let p1 = 0
  let p2 = 0
  let p3 = 0
  let p4 = 0
  let p5 = 0
  for (let i = 0; i < imgs.length; i++) {
    const element = imgs[i];
    console.log(decodeURI($(imgs[i]).attr('src')))
    if (decodeURI($(imgs[i]).attr('src')).includes('已评分')) {
      p1++
    }
  }
  for (let i = 0; i < imgs1.length; i++) {
    const element = imgs1[i];
    if (decodeURI($(imgs1[i]).attr('src')).includes('已评分')) {
      p2++
    }
  }
  for (let i = 0; i < imgs2.length; i++) {
    const element = imgs2[i];
    if (decodeURI($(imgs2[i]).attr('src')).includes('已评分')) {
      p3++
    }
  }
  for (let i = 0; i < imgs3.length; i++) {
    const element = imgs3[i];
    if (decodeURI($(imgs3[i]).attr('src')).includes('已评分')) {
      p4++
    }
  }
  for (let i = 0; i < imgs4.length; i++) {
    const element = imgs4[i];
    if (decodeURI($(imgs4[i]).attr('src')).includes('已评分')) {
      p5++
    }
  }
  if (type === 'queke') {
    let item = quekebukeArr[$('.class_show').attr('data-i')].list[$('.class_show').attr('data-j')]
    console.log(item)
    posturl = '/api/tch/v1/addabsencerecords',
    
    
    // data = {
     
    //   user_id: item.studentid,
    //   curriculumid: item.curriculumid,
    //   teacherid: uid,
    //   principalsevaluation: $('#text').val(),
    //   imglist: classImgLists,
    //   listencarefully: p1,
    //   behaviorhabit: p2,
    //   practicalability: p3,
    //   expressivepower: p4,
    //   aggressiveness: p5

$.ajax({
  type:"POST",
  url:"http://139.224.133.133:8088"+ '/api/tch/v1/addabsencerecords',
  data:{
      user_id: item.studentid,
      curriculumid: item.curriculumid,
      teacherid: uid,
      principalsevaluation: $('#text').val(),
      imglist: classImgLists,
      // listencarefully: p1,
      // behaviorhabit: p2,
      // practicalability: p3,
      // expressivepower: p4,
      // aggressiveness: p5
  },
  success: function (data) {
    if(data.Code == 200){
     alert('提交成功')
    // window.location.href="../src/Course/quebuke.html"
    history.go(-1)
    }
  }
})





      
    // }
  } else {
    let item = chabanbukeArr[$('.class_show').attr('data-i')].list[$('.class_show').attr('data-j')]
    posturl = '/api/tch/v1/newaddmakeuList'
    data = {
      studen_id: item.studentid,
      curriculumid: item.subjectid,
      teacherid: uid,
      principalsevaluation: $('#text').val(),
      imglist: classImgLists,
      listencarefully: p1,
      behaviorhabit: p2,
      practicalability: p3,
      expressivepower: p4,
      aggressiveness: p5
    }
  }
  console.log(posturl)
  console.log(data)
  // ui.showAlert(
  //   '请确认该学员已补课，提交后将扣除该学员对应课时',
  //   function () {
  //     getAjax(
  //       hostAjax + posturl,
  //       data,
  //       function (data) {
  //         console.log(data)
  //         if (data.Code == 200) {
  //           ui.showToast('提交成功')
  //           initData()
  //           clearFloat()
  //           $('#' + studentId)
  //             .find('.register')
  //             .text('已表扬')
  //         } else {
  //           ui.showToast(data.Msg)
  //         }
  //       }
  //     )
  //   },
  //   null,
  //   '是的',
  //   '取消',
  //   '提示'
  // )
})
$('.next').click(function () {
  mySwiper.slideNext()
})
$('.pre').click(function () {
  mySwiper.slidePrev()
})
function clearFloat () {
  $('.pre').hide()
  $('.next').hide()
  $('.class_show').hide()
  classImgLists = ''
  $('textarea').val(' ')
  $('.swiper-wrapper').html(
    '<div class="swiper-slide" id="modelImg"><img src="../../img/addImg.png"/></div>'
  )
  for (let i = 0; i < imgs.length; i++) {
    let element = imgs[i];
    element.src = '../../img/未评分.png'
  }
  for (let i = 0; i < imgs1.length; i++) {
    let element = imgs1[i];
    element.src = '../../img/未评分.png'
  }
  for (let i = 0; i < imgs2.length; i++) {
    let element = imgs2[i];
    element.src = '../../img/未评分.png'
  }
  for (let i = 0; i < imgs3.length; i++) {
    let element = imgs3[i];
    element.src = '../../img/未评分.png'
  }
  for (let i = 0; i < imgs4.length; i++) {
    let element = imgs4[i];
    element.src = '../../img/未评分.png'
  }
  $('.name-tu').html('')
  $('.regular').html('')
  $('.skdata-class').html('')
  $('.time-sj').html('')
  $('.class_show').attr({
    'data-source': '',
    'data-i': '',
    'data-j': ''
  })
  mySwiper.update()
  uploaderInit()
}