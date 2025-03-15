const express=require("express")
const bodyParser=require("body-parser")
const port=3006
const app=express();

app.use(bodyParser.json()) 

var user=[{
    "name":"Janu Sinha",
    "kidney":[{"healthy":false},{"healthy":true}]
}
]

app.get("/",(req,res)=>{
    let count=0;
    for(let i=0;i<user[0].kidney.length;i++)
    {
        if(user[0].kidney[i].healthy)
        {
            count++;
        }
    }
    let kkk=`the number of kidneys the user have is ${user[0].kidney.length} and out of them ${count} are healthy `;
    res.send(kkk)
})
app.post("/",(req,res)=>{
    const isHealthy=req.body.isHealthy;
    user[0].kidney.push({
        "healthy":isHealthy
    })
    res.send("kidney added successfully");
})
app.put("/",(req,res)=>{
    let flag=1;
    for(let i=0;i<user[0].kidney.length;i++)
    {
        if(!user[0].kidney[i].healthy){
            user[0].kidney[i].healthy=true;
            res.send(`the kidney no ${i+1} is damaged it is gettind replaced`)
            flag=0
            break;
        }
    }
    if(flag){ res.send("no damaged kidney is found")}
})
app.delete("/",(req,res)=>{
    if(user[0].kidney.length>0){
        user[0].kidney.pop();
        res.send("kidney removed successfully");
    }
    else{
        res.send("no kidney left to remove ");
    }
})

app.listen(port,()=>{
    console.log(`the code is runing on port ${port}`);
})
