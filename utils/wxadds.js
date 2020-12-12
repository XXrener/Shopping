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
    }
}