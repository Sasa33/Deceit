var http = require("http"),
    url = require("url"),
    superagent = require("superagent"),
    cheerio = require("cheerio"),
    async = require("async"),
    eventproxy = require('eventproxy');

var ep = new eventproxy();

var baseUrl = 'http://www.tingroom.com/',
    catchData = [],	// store crawl result
    pageUrls = [],
    pageNum = 10,
    startDate = new Date(),
    endDate = false;

for (var i = pageNum; i >= 1; i--) {
    pageUrls.push('http://www.tingroom.com/lesson/englishpod/list_' + i + '.html');
}


function start() {
    function onRequest(req, res) {
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});

        ep.after('ArticleHtml', pageUrls.length * 15, function (articleUrls) {
          for (var i = 0; i < articleUrls.length; i++) {
              res.write(articleUrls[i] + '<br/>');
          }
          console.log('articleUrls.length is ' + articleUrls.length + ', content is ' + articleUrls);


          // concurrency control
          var curCount = 0;
          var reptileMove = function (url, callback) {
            var delay = parseInt((Math.random() * 30000000) % 1000, 10);
            curCount++;
            //console.log('Current concurrent number: ', curCount, '，currently crawling url: ', url, ', time: ' + delay + 'ms');

            var id = url.match(/\d+.html/)[0].split('.')[0];
            var iframeUrl = baseUrl + '/play.php?id=' + id;
            url = baseUrl + url;

            superagent.get(url) // url: articleUrl
              .end(function (err, sres) {
                if (err) {
                    console.log(err);
                    return;
                }

                var $ = cheerio.load(sres.text);
                //gather information:
                var reg = /[^u4E00-u9FA5]/g;
                var title = $('.title_viewbox h2').text();

                res.write('title: ' + title + '<br/>');

                var episodeTitle = title.replace(reg, '');
                var episodeId = episodeTitle.split('')[1];
                // var mp3data = $("#dewplayer-vol").attr('data');
                // var sub = "http://";
                //var index = mp3data.indexOf(sub);
                //var mp3url = mp3data.substring(index);
                var paragraph = $('#zoom p');
                var pList = [];

                paragraph.each(function (index) {
                    pList.push($(this).text());
                })

                console.log('current article title is ' + episodeTitle + '\n');
                res.write('title: ' + episodeTitle + '<br/>');
                //console.log('current episode mp3 url is ' + mp3url + '\n');
                //res.write('media :' + mp3url + '<br/>');
                res.write('script: ' + pList + '<br/>');
                console.log('description is: ' + pList + '\n');
              });


            superagent.get(iframeUrl) 
              .end(function (err, sres) {
                if (err) {
                    console.log(err);
                    return;
                }

                var $ = cheerio.load(sres.text);
                //gather information:
                
                var mp3data = $("#dewplayer-vol").attr('data');
                var sub = "http://";
                var index = mp3data.indexOf(sub);
                var mp3url = mp3data.substring(index);

                console.log('current episode mp3 url is ' + mp3url + '\n');
                res.write('media: ' + mp3url + '<br/>');
            });

            setTimeout(function () {
              curCount--;
              callback(null, url + 'Call back content');
            }, delay);
          };


          // use async to crawl asynchronously
          // mapLimit(arr, limit, iterator, [callback])
          async.mapLimit(articleUrls, 5, function (url, callback) {
            reptileMove(url, callback);
          }, function (err, result) {
            endDate = new Date();

            console.log('final:');
            console.log(result);
            console.log(catchData);
            var len = catchData.length;
            for (var i = 0; i < len; i++) {
                var eachData = JSON.stringify(catchData[i]);
                var eachDataJson = catchData[i];


                res.write(eachData + '<br/>');
            }

            //results
            res.write('<br/>');
            res.write('<br/>');
            res.write('/**<br/>');
            res.write(' * crawl results<br/>');
            res.write('**/<br/>');
            res.write('1. start time: ' + startDate + '<br/>');
            res.write('2. end time: ' + endDate + '<br/>');
            res.write('3. time used: ' + (endDate - startDate) + 'ms' + ' --> ' + (Math.round((endDate - startDate) / 1000 / 60 * 100) / 100) + 'min <br/>');
            res.write('4. episode page number: ' + pageNum * 20 + '<br/>');
          });
        });


        pageUrls.forEach(function (pageUrl) {
            superagent.get(pageUrl)
              .end(function (err, pres) {
                console.log('fetch ' + pageUrl + ' successful');
                res.write('fetch ' + pageUrl + ' successful<br/>');
                if (err) {
                    console.log(err);
                }

                var $ = cheerio.load(pres.text);
                var curPageUrls = $('ul.e2 li a');
                for (var i = curPageUrls.length-1; i >= 0 ; i--) {
                    var articleUrl = curPageUrls.eq(i).attr('href');

                    ep.emit('ArticleHtml', articleUrl);
                }
              })
        })
    }

    http.createServer(onRequest).listen(3000);
}

exports.start = start;
