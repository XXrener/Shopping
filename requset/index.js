//Promise wx-request封装 数据接口
/* const request = (prarms)=>{
    return new Promise( (resolve,reject)=>{
        wx.request({
            ...prarms,
            success: (result) => {
               return resolve(result) 
            },
            fail: (err) => {
                return reject(err)
            },
            complete: (data) => {
                return console.log(data,"成功与否都会执行")
            }
        });
          
    })
}
exports.request = request */

/* 个人自定义封装 */
// const api='https://api-hmugo-web.itheima.net/api/public/v1/home/'
let ajaxTimes = 0;
const api='https://api-hmugo-web.itheima.net/'
module.exports={
    
      
    request:(prarms)=>{
        wx.showLoading({
            title: "加载中",
            mask: true
        });
        // 次数加一
        ajaxTimes++;

        return new Promise( (resolve,reject)=>{
            wx.request({
                ...prarms,
                url:api+prarms.url,
                success: (result) => {
                    // 直接返回数据
                    return resolve(result.data.message)
                },
                fail: (err) => {
                    return reject(err)
                },
                complete: () => {
                    ajaxTimes--;
                    if(ajaxTimes==0 ){
                        wx.hideLoading();
                          
                    }
                }
            });
              
        })
    }

}