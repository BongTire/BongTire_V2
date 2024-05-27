var express = require('express');
const axios = require('axios');
const router = express.Router();
const {User} = require('../../models');
const { error } = require('console');
const logger = require('../../config/logger')
var api_url = "";

var redirectURI = encodeURI("http://localhost:4000/auth/naver/callback");
var mainRedirectURI = encodeURI("http://localhost:4000");

router.get('/login',function(req,res){
    api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + process.env.Naver_client_id + '&redirect_uri=' + redirectURI + '&state=' + process.env.Naver_state;
    res.redirect(api_url);
});
router.get('/callback', async function (req, res) {
    let user;
    const code = req.query.code;
    const state = req.query.state;
    const api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=' +
    process.env.Naver_client_id + '&client_secret=' + process.env.Naver_client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;

    console.log("req.body: \n",req.body);
    try {
        
        const response = await axios.get(api_url, {
            headers: {
                'X-Naver-Client-Id': process.env.Naver_client_id,
                'X-Naver-Client-Secret': process.env.Naver_client_secret
            }
        });

        if (response.status === 200) {
            const access_token = response.data.access_token;
            const refresh_token = response.data.refresh_token;

            const profileResponse = await axios.get('https://openapi.naver.com/v1/nid/me', {
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            });

            console.log(profileResponse.data.response);

            const exUser = await User.findOne({
                raw: true,
                where: {
                    snsId: profileResponse.data.response.id,
                    provider: 'naver'
                }
            }).catch(error => {
                console.log('error = ' + error);
                
            });

            if(exUser){
                user = exUser;
                console.log("exUser: ", user);
                
            }else if(!exUser){
                const newUser = await User.create({
                    snsId: profileResponse.data.response.id,
                    name: profileResponse.data.response.name,
                    phonenumber: profileResponse.data.response.mobile,
                    email: profileResponse.data.response.id,
                    provider: 'naver'
                }).catch(error => {
                    console.log('error = ' + error);
                });
                const nowUser = await User.findOne({
                    raw: true,
                    where:{
                        id:newUser.id
                    }
                })
                user = nowUser;
                console.log("nowUser: ", user);

            }
            res.json(user)
            //res.redirect(mainRedirectURI);
            return;
        }
    } catch (error) {
        console.log('error = ' + error);
    }
});


router.get('/test',async(req,res)=>{
    const users = await User.findAll({
        raw:true,
    })
    console.log(users);
    res.send(users);
})



module.exports = router;