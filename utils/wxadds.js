module.exports={
    chooseAddress:()=>{
        return new Promise((resolve,reject)=>{
            wx.chooseAddress({
                success: (result) => {
                    return resolve(result)
                },
                fail: (err) => {
                    return reject(err)
                },
                complete: () => {}
            });
              
        })
    },
     /* 提示模态框封装 */
     showmodal:(content)=>{
        return new Promise( (resolve,reject)=>{
            wx.showModal({
                title: '提示',
                content,
                showCancel: true,
                success: (result) => {
                    if (result.confirm) {
                        resolve(result)
                    }
                },
                fail: (err) => { reject(err)},
                complete: () => {}
            });
              
        })
    }
}