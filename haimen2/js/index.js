var cloud_imageSrc = '/Image/wordcloud/',  //图片路径
            cloud_hrefTo = location.origin + location.pathname + '?kw='; //点击新闻热词跳转地址
    var word_cloud = {
        /********图片列表********/
        //平时的图片列表
        normalImageList: [
                        {
                            //对话框
                            bcSrc: 'js/cloud.jpg',
                            echartSrc: 'js/cloud1.jpg',
                            colors: ['#d01c1d', '#6eb5d4', '#2f52a4', '#69b9b1', '#e87826']
                        }
        ],
        /********绘制词云********/
        /*接收词云数据('字段格式与原前台帐号热词接口统一')
         eg:[{"text":"美国","size":27.5294523419225},{"text":"公众","size":24.0429436360056}];*/
        init: function (data) {
            var random = parseInt(Math.random() * word_cloud.normalImageList.length);
            var imageObj = word_cloud.normalImageList[random];
            var container = $('#wordCloudTemp')[0];   //词云容器
            var list = [];  //词云列表
            var imageSrc = imageObj ? imageObj.echartSrc : null;  //随机图片
            var colors = imageObj ? imageObj.colors : ['#000'];
            if (imageObj && imageObj.bcSrc && imageObj.bcSrc != '') $('#container').css('backgroundImage', 'url("' + imageObj.bcSrc + '")');

            if (data && data.length && imageSrc) {
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    list.push({
                        name: item.text,
                        value: item.size,
                        textStyle: {
                            normal: {},
                            emphasis: {}
                        }
                    })
                }

                word_cloud.drawCloud(container, list, imageSrc, colors);
            }
        },
        drawCloud: function (container, data, imgSrc, colors) {
        	var chartWidth=document.body.clientWidth-10;
            var chartHeight=parseInt(chartWidth/86*51);
//          $('#wordChartLoading').hide();
            $('#wordCloudTemp').css('height',chartHeight);
            var wordChart = echarts.init(container);
            var maskImage = new Image();
            maskImage.src = imgSrc;
            var Option = {
                title: null,
                series: [{
                    type: 'wordCloud',
                    center: ['100%', '100%'],
                    size: [chartWidth, chartHeight],
                    width: chartWidth,
                    height: chartHeight,
                    textRotation: [0],
                    rotationRange: [0, 0],
                    textPadding: 0,
                    autoSize: {
                        enable: true,
                        minSize: 12
                    },
                    tooltip: {
                        show: false
                    },
                    sizeRange: [chartWidth>=750?15:15,parseInt(chartWidth/12)],
//                  shape: 'pentagon',
                    maskImage: maskImage,
                    data: data,
                    drawOutOfBound: false,
                    textStyle: {
                        normal: {
                            fontFamily: 'Microsoft YaHei',
                            fontWeight: 'normal',
                            color: function () {
                                var random = parseInt(Math.random() * colors.length);
                                return colors[random];
                            }
                        },
                        emphasis: {
                            shadowBlur: 5,
                            shadowColor: '#b5c1c4'
                        }
                    },
                }]
            };
            maskImage.onload = function () {
                wordChart.setOption(Option);
                wordChart.on('click', function eConsole(param) {
//                 console.log("我要跳转了"+param);
					
                   for (var i in param) {
                   	console.log(i+"---"+param[i]);
                   }
                   console.log(param["data"])
					$.ajax({
			            type: "POST",
			            contentType: "application/json;charset=utf-8",
			            url: hostAjax2+"/Interface/PKService/PKService.asmx/ServiceUpdataLabelmodel",
			            data: "{iId:0,sName:'"+param.name+"'}",//给你传标签名字---你就加次数
			            dataType: 'json',
			            success: function (data) {
//			                console.log(data)
//			                console.log(JSON.parse(data.d));
			               location.href="search.html?tag="+encodeURI(param.name);
			            },
			            error: function () {
			                alert("数据错误");
			            }
			        });                   
                });
            }
        }
    }
    
    
    

