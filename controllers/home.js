module.exports = function(async, Group, _){
    return {
        SetRouting: function(router){
            router.get('/home', this.homePage);
        },
        homePage: function (req, res) {
            async.parallel([
                function(callback){
                    Group.find({},(err,result) => {
                        callback(err,result);
                    })
                },
                function(callback){
                    Group.aggregate([{$group: {_id:"$region"}}],(err,newResult) => {
                        callback(err,newResult);
                    });
                }
            ],(err,results)=>{
                const res1 = results[0];
                //console.log(res1);
                const res2 = results[1];
                //console.log(res2);

                // 3个1组
                const dataChunk = [];
                const chunkSize = 3;
                for (let i=0;i<res1.length;i+=chunkSize){
                    dataChunk.push(res1.slice(i,i+chunkSize));
                }
                // console.log(dataChunk);

                // 排序
                const regionSort = _.sortBy(res2,'_id');
                // console.log(regionSort);
                res.render('home',{title: 'KIK聊天通讯 | 首页',user:req.user,data:dataChunk,region:regionSort}); // data:res1 全部数据 dataChunk 分组数据
            })
        }
    }
}