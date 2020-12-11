/* test(e) {

    var that = this

    that.setData({

        loadData: true

    })

    wx.showLoading({

        title: '数据下载中',

    })

    var url1 = that.data.editData.shop_swiperpic

    var url2 = that.data.editData.shop_detailpic

    var url3 = that.data.editData.shop_logopic



    var a = function () {

        return new Promise(function (resolve, reject) {

            if (!url1.length) {

                resolve("a")

            } else {

                util.downloadSaveFiles({

                    urls: url1,

                    success: function (res) {

                        resolve("a")



                    },

                    fail: function (e) {

                        console.info("下载失败");

                    }

                }, that, 'swiperpic', '正在下载轮播图片');

            }

        })

    }



    var b = function (data) {

        return new Promise(function (resolve, reject) {

            if (!url2.length) {

                resolve(data + 'b')

            } else {

                util.downloadSaveFiles({

                    urls: url2,

                    success: function (res) {

                        resolve(data + 'b')



                    },

                    fail: function (e) {

                        console.info("下载失败");

                    }

                }, that, 'detailpic', '正在下载详情图片');

            }

        })

    }



    var c = function (data) {

        return new Promise(function (resolve, reject) {

            if (!url3.length) {

                resolve(data + 'c')

            } else {

                wx.showLoading({

                    title: '即将完成下载',

                })

                util.downloadSaveFiles({

                    urls: url3,

                    success: function (res) {

                        resolve(data + 'c')



                    },

                    fail: function (e) {

                        console.info("下载失败");

                    }

                }, that, 'logopic', '正在下载商家LOGO');

            }

        })

    }




    function reduce(arr) {

        var sequence = Promise.resolve()



        arr.forEach(function (item) {

            sequence = sequence.then(item)

        })



        return sequence

    }



    reduce([a, b, c])

        .then(function (data) {



            setTimeout(function () {

                wx.showLoading({

                    title: '数据下载完成',

                })

                that.edit()

            }, 1000)

        })

        .catch(function (e) {

            console.log(e)

        })

} */